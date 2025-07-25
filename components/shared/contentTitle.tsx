"use client";

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
    return (
        <div className="pt-5 flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                {icon && (
                    <div className="text-gray-600">
                        {icon}
                    </div>
                )}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                    <p className="text-gray-600 mt-1">{description}</p>
                </div>
            </div>
            
            {actions && actions.length > 0 && (
                <div className="flex gap-3">
                    {actions.map((action, index) => (
                        <button 
                            key={index} 
                            onClick={action.onClick} 
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                action.variant === 'primary' 
                                    ? 'bg-[#1C274D]/80 text-white hover:bg-[#1C274D]' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}