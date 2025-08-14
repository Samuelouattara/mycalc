'use client'

import PersonIcon from "../ui/icones/personIcon";
import ProfileIcon1 from "../ui/icones/ProfileIcon1";
import ProfileIcon2 from "../ui/icones/ProfileIcon2";
import ProfileIcon3 from "../ui/icones/ProfileIcon3";
import ProfileIcon4 from "../ui/icones/ProfileIcon4";
import ProfileIcon5 from "../ui/icones/ProfileIcon5";
import ProfileIcon6 from "../ui/icones/ProfileIcon6";
import ProfileIcon7 from "../ui/icones/ProfileIcon7";
import ProfileIcon8 from "../ui/icones/ProfileIcon8";
import ProfileIcon9 from "../ui/icones/ProfileIcon9";
import SearchIcon from "../ui/icones/searchIcon";
import { useState, useEffect, useRef } from "react";
import Dropdown from "../ui/icones/dropdown";
import { useSidebarStore } from "../../store/sidebarStore";
import { useResponsive } from "../../hooks/useResponsive";
import { getUserById } from "@/lib/auth";
import SearchModal from "../shared/SearchModal";

// Composant icône hamburger intégré
const HamburgerIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Composant flèche pour RetractIcon
const ArrowIcon = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}
    >
        <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default function Navbar() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('userId');
            window.location.href = '/login';
        }
    };
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userIcon, setUserIcon] = useState<number | null>(null);
    useEffect(() => {
        const userId = typeof window !== 'undefined' ? window.localStorage.getItem('userId') : null;
        if (!userId) return;
        getUserById(userId).then((data) => {
            setUserName(data.Nom || 'Utilisateur');
            setUserEmail(data.email || '');
            setUserIcon(data.icon ? Number(data.icon) : null);
        });
    }, []);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { toggleSidebar, sidebarState, setSidebarState } = useSidebarStore();
    const { isMobile, isTablet } = useResponsive();
    const isCollapsed = sidebarState === 'collapsed';

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleRetractClick = () => {
        if (isMobile) {
            // Sur mobile, basculer entre hidden et expanded
            const newState = sidebarState === 'expanded' ? 'hidden' : 'expanded';
            setSidebarState(newState);
        } else {
            // Sur desktop/tablet, utiliser le toggle normal
            toggleSidebar();
        }
    };

    // Gestion du raccourci Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchModalOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className={`
                w-full flex flex-row items-center justify-between bg-[#F7F7F7] shadow-sm border border-gray-100 rounded-xl flex-shrink-0
                ${isMobile ? 'px-4 py-3' : 'relative z-[55] px-6 py-3'}
                ${isTablet && !isMobile ? 'px-6 py-3' : ''}
                ${!isMobile && !isTablet ? 'p-4' : ''}
            `}>
                {/* Section gauche - Bouton sidebar */}
                <div className="flex items-center">
                    {isMobile && sidebarState !== 'expanded' ? (
                        <button 
                            onClick={handleRetractClick}
                            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 shadow-sm z-[60] relative"
                            aria-label="Menu"
                        >
                            <HamburgerIcon />
                        </button>
                    ) : !isMobile ? (
                        <button 
                            onClick={handleRetractClick}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                            aria-label="Toggle sidebar"
                        >
                            <ArrowIcon isCollapsed={isCollapsed} />
                        </button>
                    ) : null}
                </div>

                {/* Section centrale - Barre de recherche */}
                {!isMobile && (
                    <div className="flex-1 max-w-md mx-8">
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <SearchIcon />
                            </div>
                            
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-20 py-2 text-sm 
                                    focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300
                                    placeholder-gray-400 cursor-pointer"
                                onClick={() => setIsSearchModalOpen(true)}
                                readOnly
                            />
                            
                            {/* Indicateur Ctrl+K */}
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                                <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded border">
                                    Ctrl
                                </div>
                                <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded border">
                                    K
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Section droite - Profil utilisateur */}
                <div className="flex items-center">
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className={`flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors ${
                                isMobile ? 'space-x-2' : 'space-x-3'
                            }`}
                        >
                            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                                                                {(() => {
                                                                    switch(userIcon) {
                                                                        case 1: return <ProfileIcon1 />;
                                                                        case 2: return <ProfileIcon2 />;
                                                                        case 3: return <ProfileIcon3 />;
                                                                        case 4: return <ProfileIcon4 />;
                                                                        case 5: return <ProfileIcon5 />;
                                                                        case 6: return <ProfileIcon6 />;
                                                                        case 7: return <ProfileIcon7 />;
                                                                        case 8: return <ProfileIcon8 />;
                                                                        case 9: return <ProfileIcon9 />;
                                                                        default: return <PersonIcon />;
                                                                    }
                                                                })()}
                            </div>
                            {/* Infos utilisateur cachées sur mobile */}
                            {!isMobile && (
                                <div className="text-left">
                                    <div className="text-sm font-medium text-gray-900">{userName}</div>
                                    <div className="text-xs text-gray-500">{userEmail}</div>
                                </div>
                            )}
                            <div className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                <Dropdown />
                            </div>
                        </button>

                        {isDropdownOpen && (
                            <div className={`
                                absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50
                                ${isMobile ? 'w-40' : 'w-48'}
                            `}>
                                <div className="py-1">
                                    <a href="/Profil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">
                                        Profil
                                    </a>
                                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        {isMobile ? 'Paramètres' : 'Paramètres du Compte'}
                                    </a>
                                    <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">
                                        Se connecter
                                    </a>
                                    <a href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">
                                        Créer un compte
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100"
                                    >
                                        Déconnexion
                                    </button>
                                    <hr className="my-1" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de recherche */}
            <SearchModal 
                isOpen={isSearchModalOpen} 
                onClose={() => setIsSearchModalOpen(false)} 
            />
        </>
    )
}