'use client'

import PersonIcon from "../ui/icones/personIcon";
import SearchIcon from "../ui/icones/searchIcon";
import Notification from "../ui/icones/notification";
import MessageIcon from "../ui/icones/message";

import { useState } from "react";
import Dropdown from "../ui/icones/dropdown";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-full flex flex-row items-center justify-between p-4 bg-[#F7F7F7] rounded-xl shadow-sm">
            <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded-lg pl-10 pr-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex items-center space-x-4">
                <MessageIcon />
                <Notification />
                <PersonIcon />
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="font-semibold group relative border-blue-500 border-2 rounded-md px-3 py-1 hover:bg-blue-50 transition-colors flex items-center space-x-2"
                    >
                        <span>Samuel Otr</span>
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