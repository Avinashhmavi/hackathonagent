import { useEffect, useRef } from 'react'
import { logService } from '../services/logService'
import './LogDisplay.css'

const LogDisplay = ({ logs }) => {
  const logEndRef = useRef(null)

  useEffect(() => {
    // Auto-scroll to bottom when new logs are added
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const getLogLevelClass = (level) => {
    switch (level) {
      case 'error':
        return 'log-entry-error'
      case 'warning':
        return 'log-entry-warning'
      case 'success':
        return 'log-entry-success'
      default:
        return 'log-entry-info'
    }
  }

  const getLogIcon = (level) => {
    switch (level) {
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'success':
        return '✅'
      default:
        return 'ℹ️'
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    })
  }

  const handleClearLogs = () => {
    logService.log('info', 'Logs cleared by user')
    logService.clearLogs()
  }

  return (
    <div className="log-display">
      <div className="log-header">
        <h2>Activity Logs</h2>
        <button className="clear-logs-btn" onClick={handleClearLogs}>
          Clear Logs
        </button>
      </div>
      <div className="log-container">
        {logs.length === 0 ? (
          <div className="log-empty">No logs yet. Start using the calculator!</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={`log-entry ${getLogLevelClass(log.level)}`}>
              <div className="log-entry-header">
                <span className="log-icon">{getLogIcon(log.level)}</span>
                <span className="log-level">{log.level.toUpperCase()}</span>
                <span className="log-timestamp">{formatTimestamp(log.timestamp)}</span>
              </div>
              <div className="log-message">{log.message}</div>
              {log.data && Object.keys(log.data).length > 0 && (
                <div className="log-data">
                  <pre>{JSON.stringify(log.data, null, 2)}</pre>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
      <div className="log-footer">
        <span>Total Logs: {logs.length}</span>
        <span>
          Errors: {logs.filter(log => log.level === 'error').length} | 
          Warnings: {logs.filter(log => log.level === 'warning').length} | 
          Success: {logs.filter(log => log.level === 'success').length}
        </span>
      </div>
    </div>
  )
}

export default LogDisplay

