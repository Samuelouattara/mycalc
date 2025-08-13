import { useEffect, useState } from 'react'
import { useCalculStore } from '@/store/calculStore'
import { computeChain } from '@/lib/calculs'

export const useCalcul = () => {
  const { display, apiResult, history, setDisplay, setApiResult, addHistory, clearHistory } = useCalculStore()
  const [pressedKey, setPressedKey] = useState<string | null>(null)

  const buttons = [
    ['C', 'CE', '(', ')', '√', 'x²'],
    ['sin', 'cos', 'tan', 'ln', 'log', '^'],
    ['7', '8', '9', '/', 'π', 'e'],
    ['4', '5', '6', '×', 'deg', 'rad'],
    ['1', '2', '3', '-', 'abs', '%'],
    ['0', '.', '=', '+', 'ans', '×']
  ]

  const addToHistory = (expression: string, calculatedResult: string) => {
    addHistory({ expression, result: calculatedResult })
  }

  const handleButtonClick = (value: string) => {
    setPressedKey(value)
    setTimeout(() => setPressedKey(null), 150)
    
    let newDisplay = display
    
    switch (value) {
      case 'C':
        newDisplay = '0'
        setDisplay(newDisplay)
        setApiResult('')
        return
      case 'CE':
        newDisplay = '0'
        setDisplay(newDisplay)
        setApiResult('')
        return
      case '=':
        handleCompute()
        return
      case 'sin':
      case 'cos':
      case 'tan':
      case 'ln':
      case 'log':
      case 'abs':
        if (display === '0') {
          newDisplay = value + '('
        } else {
          newDisplay = display + value + '('
        }
        break
      case '√':
        if (display === '0') {
          newDisplay = '√('
        } else {
          newDisplay = display + '√('
        }
        break
      case 'x²':
        newDisplay = display + '²'
        break
      case '^':
        newDisplay = display + '^'
        break
      case 'π':
        if (display === '0') {
          newDisplay = 'π'
        } else {
          newDisplay = display + 'π'
        }
        break
      case 'e':
        if (display === '0') {
          newDisplay = 'e'
        } else {
          newDisplay = display + 'e'
        }
        break
      case 'deg':
      case 'rad':
        // Mode degrés/radians - à implémenter
        console.log('Mode:', value)
        return
      case '%':
        newDisplay = display + '%'
        break
      case 'ans':
        if (apiResult) {
          if (display === '0') {
            newDisplay = apiResult
          } else {
            newDisplay = display + apiResult
          }
        }
        break
      default:
        if (display === '0' && !isNaN(Number(value))) {
          newDisplay = value
        } else {
          newDisplay = display + value
        }
    }
    
  setDisplay(newDisplay)
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