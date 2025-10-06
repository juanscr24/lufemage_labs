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
      className='flex flex-col p-4 bg-gray-200 rounded-lg gap-10'>

      <Input
        id="input-email"
        placeholder="Correo"
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
        {...register('email_user')}
      />

      <Input
        type='password'
        id="input-password"
        placeholder="Contraseña"
        startAdornment={
          <InputAdornment position="start">
            <PasswordIcon />
          </InputAdornment>
        }
        {...register('password_user')}
      />

      <Button type='submit' variant="outlined">Iniciar sesión</Button>
    </form>
  );
};
