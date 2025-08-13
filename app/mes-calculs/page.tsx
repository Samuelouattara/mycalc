'use client';

import React, { useEffect, useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { getUserCalculationHistory } from '@/lib/calculs';

export default function Page() {
  const { isMobile } = useResponsive();
  const [calculations, setCalculations] = useState<Array<{ id: number; expression: string; operator?: string; result: string; createdAt: string }> | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const kpiOperators = ['+', '-', '*', '/', 'all'];
  const operatorLabels: Record<string, string> = {
    '+': 'Addition',
    '-': 'Soustraction',
    '*': 'Multiplication',
    '/': 'Division',
    'all': 'Tous les calculs'
  };

  const operatorIcons: Record<string, string> = {
    '+': '➕',
    '-': '➖',
    '*': '✖️',
    '/': '➗',
    'all': '📊'
  };

  const operatorColors: Record<string, string> = {
    '+': 'bg-green-100 text-green-800 border-green-200',
    '-': 'bg-red-100 text-red-800 border-red-200',
    '*': 'bg-blue-100 text-blue-800 border-blue-200',
    '/': 'bg-purple-100 text-purple-800 border-purple-200',
    'all': 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const loadCalculations = async () => {
    const userId = window.localStorage.getItem('userId');
    if (!userId) {
      setCalculations([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await getUserCalculationHistory(userId, page, selectedOperator);
      if (data && typeof data === 'object' && 'history' in data && 'total' in data) {
        setCalculations(Array.isArray((data as any).history) ? (data as any).history : []);
        setTotal((data as any).total || 0);
        setPageSize((data as any).pageSize || 5);
      } else {
        const resultArray = Array.isArray(data) ? data : [data];
        setCalculations(resultArray);
        setTotal(resultArray.length);
      }
    } catch (error) {
      setCalculations([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalculations();
  }, [page, selectedOperator]);

  const handleOperatorChange = (operator: string) => {
    setSelectedOperator(operator);
    setPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className={`w-full ${isMobile ? 'min-h-screen px-4 pt-4 pb-24' : 'p-6'}`}>
      {/* Header avec statistiques */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Mes Calculs</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>Total: <strong className="text-blue-600">{total}</strong> calculs</span>
          </div>
          {selectedOperator !== 'all' && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Filtré par: <strong className="text-green-600">{operatorLabels[selectedOperator]}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Filtres d'opérateurs */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrer par opérateur</h3>
        <div className="flex flex-wrap gap-3">
          {kpiOperators.map(op => (
            <button
              key={op}
              onClick={() => handleOperatorChange(op)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                selectedOperator === op 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <span className="text-lg">{operatorIcons[op]}</span>
              <span>{operatorLabels[op]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenu principal */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600">Chargement de l'historique...</span>
          </div>
        </div>
      ) : calculations && calculations.length > 0 ? (
        <div className="space-y-6">
          {/* Liste des calculs */}
          <div className="flex flex-wrap gap-4">
            {calculations.map((calc, index) => (
              <div 
                key={calc.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 flex-1 min-w-[300px] max-w-[400px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${operatorColors[calc.operator || 'all']}`}>
                      {operatorIcons[calc.operator || 'all']} {operatorLabels[calc.operator || 'all']}
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      #{calc.id}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDate(calc.createdAt)}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">Expression:</span>
                    <div className="bg-gray-50 px-4 py-2 rounded-lg font-mono text-lg text-gray-800">
                      {calc.expression}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">Résultat:</span>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-lg font-bold text-xl text-green-700 border border-green-200">
                      = {calc.result}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {Math.ceil(total / pageSize) > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Précédent
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, Math.ceil(total / pageSize)) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        page === pageNum 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setPage(Math.min(Math.ceil(total / pageSize), page + 1))}
                disabled={page === Math.ceil(total / pageSize)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant →
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🧮</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun calcul trouvé</h3>
          <p className="text-gray-500">
            {selectedOperator === 'all' 
              ? "Vous n'avez pas encore effectué de calculs." 
              : `Aucun calcul avec l'opérateur "${operatorLabels[selectedOperator]}" trouvé.`
            }
          </p>
        </div>
      )}
    </div>
  );
}