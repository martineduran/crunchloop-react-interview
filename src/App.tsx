import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Crunchloop Todo Lists Manager</h1>
      </header>
      <div className="container">
        <div className="panel lists-panel">
          <h2>Lists</h2>
          <div className="empty-state">
            <p>No todo lists yet</p>
          </div>
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