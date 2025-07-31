'use client'

import PersonIcon from "../ui/icones/personIcon";
import SearchIcon from "../ui/icones/searchIcon";
import Notification from "../ui/icones/notification";
import MessageIcon from "../ui/icones/message";
import CtrlFIcon from "../ui/icones/CtrlFIcon";
import { useState } from "react";
import Dropdown from "../ui/icones/dropdown";
import RetractIcon from "../ui/icones/RetractIcon";
import { useSidebarStore } from "../../store/sidebarStore";
import { useResponsive } from "../../hooks/useResponsive";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { toggleSidebar, sidebarState, setSidebarState } = useSidebarStore();
    const { isMobile, isTablet } = useResponsive();
    const isCollapsed = sidebarState === 'collapsed';

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleRetractClick = () => {
        toggleSidebar();
    };

    return (
        <div className={`
            w-full flex flex-row items-center justify-between bg-white shadow-sm border-b border-gray-100
            ${isMobile ? 'px-4 py-3' : isTablet ? 'px-6 py-3' : 'p-4'}
        `}>
            <div className="flex items-center space-x-2 md:space-x-4">
                <button 
                    onClick={handleRetractClick}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <div className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}>
                        <RetractIcon />
                    </div>
                </button>
                
                {/* Barre de recherche avec Ctrl+F - cachée sur mobile */}
                {!isMobile && (
                    <div className="relative max-w-md">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <SearchIcon />
                        </div>
                        
                        <input
                            type="text"
                            placeholder="Search task"
                            className={`
                                bg-gray-50 border-0 rounded-lg pl-10 pr-16 py-2 text-sm 
                                focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white
                                ${isTablet ? 'w-48' : 'w-full'}
                            `}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CtrlFIcon />
                        </div>
                    </div>
                )}
            </div>            {/* Section droite avec icônes et utilisateur */}
            <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
                {/* Icônes cachées sur mobile très petit */}
                {!isMobile && (
                    <>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MessageIcon />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Notification />
                        </button>
                    </>
                )}
                
                {/* Profil utilisateur - adapté selon l'écran */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className={`flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors ${
                            isMobile ? 'space-x-2' : 'space-x-3'
                        }`}
                    >
                        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                            <PersonIcon />
                        </div>
                        {/* Infos utilisateur cachées sur mobile */}
                        {!isMobile && (
                            <div className="text-left">
                                <div className="text-sm font-medium text-gray-900">Samuel Otr</div>
                                <div className="text-xs text-gray-500">samuelotr@gmail.com</div>
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
                                <a href="/utilisateurs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Profile
                                </a>
                                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    {isMobile ? 'Paramètres' : 'Paramètres du Compte'}
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Se déconnecter
                                </a>
                                
                                <hr className="my-1" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}