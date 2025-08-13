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

  useEffect(() => {
    // Récupère l'id utilisateur connecté dynamiquement
    const userId = window.localStorage.getItem('userId');
    if (!userId) {
      setCalculations([]);
      setLoading(false);
      return;
    }
    getUserCalculationHistory(userId, page)
      .then((data: any) => {
        if (data && typeof data === 'object' && 'history' in data && 'total' in data) {
          setCalculations(Array.isArray((data as any).history) ? (data as any).history : []);
          setTotal((data as any).total || 0);
          setPageSize((data as any).pageSize || 5);
        } else {
          const resultArray = Array.isArray(data) ? data : [data];
          setCalculations(resultArray);
          setTotal(resultArray.length);
        }
        setLoading(false);
      })
      .catch(() => {
        setCalculations([]);
        setTotal(0);
        setLoading(false);
      });
  }, [page]);

  // Filtre les calculs selon l'opérateur sélectionné
  const filteredCalculations = calculations
    ? selectedOperator === 'all'
      ? calculations
      : calculations.filter(calc => calc.operator === selectedOperator)
    : [];

  return (
    <div className={`w-full ${isMobile ? 'min-h-screen px-4 pt-4 pb-24' : ''}`}>
      <h2 className="text-2xl font-bold mb-4">Mes Calculs</h2>
      <div className="mb-2 text-blue-700 font-semibold">Total calculs effectués : {total}</div>
      <div className="flex gap-2 mb-6">
        {kpiOperators.map(op => (
          <button
            key={op}
            onClick={() => setSelectedOperator(op)}
            className={`px-4 py-2 rounded-lg font-semibold border transition-colors
              ${selectedOperator === op ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
          >
            {operatorLabels[op]}
          </button>
        ))}
      </div>
      {loading ? (
        <div>Chargement de l'historique...</div>
      ) : filteredCalculations && filteredCalculations.length > 0 ? (
        <>
          <ul className="space-y-4">
            {filteredCalculations.map(calc => (
              <li key={calc.id} className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <div className="font-semibold text-blue-900">{calc.expression}</div>
                <div className="text-gray-700">Opérateur : <span className="font-bold">{calc.operator}</span></div>
                <div className="text-green-700 font-bold">= {calc.result}</div>
                <div className="text-xs text-gray-500 mt-1">{new Date(calc.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
          {/* Pagination numérotée */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: Math.max(1, Math.ceil(total / pageSize)) }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                className={`px-3 py-1 rounded border font-semibold transition-colors ${num === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>Aucun calcul trouvé pour ce compte.</div>
      )}
    </div>
  );
}