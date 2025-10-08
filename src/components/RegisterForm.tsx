import { useForm } from 'react-hook-form';
import { useUsers } from '../hooks/useFetchUser';
import { Link, useNavigate } from 'react-router-dom';
import { InputLabel } from './InputLabel';
import { ButtonComponent } from './ButtonComponent';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchemaRegister } from '../validations/userSchema';
import { z } from 'zod';

type RegisterData = z.infer<typeof userSchemaRegister>;

export const RegisterForm = () => {
    const navigate = useNavigate()
    const { users, createUser } = useUsers();
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(userSchemaRegister)
    });

    const onSubmit = async (data: RegisterData) => {
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
            navigate('../login')

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
                    type='text'
                    id="register-email"
                    label="Correo electrónico"
                    placeholder="Correo electrónico"
                    register={{ ...register('email_user') }}
                    errors={errors.email_user?.message && <span className='text-red-400'>{errors.email_user?.message}</span>}
                />
                <InputLabel
                    type='password'
                    id="register-password"
                    label="Contraseña"
                    placeholder="*********"
                    register={{ ...register('password_user') }}
                    errors={errors.password_user?.message && <span className='text-red-400'>{errors.password_user?.message}</span>}
                />

                <InputLabel
                    type='password'
                    id="password-again"
                    label="Confirmar contraseña"
                    placeholder="*********"
                    register={{ ...register('confirmPassword') }}
                    errors={errors.confirmPassword?.message && <span className='text-red-400'>{errors.confirmPassword?.message}</span>}
                />

                <h3 className='text-[#4c9cfd] text-end text-sm cursor-pointer'>¿Olvidaste la contraseña?</h3>
                <ButtonComponent variant='primary' text='Registrarse' type='submit'/>
            </form>
        </div>
    );
};
