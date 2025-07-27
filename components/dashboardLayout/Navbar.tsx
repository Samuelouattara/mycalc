'use client'

import PersonIcon from "../ui/icones/personIcon";
import SearchIcon from "../ui/icones/searchIcon";
import Notification from "../ui/icones/notification";
import MessageIcon from "../ui/icones/message";
import CtrlFIcon from "../ui/icones/CtrlFIcon";
import { useState } from "react";
import Dropdown from "../ui/icones/dropdown";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-full flex flex-row items-center justify-between p-4 bg-white shadow-sm border-b border-gray-100">
            {/* Barre de recherche avec Ctrl+F */}
            <div className="relative max-w-md">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="Search task"
                    className="w-full bg-gray-50 border-0 rounded-lg pl-10 pr-16 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CtrlFIcon />
                </div>
            </div>

            {/* Section droite avec icônes et utilisateur */}
            <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MessageIcon />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Notification />
                </button>
                
                {/* Profil utilisateur */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                            <PersonIcon />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-medium text-gray-900">Samuel Otr</div>
                            <div className="text-xs text-gray-500">samuelotr@gmail.com</div>
                        </div>
                        <div className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                            <Dropdown />
                        </div>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <div className="py-1">
                                <a href="/utilisateurs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Profile
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Sign out
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