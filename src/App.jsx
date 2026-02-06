import { useState, useEffect } from 'react'
import Calculator from './components/Calculator'
import LogDisplay from './components/LogDisplay'
import { logService } from './services/logService'
import './App.css'

function App() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    // Subscribe to log updates
    const unsubscribe = logService.subscribe((newLogs) => {
      setLogs([...newLogs])
    })

    // Log app initialization
    logService.log('info', 'App initialized', { timestamp: new Date().toISOString() })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="app-container">
      <h1 className="app-title">Calculator App</h1>
      <div className="app-content">
        <Calculator />
        <LogDisplay logs={logs} />
      </div>
    </div>
  )
}

export default App

