import type { TodoList } from '../types'

interface TodoListItemProps {
  list: TodoList
  isActive: boolean
  onSelect: (id: number) => void
}

export default function TodoListItem({ list, isActive, onSelect }: TodoListItemProps) {
  return (
    <div
      className={`list-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(list.id)}
    >
      <span>{list.name}</span>
      <span className="item-count">({list.todoItems?.length || 0})</span>
    </div>
  )
}
