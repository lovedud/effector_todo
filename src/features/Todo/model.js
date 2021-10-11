import { createEvent, combine } from "effector"

import { mapSafety } from "../../shared"

export const initiateStore = ({ id, $todosContent, $todosCompleted }) => {
  const unmount = createEvent()

  const store = combine({
    content: mapSafety(
      $todosContent,
      todosContent => todosContent[id],
      unmount
    ),
    completed: mapSafety(
      $todosCompleted,
      todosCompleted => todosCompleted[id],
      unmount
    )
  })

  return [store, unmount]
}
