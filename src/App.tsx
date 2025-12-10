import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router";
//import AuthProvider from 'react-auth-kit/AuthProvider';
//import authStore from 'react-auth-kit/store';
//import { AuthProvider } from 'react-auth-kit';

import AppHeader from './app-header';

import AppRouter from './app-router';
import { AuthStateProvider } from './security/authProvider';
import NavMenu from './nav-menu';
//import AuthProvider from './security/authProvider';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



//const store = AuthProvider({
//    authStorageName: 'jwt',
// authStorageType: 'localstorage',
//  cookieDomain: window.location.hostname,
//    cookieSecure: window.location.protocol === 'https:',
//    authTimeStorageName: 'auth_time',
//    stateStorageName: 'auth_state',
//});






export default function AppLayout() {
    return (

        /* <AuthProvider authName={"_auth"} authType={"cookie"}        >*/
        //<AuthProvider
        //    //            store={store}
        //    authTimeStorageName="auth_time"
        //    stateStorageName="auth_state"
        //    authStorageType="localstorage" authStorageName="jwt"
        //    cookieSecure={window.location.protocol === "https:"}
        //    cookieDomain={window.location.hostname}
        //>
        //    <LayoutComponent ></LayoutComponent>
        //</AuthProvider>
        //<LayoutComponent />

        <AuthStateProvider>
            <LayoutComponent />

        </AuthStateProvider>
    );
}

//export default AppLaypout;

function LayoutComponent() {
    return <BrowserRouter>





        {/*<AppHeader css="">*/}
        {/*</AppHeader>*/}
        <MainPage>
            
        </MainPage>


    </BrowserRouter>
}

function MainPage(...props: any) {
    return (
        <>
            <div className="page">
                <SideBar />

                <main>
                    <Topbar/>

                    <article className="content p-4">
                       <AppRouter />
                    </article>
                </main>
            </div>
            <Footer>
                <div id="blazor-error-ui">
                    An unhandled error has occurred.
                    <a href="/" className="reload">Reload</a>
                    <span className="dismiss">🗙</span>
                </div>
            </Footer>
            <ToastContainer position="bottom-right"></ToastContainer>
        </>
    )
}
function Topbar() {
    return (<div className="top-row px-4 container-fluid bg-dark">
        <AppHeader/>
    </div>)
}
function SideBar() {
    return (<div className="sidebar">
        <NavMenu />
    </div>)
}
function Footer(...props: any) {
    return (<>  {props.children}</>)
}