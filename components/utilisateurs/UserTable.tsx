import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';
import { useResponsive } from '../../hooks/useResponsive';
import { UserDto } from '@/type/auth';
import './table-styles.css';

// Définir les colonnes
const columnHelper = createColumnHelper<UserDto>();

const columns = [
  columnHelper.accessor('Nom', {
    header: 'Nom & Prénom',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('opetype', {
    header: "Type d'opération Favori",
    cell: info => {
      const op = info.getValue();
      let label = '';
      let colors: Record<string, string> = {
        'Addition': 'bg-blue-100 text-blue-800',
        'Soustraction': 'bg-orange-100 text-orange-800',
        'Multiplication': 'bg-purple-100 text-purple-800',
        'Division': 'bg-pink-100 text-pink-800'
      };
      switch (op) {
        case '+': label = 'Addition'; break;
        case '-': label = 'Soustraction'; break;
        case '*': label = 'Multiplication'; break;
        case '/': label = 'Division'; break;
        default: label = op || 'Non défini';
      }
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${colors[label] || 'bg-gray-100 text-gray-800'}`}>
          {label}
        </span>
      );
    }
  }),
  columnHelper.accessor('calculationsCount', {
    header: 'Nombre de Calculs',
    cell: info => (
      <span className="font-semibold text-blue-600">
        {info.getValue()}
      </span>
    )
  }),
  columnHelper.accessor('createdAt', {
    header: "Date d'inscription",
    cell: info => {
      const date = new Date(info.getValue());
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  }),
  columnHelper.accessor('lastcalc', {
    header: 'Dernier Calcul',
    cell: info => {
      const lastCalc = info.getValue();
      return lastCalc ? (
        <span className="text-sm text-gray-600 font-mono">
          {lastCalc}
        </span>
      ) : (
        <span className="text-sm text-gray-400 italic">
          Aucun calcul
        </span>
      );
    }
  }),
];

interface UserTableProps {
  users: UserDto[];
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

export default function UserTable({ users, loading, error, onRefresh }: UserTableProps) {
  const { isMobile } = useResponsive();

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-700 mb-4">{error}</p>
        {onRefresh && (
          <button 
            onClick={onRefresh}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="table-container relative">
      {/* Indicateur de scroll sur mobile */}
      {isMobile && (
        <div className="scroll-indicator mb-3 text-xs text-gray-600 text-center bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-center justify-center gap-2">
            <span>📱</span>
            <span>Faites défiler horizontalement pour voir toutes les colonnes</span>
            <span>👉</span>
          </div>
        </div>
      )}
      
      <div className={`
        shadow-lg rounded-lg border border-gray-200 table-container
        ${isMobile ? 'overflow-x-auto' : 'overflow-x-auto'}
      `}>
        <table className={`bg-white ${isMobile ? 'w-max min-w-full' : 'min-w-full'}`}>
          <thead className={`bg-[#1C274D] ${isMobile ? 'table-header-mobile' : ''}`}>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className={`
                    text-left text-sm font-semibold text-white uppercase tracking-wider border-b border-gray-300
                    ${isMobile ? 'px-4 py-3 whitespace-nowrap min-w-[140px]' : 'px-6 py-4'}
                  `}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={`
                    text-sm text-gray-900 border-b border-gray-200
                    ${isMobile ? 'px-4 py-3 whitespace-nowrap min-w-[140px] table-cell-mobile' : 'px-6 py-4'}
                  `}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Indicateur de navigation sur mobile */}
      {isMobile && (
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="w-8 h-1 bg-blue-300 rounded-full"></div>
          <span>Défilez pour plus de données</span>
          <div className="w-8 h-1 bg-blue-300 rounded-full"></div>
        </div>
      )}

      {/* Message si aucun utilisateur */}
      {users.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👥</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun utilisateur</h3>
          <p className="text-gray-500">Aucun utilisateur n'a été trouvé.</p>
        </div>
      )}
    </div>
  );
}
