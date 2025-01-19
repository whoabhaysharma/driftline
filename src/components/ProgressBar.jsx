export default function ProgressBar({
    progress = 0
}) {
    return (
        <div className="w-full h-2 bg-gray-200 rounded-full relative overflow-hidden">
            <div
                style={{
                    width: `${progress}%`
                }}
                className="h-full w-[0%] absolute left-0 top-0 bg-gray-500"
            >

            </div>
        </div>
    )
}