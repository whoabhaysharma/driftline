export default function Post({
    content = ''
}) {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-blue-800">
            <h1 className="font-bold text-5xl text-white">{content}</h1>
        </div>
    )
}