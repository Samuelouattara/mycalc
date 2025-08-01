import { useState } from "react";
import AdminIcon from "../ui/icones/AdminIcon";
import DateIcon from "../ui/icones/DateIcon";
import SimpleUserIcon from "../ui/icones/SimpleUser";
import SortingIcon from "../ui/icones/SortingIcon";
import { useResponsive } from "@/hooks/useResponsive";


interface KpiItem {
    id: number; 
    label: string;
    nombre?: number;
    Description: string;
    href: string;
    icon?: React.ReactNode;
}

const KpiItems: KpiItem[] = [
    {
        id: 1,
        label: "ADMINS",
        nombre: 5,
        Description : "Affiche les utilisateurs ayant le rôle d'admin.",
        href: "/",
        icon: <AdminIcon />
    },
    {
        id: 2,
        label: "Utilisateurs simples",
        nombre : 20,
        Description : "Affiche les utilisateurs simples.",
        href: "/calculer",
        icon: <SimpleUserIcon />,
    },
  
    {
        id: 4,
        label: "Tous les utilisateurs",
        Description : "Affiche tous les utilisateurs.",
        href: "/utilisateurs",
        icon: <SortingIcon />
    }
];

interface KpiUsersProps {
    onKpiChange?: (selectedKpi: number | null) => void;
}

export default function KpiUsers({ onKpiChange }: KpiUsersProps) {
    const [selectedKpi, setSelectedKpi] = useState<number | null>(null);
    const { isMobile, isTablet } = useResponsive();

    const handleKpiClick = (id: number) => {
        const newSelectedKpi = selectedKpi === id ? null : id;
        setSelectedKpi(newSelectedKpi);
        if (onKpiChange) {
            onKpiChange(newSelectedKpi);
        }
    };

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 border-b border-gray-200 pb-6
        ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4 '}`}>
            {KpiItems.map(item => (
                <div 
                    key={item.id} 
                    onClick={() => handleKpiClick(item.id)}
                    className={`rounded-lg border border-[#1C274D] p-4 shadow-sm transition-all duration-200 cursor-pointer ${
                        selectedKpi === item.id 
                            ? 'bg-[#1C274D]' 
                            : 'bg-white hover:border-blue-300'
                    }`}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className={`text-lg font-semibold ${
                            selectedKpi === item.id ? 'text-white' : 'text-black'
                        }`}>
                            {item.label}
                        </div>
                        {item.icon && (
                            <div className="w-8 h-8 flex items-center justify-center">
                                {item.icon}
                            </div>
                        )}
                    </div>
                    {item.nombre && (
                        <div className={`text-2xl font-bold mb-2 ${
                            selectedKpi === item.id ? 'text-white' : 'text-black'
                        }`}>
                            {item.nombre}
                        </div>
                    )}
                    <div className={`text-sm ${
                        selectedKpi === item.id ? 'text-white' : 'text-gray-600'
                    }`}>
                        {item.Description}
                    </div>
                </div>
            ))}
        </div>
    );
}