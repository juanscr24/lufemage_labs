import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useUsers } from '../hooks/useFetchUser';

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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col p-4 bg-gray-200 rounded-lg gap-10'
        >
            <Input
                id="register-email"
                placeholder="Correo"
                startAdornment={
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                }
                {...register('email_user')}
            />

            <Input
                type="password"
                id="register-password"
                placeholder="Contraseña"
                startAdornment={
                    <InputAdornment position="start">
                        <PasswordIcon />
                    </InputAdornment>
                }
                {...register('password_user')}
            />

            <Button type="submit" variant="outlined">
                Registrarse
            </Button>
        </form>
    );
};
