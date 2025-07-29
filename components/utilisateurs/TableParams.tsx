import React from 'react';
import SearchIcon from '@/components/ui/icones/searchIcon';
import CtrlFIcon from '@/components/ui/icones/CtrlFIcon';
import RefreshIcon from '@/components/ui/icones/refreshIcon';

export default function TableParams() {
    const handleRefresh = () => {
        // Logique pour actualiser les données
        console.log('Actualisation des données...');
    };

    return (
        <div className="w-100 flex items-center justify-end gap-4 p-4 bg-white shadow-sm border-b border-gray-100 rounded-xl ml-auto">
            {/* Barre de recherche avec Ctrl+F */}
            <div className="relative w-80">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Users"
                        className="w-full bg-gray-50 border-0 rounded-lg pl-10 pr-16 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white justify-end"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CtrlFIcon />
                    </div>
                </div>
            
            {/* Bouton Actualiser */}
            <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-[#1C274D] text-white text-sm font-medium rounded-lg hover:bg-[#1C274D] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <RefreshIcon />
                Actualiser
            </button>
        </div>
    );
}