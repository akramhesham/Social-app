import * as z from "zod";

export const RegisterScheme = z.object({
    name: z.string().nonempty("This field is required!").min(2, 'Required min 2 characters').max(10, 'Required max 10characters'),
    email: z.string().nonempty("This field is required!").email('Not valid mail'),
    password: z.string().nonempty("This field is required!").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Invalid password it must begin with capital letter then small letter then at least one number and one special character @'),
    rePassword: z.string().nonempty("This field is required!"),
    dateOfBirth: z.coerce.string(),
    gender: z.enum(['male', 'female'], 'Invalid entry choose male or female')
}).refine((data) => data.password === data.rePassword, {
    path: ['rePassword'],
    message: 'Password and rePassword arenot the same'
})