'use client'

import React, { useState } from 'react'
import ContentTitle from '@/components/shared/contentTitle'
import CalculatorIcon from '@/components/ui/icones/calculatorIcon'
import { useRouter } from 'next/navigation'
import { useResponsive } from '@/hooks/useResponsive'

export default function Page() {
  const router = useRouter();
  const { isMobile, isTablet } = useResponsive();
  const [apiResult, setApiResult] = useState<string | null>(null);
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<Array<{ expression: string; result: string; timestamp: string }>>([]);

  const viewMyCalculs = () => {
    router.push('/mes-calculs');
  };

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
  ];

  // Fonction pour envoyer le calcul à l'API et afficher le résultat
  const handleCompute = async () => {
    try {
      const userId = window.localStorage.getItem('userId');
      // Envoie l'expression complète à la route chain
      const response = await fetch(`http://localhost:3007/calculations/chain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: display, userId })
      });
      const data = await response.json();
      if (typeof data.result !== 'undefined') {
        setApiResult(data.result);
        setHistory(prev => [{ expression: display, result: data.result, timestamp: new Date().toLocaleTimeString() }, ...prev]);
      } else {
        setApiResult('Format non supporté');
      }
    } catch (err) {
      setApiResult('Erreur API');
    }
  };

  // Clavier simple
  const buttons = [
    ['C', '(', ')', '^', 'Ans'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['sin', 'cos', 'tan']
  ];

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('');
      setApiResult(null);
      return;
    }
    if (value === '=') {
      handleCompute();
      return;
    }
    if (value === 'Ans') {
      if (apiResult !== null && apiResult !== 'Erreur API') {
        setDisplay(prev => prev + apiResult);
      }
      return;
    }
    setDisplay(prev => prev + value);
  };

  return (
    <div className={`flex flex-col w-full ${isMobile ? 'min-h-screen pb-90' : isTablet ? 'min-h-screen pb-120' : 'h-full'}`}>
      <div className={`${isMobile ? 'px-4 pt-4 pb-2' : 'p-0'}`}>
        <ContentTitle title="Calculatrice" description="Effectuez vos calculs avec facilité" icon={<CalculatorIcon className="w-6 h-6" />} actions={actions} />
      </div>
      <div className={`flex-1 w-full ${isMobile ? 'px-4 pb-20' : 'p-6'} ${isMobile ? 'flex-col gap-4' : isTablet ? 'flex-col gap-5' : 'flex-row gap-6'} flex`}>
        {/* Clavier de la calculatrice */}
        <div className={`${isMobile ? 'order-2' : isTablet ? 'order-2' : 'flex-1 max-w-2xl'} flex flex-col items-center justify-center`}> 
          <div className="w-full flex justify-center">
            <div className={`grid ${isMobile ? 'grid-cols-4 gap-2' : isTablet ? 'grid-cols-6 gap-3' : 'grid-cols-6 gap-4'} w-full max-w-md p-4 bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl shadow-lg`}>
              {buttons.flat().map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(button)}
                  className={`
                    rounded-full font-bold text-lg transition-all duration-150 transform active:scale-95 shadow-md
                    bg-white hover:bg-purple-100 text-blue-700 border-2 border-blue-200
                    flex items-center justify-center
                    ${isMobile ? 'h-12 w-12 text-base' : isTablet ? 'h-14 w-14 text-lg' : 'h-16 w-16 text-xl'}
                  `}
                  style={{ boxShadow: '0 2px 8px rgba(160, 160, 255, 0.12)' }}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 text-gray-500 text-center text-sm">
            {isMobile ? 'Tapez sur les boutons' : 'Utilisez votre clavier ou cliquez sur les boutons pour saisir'}
          </div>
        </div>

        {/* Zone d'affichage et résultats */}
        <div className={`flex flex-col gap-6 ${isMobile ? 'order-1 gap-4' : isTablet ? 'order-1 gap-5' : 'flex-1'}`}>
          {/* Zone de saisie */}
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-700 mb-3 ${isMobile ? 'text-base' : 'text-lg'}`}>Expression</h3>
            <div className="border-b-2 border-gray-200 pb-4">
              <div className={`text-right font-mono text-gray-800 break-all leading-tight ${isMobile ? 'text-xl min-h-[40px]' : isTablet ? 'text-2xl min-h-[50px]' : 'text-3xl min-h-[60px]'}`}>
                {display}
              </div>
            </div>
          </div>

          {/* Zone de résultat */}
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-700 mb-3 ${isMobile ? 'text-base' : 'text-lg'}`}>Résultat</h3>
            <div className="border-b-2 border-[#1C274D]/30 pb-4">
              <div className={`text-right font-mono font-bold text-[#1C274D] break-all ${isMobile ? 'text-lg min-h-[35px]' : isTablet ? 'text-xl min-h-[40px]' : 'text-2xl min-h-[50px]'}`}>{apiResult !== null && apiResult !== 'Erreur API' ? apiResult : ''}</div>
              {apiResult === 'Erreur API' && (
                <div className="text-red-600 text-sm mt-2">Erreur lors du calcul, veuillez réessayer.</div>
              )}
            </div>
          </div>

          {/* Historique des calculs */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-semibold text-gray-700 ${isMobile ? 'text-base' : 'text-lg'}`}>Historique</h3>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
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
                history.map((entry, idx) => (
                  <div key={idx} className="border-l-2 border-[#1C274D]/20 pl-4 py-2">
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
                        {entry.timestamp}
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
  );
}