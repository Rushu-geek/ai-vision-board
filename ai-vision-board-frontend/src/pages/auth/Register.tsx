import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postAPI } from '../../services/api.service';

type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
    userRole?: string;
};


const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    // userRole: yup.string().required('User role is required')
});

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (submitData: RegisterFormValues) => {
        try {
            alert("Hi")
            const response = await postAPI('auth/register', { ...submitData, userRole: "user" }, "");

            const { data, success, error } = response.data;

            if (success) {
                alert("Success")
            } else {
                alert(error)
            }

            console.log('Response:', response.data);
        } catch (error: unknown) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name</label>
                <input type="text" {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
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
            {/* <div>
                <label>User Role</label>
                <input type="text" {...register('userRole')} />
                {errors.userRole && <p>{errors.userRole.message}</p>}
            </div> */}
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
