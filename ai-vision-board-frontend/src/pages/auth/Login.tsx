import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postAPI } from '../../services/api.service';

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (submitData: LoginFormValues) => {
    try {
      const response = await postAPI('auth/login', submitData, "");
      const { data, success, error, msg } = response.data;

      if (success) {
        alert(msg);
        // Handle successful login (e.g., store token, redirect, etc.)
      } else {
        alert(error);
      }

      console.log('Response:', response.data);
    } catch (error: unknown) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
