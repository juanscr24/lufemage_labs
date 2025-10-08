import { useForm } from 'react-hook-form';
import { useUsers } from '../hooks/useFetchUser';
import { Link } from 'react-router-dom';
import { InputLabel } from './InputLabel';
import { ButtonComponent } from './ButtonComponent';

type RegisterData = {
    email_user: string;
    password_user: string;
}

export const RegisterForm = () => {
    const { users, createUser } = useUsers();
    const { register, reset, handleSubmit } = useForm<RegisterData>();

    const onSubmit = async (data: RegisterData) => {
        if (data.email_user.trim() === '') {
            alert('El correo no puede estar vacío');
            return;
        }

        if (data.password_user.trim() === '') {
            alert('La contraseña no puede estar vacía');
            return;
        }

        const userExists = users.find(
            (user) => user.email_user === data.email_user
        );

        if (userExists) {
            alert('Este correo ya está registrado');
            return;
        }

        try {
            await createUser(data);
            alert('Usuario registrado exitosamente');
            reset();
        } catch (err) {
            alert('Error al registrar usuario');
            console.error(err);
        }
    };

    return (
        <div className='bg-white dark:bg-[#1e2939] p-10 shadow rounded-lg flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-extrabold text-gray-900 dark:text-white mb-3'>Crea tu cuenta</h1>
            <p className='mb-8 dark:text-[#99a1af]'>¿Ya tienes una cuenta? <Link className='text-[#4c9cfd]' to={'../login'}>Inicia sesion</Link></p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col w-[350px] gap-5 dark:text-[#99a1af]'
            >
                <InputLabel
                    id="register-email"
                    label="Correo electrónico"
                    placeholder="Correo electrónico"
                    register={{ ...register('email_user') }}
                />

                <InputLabel
                    id="register-password"
                    label="Contraseña"
                    placeholder="*********"
                    register={{ ...register('password_user') }}
                />

                <InputLabel
                    id="password-again"
                    label="Confirmar contraseña"
                    placeholder="*********"
                    register={{ ...register('password_user') }}
                />
                <h3 className='text-[#4c9cfd] text-end text-sm cursor-pointer'>¿Olvidaste la contraseña?</h3>
                <ButtonComponent text='Registrarse' />
            </form>
        </div>
    );
};
