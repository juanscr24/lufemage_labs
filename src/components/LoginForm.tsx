import { useForm } from 'react-hook-form';
import { useUsers } from '../hooks/useFetchUser';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { InputLabel } from './InputLabel';
import { ButtonComponent } from './ButtonComponent';

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
    <div className='bg-white dark:bg-[#1e2939] p-10 shadow rounded-lg flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-extrabold text-gray-900 dark:text-white mb-3'>Iniciar sesion</h1>
      <p className='mb-8 dark:text-[#99a1af]'>¿No tienes cuenta aun? <Link className='text-[#4c9cfd]' to={'../register'}>Registrate</Link></p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-[350px] gap-5 dark:text-[#99a1af]'>
        <InputLabel
          type='text'
          id='input-email'
          placeholder='Correo electronico'
          label='Correo electronico'
          register={{ ...register('email_user') }}
        />

        <InputLabel
          type='password'
          id='input-password'
          placeholder='*********'
          label='Contraseña '
          register={{ ...register('password_user') }}
        />

        <h3 className='text-[#4c9cfd] text-end text-sm cursor-pointer'>¿Olvidaste la contraseña?</h3>
        <ButtonComponent text='Iniciar Sesion' />
      </form>
    </div>
  );
};
