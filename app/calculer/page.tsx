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
    <div className={`
      flex flex-col w-full
      ${isMobile ? 'min-h-screen pb-90' : isTablet ? 'min-h-screen pb-120' : 'h-full'}
    `}>
      <div className={`
        ${isMobile ? 'px-4 pt-4 pb-2' : 'p-0'}
      `}>
        <ContentTitle title="Calculatrice" description="Effectuez vos calculs avec facilité" icon={<CalculatorIcon className="w-6 h-6" />} actions={actions} />
      </div>

      <div className={`
        flex-1 w-full
        ${isMobile ? 'px-4 pb-20' : 'p-6'}
        ${isMobile ? 'flex-col gap-4' : isTablet ? 'flex-col gap-5' : 'flex-row gap-6'}
        flex
      `}>
        {/* Clavier de la calculatrice */}
        <div className={`
          ${isMobile ? 'order-2' : isTablet ? 'order-2' : 'flex-1 max-w-2xl'}
        `}>
          <div className={`
            grid gap-2
            ${isMobile ? 'grid-cols-6 gap-1,5' : isTablet ? 'grid-cols-6 gap-2' : 'grid-cols-6 gap-2'}
          `}>
            {buttons.flat().map((button, index) => {
              // Remplacer le dernier × par un bouton de suppression stylé
              if (index === buttons.flat().length - 1) {
                return (
                  <button
                    key={index}
                    onClick={handleDelete}
                    className={`
                      rounded-xl font-semibold text-sm transition-all duration-150 transform active:scale-95 shadow-sm 
                      bg-red-100 hover:bg-red-200 text-red-600 border border-red-300
                      ${isMobile ? 'h-10 text-xs' : isTablet ? 'h-11 text-sm' : 'h-12 text-sm'}
                    `}
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
                  className={`
                    ${getButtonStyle(button)}
                    ${isMobile ? 'h-10 text-xs' : isTablet ? 'h-11 text-sm' : 'h-12 text-sm'}
                  `}
                  title={getButtonTooltip(button)}
                >
                  {button}
                </button>
              )
            })}
          </div>

          <div className={`
            mt-4 text-gray-500 text-center
            ${isMobile ? 'text-xs' : 'text-xs'}
          `}>
            {isMobile ? 'Tapez sur les boutons' : 'Utilisez votre clavier ou cliquez sur les boutons pour saisir'}
          </div>
        </div>

        {/* Zone d'affichage et résultats */}
        <div className={`
          flex flex-col gap-6
          ${isMobile ? 'order-1 gap-4' : isTablet ? 'order-1 gap-5' : 'flex-1'}
        `}>
          {/* Zone de saisie */}
          <div className="flex-1">
            <h3 className={`
              font-semibold text-gray-700 mb-3
              ${isMobile ? 'text-base' : 'text-lg'}
            `}>Expression</h3>
            <div className="border-b-2 border-gray-200 pb-4">
              <div className={`
                text-right font-mono text-gray-800 break-all leading-tight
                ${isMobile ? 'text-xl min-h-[40px]' : isTablet ? 'text-2xl min-h-[50px]' : 'text-3xl min-h-[60px]'}
              `}>
                {display}
              </div>
            </div>
          </div>

          {/* Zone de résultat */}
          <div className="flex-1">
            <h3 className={`
              font-semibold text-gray-700 mb-3
              ${isMobile ? 'text-base' : 'text-lg'}
            `}>Résultat</h3>
            <div className="border-b-2 border-[#1C274D]/30 pb-4">
              <div className={`
                text-right font-mono font-bold text-[#1C274D] break-all
                ${isMobile ? 'text-lg min-h-[35px]' : isTablet ? 'text-xl min-h-[40px]' : 'text-2xl min-h-[50px]'}
              `}>
                {result || 'Aucun calcul effectué'}
              </div>
            </div>
          </div>

          {/* Historique des calculs */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-3">
              <h3 className={`
                font-semibold text-gray-700
                ${isMobile ? 'text-base' : 'text-lg'}
              `}>Historique</h3>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className={`
                    text-red-500 hover:text-red-700 px-2 py-1 rounded transition-colors
                    ${isMobile ? 'text-xs' : 'text-xs'}
                  `}
                >
                  Effacer
                </button>
              )}
            </div>

            <div className={`
              space-y-3 overflow-y-auto
              ${isMobile ? 'max-h-32' : isTablet ? 'max-h-40' : 'max-h-48'}
            `}>
              {history.length === 0 ? (
                <p className={`
                  text-gray-400 italic text-center py-8
                  ${isMobile ? 'text-sm py-4' : 'text-sm py-8'}
                `}>
                  Aucun calcul dans l'historique
                </p>
              ) : (
                history.map((entry) => (
                  <div key={entry.id} className="border-l-2 border-[#1C274D]/20 pl-4 py-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className={`
                          font-mono text-gray-600 break-all
                          ${isMobile ? 'text-xs' : 'text-sm'}
                        `}>
                          {entry.expression}
                        </div>
                        <div className={`
                          font-mono font-semibold text-[#1C274D] break-all
                          ${isMobile ? 'text-xs' : 'text-sm'}
                        `}>
                          = {entry.result}
                        </div>
                      </div>
                      <div className={`
                        text-gray-400
                        ${isMobile ? 'text-xs' : 'text-xs'}
                      `}>
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