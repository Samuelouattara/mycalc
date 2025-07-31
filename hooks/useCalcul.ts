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

  // Fonction pour calculer automatiquement le résultat
  const calculateResult = (expression: string) => {
    if (expression === '0' || expression === '' || expression === 'Erreur') {
      setResult('')
      return
    }

    // Vérifier si l'expression contient une opération et se termine par un nombre
    const hasOperation = expression.includes('+') || expression.includes('-') || expression.includes('×') || expression.includes('/')
    const endsWithNumber = /\d$/.test(expression)
    
    if (hasOperation && endsWithNumber) {
      try {
        const calculatedResult = evaluateExpression(expression)
        if (calculatedResult !== 'Erreur' && calculatedResult !== 'Opération non supportée') {
          setResult(calculatedResult)
        } else {
          setResult('')
        }
      } catch (error) {
        setResult('')
      }
    } else {
      setResult('')
    }
  }

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
    
    let newDisplay = display
    
    switch (value) {
      case 'C':
        newDisplay = '0'
        setDisplay(newDisplay)
        setResult('')
        return
      case 'CE':
        newDisplay = '0'
        setDisplay(newDisplay)
        setResult('')
        return
      case '=':
        // Garder la fonctionnalité du bouton = pour ajouter à l'historique
        if (result && result !== '') {
          addToHistory(display, result)
          setDisplay(result)
          setResult('')
          console.log('Ajouté à l\'historique:', display, '=', result)
        }
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
        if (result) {
          if (display === '0') {
            newDisplay = result
          } else {
            newDisplay = display + result
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
    // Calculer automatiquement le résultat après mise à jour de l'affichage
    setTimeout(() => calculateResult(newDisplay), 0)
  }

  // Fonction d'évaluation des expressions mathématiques
  const evaluateExpression = (expression: string): string => {
    try {
      // Nettoyer l'expression
      let cleanExpression = expression.trim()
      
      // Si l'expression contient une addition
      if (cleanExpression.includes('+')) {
        // Diviser par le signe +
        const parts = cleanExpression.split('+')
        
        // Calculer la somme
        const result = parts.reduce((sum, part) => {
          const num = parseFloat(part.trim())
          if (isNaN(num)) {
            throw new Error('Nombre invalide')
          }
          return sum + num
        }, 0)
        
        return result.toString()
      }
      // Si l'expression contient une soustraction
      if (cleanExpression.includes('-')) {
        // Diviser par le signe -
        const parts = cleanExpression.split('-')
        
        // Calculer la différence
        const result = parts.reduce((diff, part, index) => {
          const num = parseFloat(part.trim())
          if (isNaN(num)) {
            throw new Error('Nombre invalide')
          }
          return index === 0 ? num : diff - num
        }, 0)
        
        return result.toString()
      }

     if (cleanExpression.includes('×')) {
        // Remplacer × par *
        cleanExpression = cleanExpression.replace(/×/g, '*')
        // Évaluer l'expression
        const result = eval(cleanExpression)
        return result.toString()
      }

      if (cleanExpression.includes('/')) {
        // Remplacer / par /
        cleanExpression = cleanExpression.replace(/\//g, '/')
        // Évaluer l'expression
        const result = eval(cleanExpression)
        return result.toString()
      }
      
      // Pour les autres opérations, retourner un placeholder temporaire
      return "Opération non supportée"
    } catch (error) {
      return 'Erreur'
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
    
    // Recalculer automatiquement après suppression
    setTimeout(() => calculateResult(newDisplay), 0)
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