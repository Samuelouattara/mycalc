'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "../ui/icones/searchIcon";
import IconDashboard from "../ui/icones/IconDashboard";
import CalculerIcon from "../ui/icones/calculerIcon";
import HistoryIcon from "../ui/icones/historyIcon";
import UsersIcon from "../ui/icones/usersIcon";
import ProfilIcon from "../ui/icones/ProfilIcon";
import SettingsIcon from "../ui/icones/settingsIcon";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const searchItems = [
        { id: 'dashboard', label: 'Dashboard', href: '/', icon: <IconDashboard />, category: 'Pages' },
        { id: 'calculer', label: 'Calculer', href: '/calculer', icon: <CalculerIcon />, category: 'Pages' },
        { id: 'mes-calculs', label: 'Mes calculs', href: '/mes-calculs', icon: <HistoryIcon />, category: 'Pages' },
        { id: 'utilisateurs', label: 'Utilisateurs', href: '/utilisateurs', icon: <UsersIcon />, category: 'Pages' },
        { id: 'profil', label: 'Profil', href: '/Profil', icon: <ProfilIcon />, category: 'Pages' },
        { id: 'settings', label: 'Paramètres', href: '/settings', icon: <SettingsIcon />, category: 'Général' },
    ];

    const filteredItems = searchItems.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, typeof searchItems>);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setSearchTerm('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const selectedItem = filteredItems[selectedIndex];
                if (selectedItem) {
                    router.push(selectedItem.href);
                    onClose();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredItems, selectedIndex, router, onClose]);

    // Gestion du clic à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-start justify-center pt-20">
            <div 
                ref={modalRef}
                className="bg-[#F7F7F7] rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[600px] overflow-hidden border border-gray-200"
            >
                {/* Barre de recherche */}
                <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <SearchIcon />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Rechercher dans l'application..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent text-gray-900 placeholder-gray-500 pl-10 pr-4 py-2 text-lg focus:outline-none"
                        />
                    </div>
                </div>

                {/* Contenu de recherche */}
                <div className="max-h-[500px] overflow-y-auto bg-[#F7F7F7]">
                    {Object.entries(groupedItems).map(([category, items]) => (
                        <div key={category}>
                            <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                                {category}
                            </div>
                            {items.map((item, index) => {
                                const globalIndex = filteredItems.findIndex(fi => fi.id === item.id);
                                const isSelected = globalIndex === selectedIndex;
                                
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            router.push(item.href);
                                            onClose();
                                        }}
                                        className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                                            isSelected 
                                                ? 'bg-white shadow-sm border-l-4 border-[#1C274D]' 
                                                : 'hover:bg-gray-50'
                                        }`}
                                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                                    >
                                        <div className={`mr-3 ${isSelected ? 'text-[#1C274D]' : 'text-gray-500'}`}>
                                            {item.icon}
                                        </div>
                                        <span className={`font-medium ${isSelected ? 'text-[#1C274D]' : 'text-gray-700'}`}>
                                            {item.label}
                                        </span>
                                        <span className="ml-auto text-gray-400">→</span>
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                    
                    {filteredItems.length === 0 && (
                        <div className="px-4 py-8 text-center text-gray-500">
                            Aucun résultat trouvé
                        </div>
                    )}
                </div>

                {/* Barre d'action */}
                <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 flex items-center text-xs text-gray-300">
                    <span>←</span>
                    <span className="ml-2">Aller à la page</span>
                </div>
            </div>
        </div>
    );
}
