class LogService {
  constructor() {
    this.logs = []
    this.subscribers = []
    this.maxLogs = 100
  }

  subscribe(callback) {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback)
    }
  }

  notify() {
    this.subscribers.forEach(callback => callback(this.logs))
  }

  log(level, message, data = {}) {
    const logEntry = {
      id: Date.now() + Math.random(),
      level, // 'info', 'error', 'warning', 'success'
      message,
      data,
      timestamp: new Date().toISOString()
    }

    this.logs.unshift(logEntry)
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    // Also log to console
    const consoleMethod = level === 'error' ? 'error' : 
                          level === 'warning' ? 'warn' : 'log'
    console[consoleMethod](`[${level.toUpperCase()}]`, message, data)

    this.notify()
  }

  logError(error, context = {}) {
    this.log('error', error.message || 'An error occurred', {
      ...context,
      error: error.toString(),
      stack: error.stack
    })
  }

  logButtonClick(buttonLabel, functional = true) {
    this.log('info', `Button clicked: ${buttonLabel}`, {
      buttonLabel,
      functional,
      action: functional ? 'processed' : 'non-functional'
    })
  }

  logOperation(operation, result) {
    this.log('success', `Operation: ${operation} = ${result}`, {
      operation,
      result
    })
  }

  clearLogs() {
    this.logs = []
    this.notify()
  }
}

export const logService = new LogService()

