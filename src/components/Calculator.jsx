import { useState, useEffect } from 'react'
import { logService } from '../services/logService'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  useEffect(() => {
    logService.log('info', 'Calculator component mounted')
  }, [])

  const handleNumber = (num) => {
    logService.logButtonClick(num.toString(), true)
    
    try {
      if (waitingForNewValue) {
        setDisplay(String(num))
        setWaitingForNewValue(false)
      } else {
        setDisplay(display === '0' ? String(num) : display + num)
      }
    } catch (error) {
      logService.logError(error, { action: 'handleNumber', number: num })
    }
  }

  const handleOperation = (op) => {
    logService.logButtonClick(op, true)
    
    try {
      const inputValue = parseFloat(display)

      if (previousValue === null) {
        setPreviousValue(inputValue)
      } else if (operation) {
        const currentValue = previousValue || 0
        const newValue = calculate(currentValue, inputValue, operation)

        setDisplay(String(newValue))
        setPreviousValue(newValue)
        logService.logOperation(`${currentValue} ${operation} ${inputValue}`, newValue)
      }

      setWaitingForNewValue(true)
      setOperation(op)
    } catch (error) {
      logService.logError(error, { action: 'handleOperation', operation: op })
    }
  }

  const calculate = (firstValue, secondValue, operation) => {
    try {
      switch (operation) {
        case '+':
          return firstValue + secondValue
        case '-':
          return firstValue - secondValue
        case '*':
          return firstValue * secondValue
        case '/':
          if (secondValue === 0) {
            throw new Error('Division by zero')
          }
          return firstValue / secondValue
        case '=':
          return secondValue
        default:
          return secondValue
      }
    } catch (error) {
      logService.logError(error, { 
        action: 'calculate', 
        firstValue, 
        secondValue, 
        operation 
      })
      throw error
    }
  }

  const handleEquals = () => {
    logService.logButtonClick('=', true)
    
    try {
      if (operation && previousValue !== null) {
        const inputValue = parseFloat(display)
        const newValue = calculate(previousValue, inputValue, operation)
        
        setDisplay(String(newValue))
        logService.logOperation(`${previousValue} ${operation} ${inputValue}`, newValue)
        setPreviousValue(null)
        setOperation(null)
        setWaitingForNewValue(true)
      }
    } catch (error) {
      logService.logError(error, { action: 'handleEquals' })
      setDisplay('Error')
    }
  }

  const handleClear = () => {
    logService.logButtonClick('C', true)
    
    try {
      setDisplay('0')
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(false)
    } catch (error) {
      logService.logError(error, { action: 'handleClear' })
    }
  }

  const handleDecimal = () => {
    logService.logButtonClick('.', true)
    
    try {
      if (waitingForNewValue) {
        setDisplay('0.')
        setWaitingForNewValue(false)
      } else if (display.indexOf('.') === -1) {
        setDisplay(display + '.')
      }
    } catch (error) {
      logService.logError(error, { action: 'handleDecimal' })
    }
  }

  // Non-functional buttons - these will log but not work
  const handleNonFunctional = (buttonLabel) => {
    logService.logButtonClick(buttonLabel, false)
    
    // Intentionally throw an error to demonstrate error logging
    try {
      throw new Error(`Button "${buttonLabel}" is intentionally non-functional`)
    } catch (error) {
      logService.logError(error, { 
        button: buttonLabel, 
        reason: 'Intentionally non-functional' 
      })
    }
  }

  // Simulate some runtime errors
  const handleErrorButton = () => {
    logService.logButtonClick('ERROR', false)
    
    // Generate different types of errors
    const errorTypes = [
      () => { throw new Error('Simulated runtime error') },
      () => { const obj = null; obj.property = 'value' }, // TypeError
      () => { JSON.parse('invalid json') }, // SyntaxError
    ]
    
    const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)]
    
    try {
      randomError()
    } catch (error) {
      logService.logError(error, { 
        button: 'ERROR', 
        type: 'simulated_error' 
      })
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        <button className="btn btn-clear" onClick={handleClear}>
          C
        </button>
        <button className="btn btn-operator" onClick={() => handleNonFunctional('±')}>
          ±
        </button>
        <button className="btn btn-operator" onClick={() => handleNonFunctional('%')}>
          %
        </button>
        <button className="btn btn-operator" onClick={() => handleOperation('/')}>
          ÷
        </button>
        
        <button className="btn" onClick={() => handleNumber(7)}>7</button>
        <button className="btn" onClick={() => handleNumber(8)}>8</button>
        <button className="btn" onClick={() => handleNumber(9)}>9</button>
        <button className="btn btn-operator" onClick={() => handleOperation('*')}>
          ×
        </button>
        
        <button className="btn" onClick={() => handleNumber(4)}>4</button>
        <button className="btn" onClick={() => handleNumber(5)}>5</button>
        <button className="btn" onClick={() => handleNumber(6)}>6</button>
        <button className="btn btn-operator" onClick={() => handleOperation('-')}>
          −
        </button>
        
        <button className="btn" onClick={() => handleNumber(1)}>1</button>
        <button className="btn" onClick={() => handleNumber(2)}>2</button>
        <button className="btn" onClick={() => handleNumber(3)}>3</button>
        <button className="btn btn-operator" onClick={() => handleOperation('+')}>
          +
        </button>
        
        <button className="btn btn-zero" onClick={() => handleNumber(0)}>
          0
        </button>
        <button className="btn" onClick={handleDecimal}>.</button>
        <button className="btn btn-operator" onClick={handleEquals}>
          =
        </button>
        <button className="btn btn-error" onClick={handleErrorButton}>
          ERROR
        </button>
        
        <button className="btn btn-special" onClick={() => handleNonFunctional('√')}>
          √
        </button>
        <button className="btn btn-special" onClick={() => handleNonFunctional('x²')}>
          x²
        </button>
        <button className="btn btn-special" onClick={() => handleNonFunctional('1/x')}>
          1/x
        </button>
        <button className="btn btn-special" onClick={() => handleNonFunctional('M+')}>
          M+
        </button>
      </div>
    </div>
  )
}

export default Calculator

