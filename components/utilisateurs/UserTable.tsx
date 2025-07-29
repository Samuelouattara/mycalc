import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';

// Définir le type pour les données utilisateur
interface UserData {
  firstName: string;
  email: string;
  TypeFavorisOperation: string;
  DateArrivee: string;
  Profil: string;
  DernierCalcul: string;
}

// Exemple de données
const defaultData: UserData[] = [
  { firstName: 'Alice', email : 'christ@gmail.com', TypeFavorisOperation : 'Addition', DateArrivee: '2023-03-01', Profil : 'Admin', DernierCalcul: '2*4 = 8' },
  { firstName: 'Bob', email : 'bob@gmail.com', TypeFavorisOperation : 'Soustraction', DateArrivee: '2023-02-01', Profil : 'User', DernierCalcul: '2*4 = 8' },
  { firstName: 'Charlie', email : 'charlie@gmail.com', TypeFavorisOperation : 'Multiplication', DateArrivee: '2023-01-01', Profil : 'User', DernierCalcul: '2*4 = 8' },
   { firstName: 'Charlie', email : 'charlie@gmail.com', TypeFavorisOperation : 'Multiplication', DateArrivee: '2023-01-01', Profil : 'Admin', DernierCalcul: '2*4 = 8' },
];

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
    header: 'Type d\'opération Favori',
    cell: info => {
      const operation = info.getValue();
      const colors: Record<string, string> = {
        'Addition': 'bg-blue-100 text-blue-800',
        'Soustraction': 'bg-orange-100 text-orange-800',
        'Multiplication': 'bg-purple-100 text-purple-800',
        'Division': 'bg-pink-100 text-pink-800'
      };
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${colors[operation] || 'bg-gray-100 text-gray-800'}`}>
          {operation}
        </span>
      );
    }
    }),
    columnHelper.accessor('DateArrivee', {
    header: 'Date d\'arrivée',
    cell: info => info.getValue()
    }),
    columnHelper.accessor('Profil', {
    header: 'Profil',
    cell: info => {
      const profil = info.getValue();
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          profil === 'Admin' 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {profil}
        </span>
      );
    }
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
  const filteredData = useMemo(() => {
    console.log('Recalculating filteredData - showAdminOnly:', showAdminOnly, 'showUserOnly:', showUserOnly);
    return showAdminOnly
      ? defaultData.filter(user => user.Profil === 'Admin')
      : showUserOnly
      ? defaultData.filter(user => user.Profil === 'User')
      : defaultData;
  }, [showAdminOnly, showUserOnly]);

  console.log('MyTable render - showAdminOnly:', showAdminOnly, 'showUserOnly:', showUserOnly, 'filteredData length:', filteredData.length);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead className="bg-[#1C274D]">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider border-b border-gray-300">
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
                <td key={cell.id} className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
