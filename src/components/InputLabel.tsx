interface IInputLabel {
    id: string;
    placeholder: string;
    label?: string;
    register?: any;
    errors?: any;
    type: 'text' | 'number' | 'password'
}

export const InputLabel = ({ id, placeholder, label, register, type, errors }: IInputLabel) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                className='
                p-3 rounded-lg bg-[#f9fafb] outline-none border border-[#ebedef] 
                dark:placeholder:text-[#99a1af] dark:text-white dark:border-[#4b5563] dark:bg-[#374151]'
                id={id}
                placeholder={placeholder}
                {...register}
            />
            {errors}
        </div>
    )
}
