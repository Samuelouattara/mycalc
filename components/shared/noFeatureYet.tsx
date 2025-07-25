import React from 'react'

interface NoFeatureYetProps {
    title: string;
    description: string;
}

export default function NoFeatureYet({ title, description }: NoFeatureYetProps) {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-gray-500'>{description}</p>
        </div>
    )
}