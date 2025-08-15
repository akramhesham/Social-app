import * as z from "zod";
import { RegisterScheme } from "./register.scheme";

export const LoginScheme = z.object({
    email: z.string().nonempty('This field is required').email('Not valid mail'),
    password: z.string().nonempty("This field is required!").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Invalid password it must begin with capital letter then small letter then at least one number and one special character @')
})