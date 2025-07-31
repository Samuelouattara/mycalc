"use client";

import { useResponsive } from "../../hooks/useResponsive";

interface ContentTitleProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    actions?: {
        label: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary';
    }[];
}

export default function ContentTitle({ title, description, icon, actions }: ContentTitleProps) {
    const { isMobile, isTablet } = useResponsive();
    
    return (
        <div className={`
            pt-5 flex items-center justify-between w-full
            ${isMobile ? 'flex-col gap-4 items-start' : ''}
        `}>
            <div className="flex items-center gap-3">
                {icon && (
                    <div className="text-gray-600">
                        {icon}
                    </div>
                )}
                <div>
                    <h1 className={`
                        font-bold text-gray-900
                        ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'}
                    `}>{title}</h1>
                    <p className={`
                        text-gray-600 mt-1
                        ${isMobile ? 'text-sm' : 'text-base'}
                    `}>{description}</p>
                </div>
            </div>
            
            {actions && actions.length > 0 && (
                <div className={`
                    flex gap-3
                    ${isMobile ? 'w-full' : ''}
                `}>
                    {actions.map((action, index) => (
                        <button 
                            key={index} 
                            onClick={action.onClick} 
                            className={`
                                px-4 py-2 rounded-lg font-medium transition-colors
                                ${isMobile ? 'flex-1 text-sm' : ''}
                                ${action.variant === 'primary' 
                                    ? 'bg-[#1C274D]/80 text-white hover:bg-[#1C274D]' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }
                            `}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}