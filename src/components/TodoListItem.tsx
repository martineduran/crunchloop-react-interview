import type { TodoList } from '../types'

interface TodoListItemProps {
  list: TodoList
  isActive: boolean
  onSelect: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoListItem({ list, isActive, onSelect, onDelete }: TodoListItemProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`Are you sure you want to delete "${list.name}"?`)) {
      onDelete(list.id)
    }
  }

  return (
    <div
      className={`list-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(list.id)}
    >
      <span>{list.name}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="item-count">({list.todoItems?.length || 0})</span>
        <button
          className="btn btn-danger btn-small"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
