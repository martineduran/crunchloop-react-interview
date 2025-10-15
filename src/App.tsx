import { useEffect, useState } from 'react'
import './App.css'
import type { TodoList } from './types'
import { getTodoLists } from './services/api'
import TodoListItem from './components/TodoListItem'

function App() {
  const [lists, setLists] = useState<TodoList[]>([])
  const [selectedListId, setSelectedListId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLists()
  }, [])

  const loadLists = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getTodoLists()
      setLists(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lists')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectList = (id: number) => {
    setSelectedListId(id)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Crunchloop Todo Lists Manager</h1>
      </header>
      <div className="container">
        <div className="panel lists-panel">
          <h2>Lists</h2>
          {error && <div className="error">{error}</div>}
          {loading ? (
            <div className="empty-state">
              <p>Loading...</p>
            </div>
          ) : lists.length === 0 ? (
            <div className="empty-state">
              <p>No todo lists yet</p>
            </div>
          ) : (
            <div>
              {lists.map((list) => (
                <TodoListItem
                  key={list.id}
                  list={list}
                  isActive={selectedListId === list.id}
                  onSelect={handleSelectList}
                />
              ))}
            </div>
          )}
        </div>
        <div className="panel items-panel">
          <h2>Todo Items</h2>
          <div className="empty-state">
            <p>Select a list to view items</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App