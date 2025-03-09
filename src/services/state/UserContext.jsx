import { createContext, useEffect, useState } from "react";
import { login, register } from "../api/userService";
import { useNavigate, Link } from 'react-router-dom';

export const UserContext = createContext();

export function UserProvider({ children }) {

    const navigate = useNavigate();
    const handleNavigation = (event, path) => {
        event.preventDefault();
        navigate(path);
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        id: 0,
        jwtToken: "",
        phone: "",
        role: ""
    });

    const handleLogout = () => {
        setUser({
            email: "",
            fullName: "",
            id: 0,
            jwtToken: "",
            phone: "",
            role: ""
        });
    };

    const checkUser = () =>{

        if(user.id == 0){
            navigate('/');
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    const handleLogin = async (loginRequest) => {
        setLoading(true);
        setErrors([]); 
        try {
            const data = await login(loginRequest);
            if (!data.success) {
                setErrors(["Invalid credentials, please try again"]);
                return false; 
            } else {
                setErrors([]);
                setUser(data.body);
                return {success: true, role:data.body.userRole}; 
            }
            
        } catch (err) {
            setErrors(["An error occurred during login"]);
            return false; 
        } finally {
            setLoading(false);
        }

        
    };

    const handleRegister = async (request) => {
        setLoading(true);
        setErrors([]);
        try {
            const data = await register(request);
            if (data.status === 409) {
                setErrors(["User with this email already exists, please try a different one"]);
            } else {
                setErrors([]);
                return true; 
            }
        } catch (err) {
            setErrors(["An error occurred during registration"]);
        } finally {
            setLoading(false);
        }
        return false; 
    };

    const contextValue = {
        user,
        handleLogin,
        handleLogout,
        handleRegister,
        errors,
        setErrors,
        loading
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}