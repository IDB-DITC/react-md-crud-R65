import React from 'react'
import { Route, createBrowserRouter, Router, RouterProvider, Routes, } from "react-router";
//import RequireAuth from 'react-auth-kit/PrivateRoute'
/*import { useAuthUser, useSignOut } from 'react-auth-kit'*/

//import { PrivateRoute } from 'react-auth-kit'
//import RequireAuth from 'react-auth-kit/AuthOutlet'
//import RequireAuth from '@auth-kit/react-router/RequireAuth';

import AuthorList from "./components/author-list";
import AuthorCreate from "./components/author-create";
import AuthorEdit from './components/author-edit';
//import PrivateRoute from 'react-auth-kit/PrivateRoute';
import ProtectedRoute from './security/protected-route';
import LoginComponent from './security/login-component';


//export const router = createBrowserRouter([
//    { path: "/", Component: AuthorList },
//    { path: "/create", Component: AuthorCreate },
//]);


export default function AppRouter() {
    return (<Routes>
        <Route path="/" element={<AuthorList />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/index" Component={AuthorList} />
            <Route path="/create" Component={AuthorCreate} />
            <Route path="/edit/:id" Component={AuthorCreate} />
        </Route>
        <Route path="/login" Component={LoginComponent} />



    </Routes>)
}

