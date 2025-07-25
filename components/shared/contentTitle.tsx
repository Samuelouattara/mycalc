export default function ContentTitle({ title }: { title: string }) {
    return (
        <div className="flex flex-col h-full w-80 bg-[#F7F7F7] p-2 ml-2 mt-2 rounded-xl">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    )
}