import type { TodoItem } from '../types'

interface TodoItemProps {
  item: TodoItem
  onToggleComplete: (id: number, completed: boolean) => void
}

export default function TodoItemComponent({ item, onToggleComplete }: TodoItemProps) {
  const handleToggle = () => {
    onToggleComplete(item.id, !item.completed)
  }

  return (
    <div className={`todo-item ${item.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={item.completed}
        onChange={handleToggle}
      />
      <span className="todo-text">{item.description}</span>
    </div>
  )
}
