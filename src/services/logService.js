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
    let message = 'An unknown error occurred';
    const data = { ...context };

    if (error instanceof Error) {
      message = error.message;
      data.stack = error.stack;
      data.error = error.toString();
    } else if (typeof error === 'string') {
      message = error;
      data.error = error;
    } else if (error && typeof error === 'object') {
      // Common for API error responses
      message = error.detail || error.message || 'An object-based error occurred';
      try {
        data.error = JSON.stringify(error);
      } catch (e) {
        data.error = '[object Object] (Could not be stringified)';
      }
    } else if (error) {
      // Handle other primitives that might be thrown
      message = String(error);
      data.error = error;
    }

    this.log('error', message, data);
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

