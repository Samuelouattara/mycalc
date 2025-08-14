import { useEffect, useState } from 'react'
import { useCalculStore } from '@/store/calculStore'
import { computeExp, computeLn, computeSqrt, computeSquare, computeDeg, computeRad, computeChain, computePi, computeAbs, computePercent, computeLog } from '@/lib/calculs';

export const useCalcul = () => {
  const { display, apiResult, history, setDisplay, setApiResult, addHistory, clearHistory } = useCalculStore()
  const [pressedKey, setPressedKey] = useState<string | null>(null)

  const buttons = [
    ['C', 'CE', '(', ')', 'x²'],
    ['sin', '^'],
    ['7', '8', '9', '/', 'π', 'e'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-', '%'],
    ['0', '.', '=', '+', 'ans', '×']
  ]

  const addToHistory = (expression: string, calculatedResult: string) => {
    addHistory({ expression, result: calculatedResult })
  }

  const handleButtonClick = async (value: string) => {
    let newDisplay = display;
    switch (value) {
      case 'C':
        setDisplay('0');
        setApiResult('');
        setPressedKey(value);
        setTimeout(() => setPressedKey(null), 150);
        return;
      case 'CE':
        setDisplay('0');
        setApiResult('');
        setPressedKey(value);
        setTimeout(() => setPressedKey(null), 150);
        return;
      case 'log':
        // Call backend for decimal logarithm calculation
        try {
          const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null
          const userId = userIdStr ? Number(userIdStr) : undefined
          const valueToLog = Number(display)
          if (!isNaN(valueToLog)) {
            const data = await computeLog({ x: valueToLog, userId })
            if (typeof data.result !== 'undefined') {
              setApiResult(String(data.result))
              addToHistory(`log10(${display})`, String(data.result))
            } else {
              setApiResult('')
            }
          } else {
            setApiResult('')
          }
        } catch (e) {
          setApiResult('')
        }
        return
      case '=':
        await handleCompute()
        return
      case 'sin':
        if (display === '0') {
          newDisplay = 'sin('
        } else {
          newDisplay = display + 'sin('
        }
        break
      case 'abs':
        // Call backend for absolute value calculation
        try {
          const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null
          const userId = userIdStr ? Number(userIdStr) : undefined
          const valueToAbs = Number(display)
          if (!isNaN(valueToAbs)) {
            const data = await computeAbs({ value: valueToAbs, userId })
            if (typeof data.result !== 'undefined') {
              setApiResult(String(data.result))
              addToHistory(`abs(${display})`, String(data.result))
            } else {
              setApiResult('')
            }
          } else {
            setApiResult('')
          }
        } catch (e) {
          setApiResult('')
        }
        return
      case '√':
        // Call backend for square root calculation
        try {
          const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null
          const userId = userIdStr ? Number(userIdStr) : undefined
          const valueToSqrt = Number(display)
          if (!isNaN(valueToSqrt)) {
            const data = await computeSqrt({ value: valueToSqrt, userId })
            if (typeof data.result !== 'undefined') {
              setApiResult(String(data.result))
              addToHistory(`√(${display})`, String(data.result))
            } else {
              setApiResult('')
            }
          } else {
            setApiResult('')
          }
        } catch (e) {
          setApiResult('')
        }
        return
      case 'x²':
        // Call backend for square calculation
        try {
          const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null
          const userId = userIdStr ? Number(userIdStr) : undefined
          const valueToSquare = Number(display)
          if (!isNaN(valueToSquare)) {
            const data = await computeSquare({ value: valueToSquare, userId })
            if (typeof data.result !== 'undefined') {
              setApiResult(String(data.result))
              addToHistory(`${display}²`, String(data.result))
            } else {
              setApiResult('')
            }
          } else {
            setApiResult('')
          }
        } catch (e) {
          setApiResult('')
        }
        return
      case '^':
        newDisplay = display + '^'
        break
      case 'π':
        // Call backend for pi value
        try {
          const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null
          const userId = userIdStr ? Number(userIdStr) : undefined
          const data = await computePi({ userId })
          if (typeof data.result !== 'undefined') {
            setApiResult(String(data.result))
            addToHistory('π', String(data.result))
          } else {
            setApiResult('')
          }
        } catch (e) {
          setApiResult('')
        }
        return
      case 'e':
        // Call backend for exponential calculation
        try {
          const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null
          const userId = userIdStr ? Number(userIdStr) : undefined
          const valueToExp = Number(display)
          if (!isNaN(valueToExp)) {
            const data = await computeExp({ value: valueToExp, userId })
            if (typeof data.result !== 'undefined') {
              setApiResult(String(data.result))
              addToHistory(`exp(${display})`, String(data.result))
            } else {
              setApiResult('')
            }
          } else {
            setApiResult('')
          }
        } catch (e) {
          setApiResult('')
        }
        return
      case 'deg':
        // Call backend for radians to degrees conversion
        try {
          const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null
          const userId = userIdStr ? Number(userIdStr) : undefined
          const valueToConvert = Number(display)
          if (!isNaN(valueToConvert)) {
            const data = await computeDeg({ value: valueToConvert, userId })
            if (typeof data.result !== 'undefined') {
              setApiResult(String(data.result))
              addToHistory(`deg(${display})`, String(data.result))
            } else {
              setApiResult('')
            }
          } else {
            setApiResult('')
          }
        } catch (e) {
          setApiResult('')
        }
        return
      case 'rad':
        // Call backend for degrees to radians conversion
        try {
          const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null
          const userId = userIdStr ? Number(userIdStr) : undefined
          const valueToConvert = Number(display)
          if (!isNaN(valueToConvert)) {
            const data = await computeRad({ value: valueToConvert, userId })
            if (typeof data.result !== 'undefined') {
              setApiResult(String(data.result))
              addToHistory(`rad(${display})`, String(data.result))
            } else {
              setApiResult('')
            }
          } else {
            setApiResult('')
          }
        } catch (e) {
          setApiResult('')
        }
        return
      case '%':
        // Call backend for percentage calculation
        try {
          const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null
          const userId = userIdStr ? Number(userIdStr) : undefined
          const valueToPercent = Number(display)
          if (!isNaN(valueToPercent)) {
            const data = await computePercent({ x: valueToPercent, userId })
            if (typeof data.result !== 'undefined') {
              setApiResult(String(data.result))
              addToHistory(`${display}%`, String(data.result))
            } else {
              setApiResult('')
            }
          } else {
            setApiResult('')
          }
        } catch (e) {
          setApiResult('')
        }
        return
      case 'ans':
        if (apiResult !== null && apiResult !== undefined) {
          if (display === '0') {
            newDisplay = String(apiResult);
          } else {
            newDisplay = display + String(apiResult);
          }
        }
        break
      default:
        if (display === '0' && !isNaN(Number(value))) {
          newDisplay = value;
        } else {
          newDisplay = display + value;
        }
    }
    setDisplay(newDisplay);
    setPressedKey(value);
    setTimeout(() => setPressedKey(null), 150);
  }

  // Calcul via backend
  const handleCompute = async () => {
    try {
      const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null
      const userId = userIdStr ? Number(userIdStr) : undefined
      const payload = { expression: display.replace(/×/g, '*'), userId }
      const data = await computeChain(payload)
      if (typeof data.result !== 'undefined') {
        const resultStr = String(data.result)
        setApiResult(resultStr)
        addToHistory(display, resultStr)
        // On ne change plus display pour garder l'expression originale
      } else {
        setApiResult('')
      }
    } catch (e) {
      setApiResult('')
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key
    
    if (key === 'Backspace') {
      handleDelete()
      return
    }
    
    const keyMap: { [key: string]: string } = {
      'Enter': '=',
      'Escape': 'C',
      '*': '×',
      '/': '/',
      '+': '+',
      '-': '-',
      '.': '.',
      '(': '(',
      ')': ')'
    }

    let mappedKey = keyMap[key] || key

    // Vérifier si c'est un chiffre
    if (!isNaN(Number(key)) && key !== ' ') {
      mappedKey = key
    }

    // Vérifier si le bouton existe dans notre calculatrice
    const allButtons = buttons.flat()
    if (allButtons.includes(mappedKey)) {
      handleButtonClick(mappedKey)
    }
  }

  const handleDelete = () => {
    let newDisplay
    if (display.length > 1) {
      newDisplay = display.slice(0, -1)
    } else {
      newDisplay = '0'
    }
    setDisplay(newDisplay)
    setPressedKey('delete')
    setTimeout(() => setPressedKey(null), 150)
  }

  // clearHistory vient du store

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [display])

  const getButtonStyle = (value: string) => {
    const baseStyle = "h-12 rounded-xl font-semibold text-sm transition-all duration-150 transform active:scale-95 shadow-sm"
    
    if (pressedKey === value) {
      return `${baseStyle} scale-95 shadow-lg bg-[#1C274D] text-white`
    }

    switch (value) {
      case 'C':
      case 'CE':
        return `${baseStyle} bg-red-100 hover:bg-red-200 text-red-700 border border-red-300`
      case '=':
        return `${baseStyle} bg-[#1C274D] hover:bg-[#1C274D]/90 text-white`
      case 'sin':
      case 'cos':
      case 'tan':
      case 'ln':
      case 'log':
      case '√':
      case 'x²':
      case '^':
      case 'abs':
      case '%':
      case 'π':
      case 'e':
      case 'deg':
      case 'rad':
      case 'ans':
        return `${baseStyle} bg-[#1C274D]/10 hover:bg-[#1C274D]/20 text-[#1C274D] border border-[#1C274D]/20`
      case '+':
      case '-':
      case '×':
      case '/':
      case '(':
      case ')':
        return `${baseStyle} bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300`
      default:
        return `${baseStyle} bg-white hover:bg-gray-50 text-gray-800 border border-gray-200`
    }
  }

  return {
    display,
    result: apiResult || '',
    history,
    buttons,
    pressedKey,
    handleButtonClick,
    handleDelete,
    clearHistory,
    getButtonStyle
  }
}