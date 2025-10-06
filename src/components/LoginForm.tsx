import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useUsers } from '../hooks/useFetchUser';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface LoginData {
  email_user: string;
  password_user: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const { users } = useUsers();
  const { register, reset, handleSubmit } = useForm<LoginData>();
  const login = useAuthStore((state) => state.login);

  const onSubmit = (data: LoginData) => {
    if (data.email_user.trim() === '') {
      alert('El email no puede estar vacío');
      return;
    }

    if (data.password_user.trim() === '') {
      alert('La contraseña no puede estar vacía');
      return;
    }

    const userFound = users.find(
      user =>
        user.email_user === data.email_user &&
        user.password_user === data.password_user
    );

    if (userFound) {
      alert('Login exitoso ✅');
      console.log('Usuario logueado:', userFound);
      reset();
      login(userFound);
      navigate('/');

    } else {
      alert('Credenciales incorrectas ❌');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col p-12 bg-white shadow rounded-lg gap-10 dark:bg-[#191b21] dark:text-white'>
      <h1 className='text-center font-bold text-3xl'>Login</h1>
      <Input
        id="input-email"
        placeholder="Correo"
        className='dark:text-white! border-none hover:border-none'
        startAdornment={
          <InputAdornment position="start"
            className='py-2 px-1 bg-[#087ea4] rounded-l-sm'
          >
            <AccountCircle className='text-white' />
          </InputAdornment>
        }
        {...register('email_user')}
      />

      <Input
        type='password'
        id="input-password"
        placeholder="Contraseña"
        startAdornment={
          <InputAdornment
            position="start"
            className='py-2 px-1 bg-[#087ea4] rounded-l-sm'
          >
            <PasswordIcon className='text-white' />
          </InputAdornment>
        }
        {...register('password_user')}
      />

      <Button className='text-white! bg-[#087ea4]!' type='submit' color='success'>Iniciar sesión</Button>
    </form>
  );
};
