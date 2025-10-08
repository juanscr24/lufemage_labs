interface IButton {
    text: string;
}
export const ButtonComponent = ({ text }: IButton) => {
    return (
        <button
            className="bg-[#2563eb] text-white w-full font-bold rounded-lg p-3 cursor-pointer hover:bg-[#1d4ed8]">
            {text}
        </button>
    )
}
