import type { TodoItem } from '../types'

interface TodoItemProps {
  item: TodoItem
}

export default function TodoItemComponent({ item }: TodoItemProps) {
  return (
    <div className={`todo-item ${item.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={item.completed}
        readOnly
      />
      <span className="todo-text">{item.description}</span>
    </div>
  )
}
