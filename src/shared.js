import React from "react"
import { createStore, clearNode, is } from "effector"
import { useStore as useStoreNative } from "effector-react"

function noop() {}

export function useStore(storeOrStoreCreator) {
  const storeRef = React.useRef()
  const unsubscriberRef = React.useRef()

  if (storeRef.current === undefined) {
    storeRef.current = storeOrStoreCreator
    unsubscriberRef.current = noop

    if (typeof storeOrStoreCreator === "function") {
      const storeCreator = storeOrStoreCreator
      const store = storeCreator()

      if (Array.isArray(store)) {
        storeRef.current = store[0]
        unsubscriberRef.current = store[1]
      }
    }
  }

  React.useEffect(
    () => () => {
      unsubscriberRef.current()
      clearNode(storeRef.current)
    },
    []
  )

  return useStoreNative(storeRef.current)
}

export function mapSafety(store, mapper, unmount) {
  if (!is.store(store)) throw new TypeError("Invalid store")
  if (typeof mapper !== "function") throw new TypeError("Invalid mapper")

  const storeMapped = createStore(mapper(store.getState())).on(
    store,
    (_, newState) => mapper(newState)
  )

  unmount.watch(() => {
    storeMapped.off(store)
    clearNode(storeMapped)
  })

  return storeMapped
}
