import * as Yup from "yup";

export default class Login {
  userName: string='';
  //userEmail!: string;
  password: string = '';
}

export const LoginSchema = Yup.object<Login>().shape({
    userName: Yup.string().required().email().min(3).max(50).label("User Name"),
    password: Yup.string().required().min(6).max(100).label("Password"),
})