export default function AdminIcon() {
    return (
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 512 512" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
        >
            <circle cx="256" cy="128" r="64" fill="#F0C087" />
            <path 
                d="M384 384c0-70.7-57.3-128-128-128s-128 57.3-128 128" 
                fill="#707487"
            />
            <rect x="208" y="80" width="96" height="32" rx="16" fill="#694B4B" />
            <path 
                d="M256 32c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16s16-7.2 16-16V48c0-8.8-7.2-16-16-16z" 
                fill="#C7CFE2"
            />
        </svg>
    )
}