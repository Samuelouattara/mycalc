import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';
import { useResponsive } from '../../hooks/useResponsive';
import './table-styles.css';

// Définir le type pour les données utilisateur
interface UserData {
  firstName: string;
  email: string;
  TypeFavorisOperation: string;
  DateArrivee: string;
  Profil: string;
  DernierCalcul: string;
}

// Supprime les profils fictifs :
// const defaultData: UserData[] = [];

// Définir les colonnes
const columnHelper = createColumnHelper<UserData>();

const columns = [
  columnHelper.accessor('firstName', {
    header: 'Nom & Prénom',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('TypeFavorisOperation', {
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
  columnHelper.accessor('DateArrivee', {
    header: "Date d'arrivée",
    cell: info => info.getValue()
  }),
  columnHelper.accessor('DernierCalcul', {
    header: 'Dernier Calcul',
    cell: info => info.getValue()
  }),
];

interface MyTableProps {
  showAdminOnly?: boolean;
  showUserOnly?: boolean;
}

function MyTable({ showAdminOnly = false, showUserOnly = false }: MyTableProps) {
  const { isMobile } = useResponsive();
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3007/users')
      .then(res => {
        // Adapter le mapping selon la structure du backend
        const mapped = res.data.map((user: any) => {
          let dateStr = user.createdAt || user.date || '';
          let formattedDate = '';
          if (dateStr) {
            const d = new Date(dateStr);
            if (!isNaN(d.getTime())) {
              formattedDate = d.toISOString().slice(0, 10);
            } else {
              formattedDate = dateStr;
            }
          }
          return {
            firstName: user.Nom || '',
            email: user.email || '',
            TypeFavorisOperation: user.opetype || '',
            DateArrivee: formattedDate,
            Profil: user.role || '',
            DernierCalcul: user.lastcalc || '',
          };
        });
        setUsers(mapped);
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
      });
  }, []);

  const filteredData = useMemo(() => {
    return showAdminOnly
      ? users.filter(user => user.Profil === 'Admin')
      : showUserOnly
      ? users.filter(user => user.Profil === 'User')
      : users;
  }, [showAdminOnly, showUserOnly, users]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
    </div>
  );
}

interface UserTableProps {
  selectedKpi?: number | null;
}

export default function UserTable({ selectedKpi }: UserTableProps) {
  console.log('UserTable render - selectedKpi:', selectedKpi);
  
  // Simplification temporaire pour debug
  const showAdminOnly = selectedKpi === 1;
  
  if (selectedKpi === 1) {
    // Affichage simple quand ADMINS est sélectionné
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tableau des Utilisateurs (ADMINS seulement)</h1>
        <div className="bg-blue-100 p-4 rounded">
       
          <MyTable showAdminOnly={showAdminOnly} />
        </div>
      </div>
    );
  }

  if (selectedKpi === 2) {
    // Affichage simple quand USERS est sélectionné
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tableau des Utilisateurs (USERS seulement)</h1>
        <MyTable showUserOnly={true} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau des Utilisateurs</h1>
      <MyTable showAdminOnly={showAdminOnly} />
    </div>
  );
}
