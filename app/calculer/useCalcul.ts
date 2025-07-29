import { useState, useEffect } from 'react'

interface CalculHistory {
  id: number
  expression: string
  result: string
  timestamp: Date
}

export const useCalcul = () => {
  const [display, setDisplay] = useState('0')
  const [result, setResult] = useState('')
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [history, setHistory] = useState<CalculHistory[]>([])

  const buttons = [
    ['C', 'CE', '(', ')', '√', 'x²'],
    ['sin', 'cos', 'tan', 'ln', 'log', '^'],
    ['7', '8', '9', '/', 'π', 'e'],
    ['4', '5', '6', '×', 'deg', 'rad'],
    ['1', '2', '3', '-', 'abs', '%'],
    ['0', '.', '=', '+', 'ans', '×']
  ]

  const addToHistory = (expression: string, calculatedResult: string) => {
    const newEntry: CalculHistory = {
      id: Date.now(),
      expression,
      result: calculatedResult,
      timestamp: new Date()
    }
    setHistory(prev => [newEntry, ...prev.slice(0, 9)]) // Garder les 10 derniers calculs
  }

  const handleButtonClick = (value: string) => {
    setPressedKey(value)
    setTimeout(() => setPressedKey(null), 150)
    
    switch (value) {
      case 'C':
        setDisplay('0')
        setResult('')
        break
      case 'CE':
        setDisplay('0')
        break
      case '=':
        try {
          // Logique de calcul à implémenter plus tard
          const calculatedResult = evaluateExpression(display)
          setResult(calculatedResult)
          addToHistory(display, calculatedResult)
          console.log('Calcul effectué:', display, '=', calculatedResult)
        } catch (error) {
          setResult('Erreur')
        }
        break
      case 'sin':
      case 'cos':
      case 'tan':
      case 'ln':
      case 'log':
      case 'abs':
        if (display === '0') {
          setDisplay(value + '(')
        } else {
          setDisplay(display + value + '(')
        }
        break
      case '√':
        if (display === '0') {
          setDisplay('√(')
        } else {
          setDisplay(display + '√(')
        }
        break
      case 'x²':
        setDisplay(display + '²')
        break
      case '^':
        setDisplay(display + '^')
        break
      case 'π':
        if (display === '0') {
          setDisplay('π')
        } else {
          setDisplay(display + 'π')
        }
        break
      case 'e':
        if (display === '0') {
          setDisplay('e')
        } else {
          setDisplay(display + 'e')
        }
        break
      case 'deg':
      case 'rad':
        // Mode degrés/radians - à implémenter
        console.log('Mode:', value)
        break
      case '%':
        setDisplay(display + '%')
        break
      case 'ans':
        if (result) {
          if (display === '0') {
            setDisplay(result)
          } else {
            setDisplay(display + result)
          }
        }
        break
      default:
        if (display === '0' && !isNaN(Number(value))) {
          setDisplay(value)
        } else {
          setDisplay(display + value)
        }
    }
  }

  // Fonction temporaire d'évaluation (à remplacer par une vraie logique de calcul)
  const evaluateExpression = (expression: string): string => {
    // Ici on ajoutera la vraie logique de calcul plus tard
    // Pour l'instant, on retourne juste un placeholder
    return "Résultat à calculer"
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
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
    setPressedKey('delete')
    setTimeout(() => setPressedKey(null), 150)
  }

  const clearHistory = () => {
    setHistory([])
  }

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
    result,
    history,
    buttons,
    pressedKey,
    handleButtonClick,
    handleDelete,
    clearHistory,
    getButtonStyle
  }
} 