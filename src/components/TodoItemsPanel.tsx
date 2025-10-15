import { useEffect, useState } from 'react'
import type { TodoItem } from '../types'
import { getTodoItems, createTodoItem, updateTodoItem, deleteTodoItem } from '../services/api'
import TodoItemComponent from './TodoItemComponent'
import CreateItemForm from './CreateItemForm'

interface TodoItemsPanelProps {
  todoListId: number | null
  todoListName: string | null
  onItemsChange: () => Promise<void>
}

export default function TodoItemsPanel({ todoListId, todoListName, onItemsChange }: TodoItemsPanelProps) {
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

  const handleCreateItem = async (description: string, completed: boolean) => {
    if (!todoListId) return

    try {
      setError(null)
      await createTodoItem(todoListId, { description, completed })
      // Reload items to reflect the new item
      await loadItems()
      // Refresh parent lists to update item count
      await onItemsChange()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item')
      throw err
    }
  }

  const handleToggleComplete = async (itemId: number, completed: boolean) => {
    if (!todoListId) return

    // Find the item to get its description
    const item = items.find((i) => i.id === itemId)
    if (!item) return

    try {
      setError(null)
      await updateTodoItem(todoListId, itemId, { description: item.description, completed })
      // Reload items to reflect the update
      await loadItems()
      // Refresh parent lists to update incomplete item count
      await onItemsChange()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item')
    }
  }

  const handleDeleteItem = async (itemId: number) => {
    if (!todoListId) return

    try {
      setError(null)
      await deleteTodoItem(todoListId, itemId)
      // Reload items to reflect the deletion
      await loadItems()
      // Refresh parent lists to update item count
      await onItemsChange()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item')
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
      <CreateItemForm onCreateItem={handleCreateItem} />
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
            <TodoItemComponent
              key={item.id}
              item={item}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      )}
    </div>
  )
}
