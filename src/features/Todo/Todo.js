import React from "react"
import cx from "classnames"

import { initiateStore } from "./model"
import { useStore } from "../../shared"

export const Todo = props => {
  const { id, toggleTodo } = props
  const { content, completed } = useStore(() => initiateStore(props))

  return (
    <li className="todo-item" onClick={() => toggleTodo(id)}>
      {completed ? "👌" : "👋"}{" "}
      <span
        className={cx(
          "todo-item__text",
          completed && "todo-item__text--completed"
        )}
      >
        {content}
      </span>
    </li>
  )
}
