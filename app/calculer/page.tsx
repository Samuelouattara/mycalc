'use client'

import React from 'react'
import ContentTitle from '@/components/shared/contentTitle'
import { useCalcul } from '../../hooks/useCalcul'
import CalculatorIcon from '@/components/ui/icones/calculatorIcon'
import { useRouter } from 'next/navigation'
import { useResponsive } from '@/hooks/useResponsive'

export default function Page() {
  const router = useRouter();
  const { display, result, history, buttons, handleButtonClick, handleDelete, clearHistory, getButtonStyle } = useCalcul()
  const { isMobile, isTablet} = useResponsive()

  const viewMyCalculs = () => {
    router.push('/mes-calculs');
  }

  const actions: {
    label: string;
    onClick: () => void;
    variant: 'primary' | 'secondary';
  }[] = [
      {
        label: 'Voir mes calculs',
        onClick: viewMyCalculs,
        variant: 'primary' as const
      },
    ]

  return (
    <div className="flex flex-col h-full">
      <ContentTitle title="Calculatrice" description="Effectuez vos calculs avec facilité" icon={<CalculatorIcon className="w-6 h-6" />} actions={actions} />

      <div className={`flex-1 flex gap-6 p-6 ${isMobile || isTablet ? 'flex-col' : ''}`}>
        {/* Clavier de la calculatrice - à gauche */}
        <div className="flex-1 max-w-2xl">
          <div className="grid grid-cols-6 gap-2">
            {buttons.flat().map((button, index) => {
              // Remplacer le dernier × par un bouton de suppression stylé
              if (index === buttons.flat().length - 1) {
                return (
                  <button
                    key={index}
                    onClick={handleDelete}
                    className="h-12 rounded-xl font-semibold text-sm transition-all duration-150 transform active:scale-95 shadow-sm bg-red-100 hover:bg-red-200 text-red-600 border border-red-300"
                    title="Supprimer le dernier caractère"
                  >
                    ×
                  </button>
                )
              }

              return (
                <button
                  key={index}
                  onClick={() => handleButtonClick(button)}
                  className={getButtonStyle(button)}
                  title={getButtonTooltip(button)}
                >
                  {button}
                </button>
              )
            })}
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            Utilisez votre clavier ou cliquez sur les boutons pour saisir
          </div>
        </div>

        {/* Zone d'affichage et résultats - à droite */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Zone de saisie */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Expression</h3>
            <div className="border-b-2 border-gray-200 pb-4">
              <div className="text-right text-3xl font-mono text-gray-800 break-all leading-tight min-h-[60px]">
                {display}
              </div>
            </div>
          </div>

          {/* Zone de résultat */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Résultat</h3>
            <div className="border-b-2 border-[#1C274D]/30 pb-4">
              <div className="text-right text-2xl font-mono font-bold text-[#1C274D] break-all min-h-[50px]">
                {result || 'Aucun calcul effectué'}
              </div>
            </div>
          </div>

          {/* Historique des calculs */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-700">Historique</h3>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded transition-colors"
                >
                  Effacer
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-gray-400 text-sm italic text-center py-8">
                  Aucun calcul dans l'historique
                </p>
              ) : (
                history.map((entry) => (
                  <div key={entry.id} className="border-l-2 border-[#1C274D]/20 pl-4 py-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="text-sm font-mono text-gray-600 break-all">
                          {entry.expression}
                        </div>
                        <div className="text-sm font-mono font-semibold text-[#1C274D] break-all">
                          = {entry.result}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {entry.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Fonction helper pour les tooltips
function getButtonTooltip(button: string): string {
  const tooltips: { [key: string]: string } = {
    'C': 'Effacer tout',
    'CE': 'Effacer l\'entrée',
    'sin': 'Sinus',
    'cos': 'Cosinus',
    'tan': 'Tangente',
    'ln': 'Logarithme naturel',
    'log': 'Logarithme base 10',
    '√': 'Racine carrée',
    'x²': 'Au carré',
    '^': 'Puissance',
    'π': 'Pi (3.14159...)',
    'e': 'Nombre d\'Euler (2.71828...)',
    'deg': 'Mode degrés',
    'rad': 'Mode radians',
    'abs': 'Valeur absolue',
    '%': 'Pourcentage',
    'ans': 'Résultat précédent',
    '=': 'Calculer'
  }
  return tooltips[button] || button
}