
import { useState } from "react"

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { jwtDecode } from 'jwt-decode';
import Login, { LoginSchema } from "./login";
import { Link, useNavigate, redirect, useSearchParams } from "react-router";
import { LoginApi } from "../services/auth-api";
import useAuth from "./authProvider";



export default function LoginComponent() {

    const [model, setModel] = useState<Login>(new Login());
    //const history = useHistory();
    const { SignIn, SignOut, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    //const isAuthenticated = useIsAuthenticated();

    //const signIn = useSignIn();

    //const { token } = useAuth();

    async function FormSubmit(formData: Login, helpers: FormikHelpers<Login>) {


        try {
            var res = await LoginApi(formData);
            //setToken(res.data.token);
            //setUsername(claims.sub);

            //AuthProcess(res.data);
            //localStorage.setItem('token', res.data.token);

            var claims = jwtDecode(res.data.token);
            const expireAt = new Date(claims.exp ?? 120 * 1000);
            console.log(claims);
            SignIn(res.data.token, res.data.name);

            // setToken(res.data.token);
            // setUsername(claims.sub);

            //if (signIn({
            //    token: res.data.token,
            //    tokenType: 'Bearer',    // Token type set as Bearer
            //    authState: { name: claims.sub, uid: claims.iat },
            //    expiresIn: claims.iat ?? 120, // Token Expriration time, in minutes
            //    //expireAt: expireAt  // Expiration date
            //})) {
            //    navigate('/')
            //}
            //else {
            //    // Else, there must be some error. So, throw an error
            //    alert("Error Occoured. Try Again")
            //}
            var redirectUrl = searchParams.get("redirect");
            if (redirectUrl != null && redirectUrl !== '')
                navigate(redirectUrl);
            else
                navigate('/')

            //history.push('/');
        }
        catch (err: any) {
            helpers.setErrors(err);
        }
    }

    if (isAuthenticated) {
        // If authenticated user, then redirect to secure dashboard
        redirect('/');
    }


    return (
        <Formik
            enableReinitialize
            initialValues={model}
            validateOnChange={true}
            //isInitialValid={false}
            //initialTouched={true}
            validationSchema={LoginSchema}
            onSubmit={FormSubmit}
        >{(props) => (
            <Form>
                <div>
                    <label>User Name :</label>
                    <Field name="userName" />
                    <ErrorMessage name="userName" component="div"></ErrorMessage>
                </div>
                <div>
                    <label>Password :</label>
                    <Field name="password" type="password" />
                    <ErrorMessage name="password" component="div"></ErrorMessage>

                </div>
                <hr />
                <div>
                    <button type="submit" disabled={props.isSubmitting || !props.isValid}>Login</button>
                    <button type="reset">Cancel</button>
                    <Link to="/register">New?</Link>
                </div>



            </Form>
        )}


        </Formik>

    );

}