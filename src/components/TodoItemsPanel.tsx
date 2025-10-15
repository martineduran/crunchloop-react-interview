import { useEffect, useState } from 'react'
import type { TodoItem } from '../types'
import { getTodoItems } from '../services/api'
import TodoItemComponent from './TodoItemComponent'

interface TodoItemsPanelProps {
  todoListId: number | null
  todoListName: string | null
}

export default function TodoItemsPanel({ todoListId, todoListName }: TodoItemsPanelProps) {
  const [items, setItems] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (todoListId) {
      loadItems()
    } else {
      setItems([])
    }
  }, [todoListId])

  const loadItems = async () => {
    if (!todoListId) return

    try {
      setLoading(true)
      setError(null)
      const data = await getTodoItems(todoListId)
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items')
    } finally {
      setLoading(false)
    }
  }

  if (!todoListId) {
    return (
      <div className="panel items-panel">
        <h2>Todo Items</h2>
        <div className="empty-state">
          <p>Select a list to view items</p>
        </div>
      </div>
    )
  }

  return (
    <div className="panel items-panel">
      <h2>Todo Items {todoListName && `- ${todoListName}`}</h2>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="empty-state">
          <p>Loading items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p>No items in this list yet</p>
        </div>
      ) : (
        <div>
          {items.map((item) => (
            <TodoItemComponent key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
