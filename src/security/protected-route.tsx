import { Navigate, Outlet, useLocation, useSearchParams } from "react-router";
import useAuth from "./authProvider";


export default function ProtectedRoute() {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const { isAuthenticated } = useAuth();


    if (!isAuthenticated) {
        //alert(location.pathname);
        searchParams.set("redirect", location.pathname);
        return <Navigate to={`/login?${searchParams.toString()}`} />;
    }

    return <Outlet />;
};

