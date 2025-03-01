import { createContext,useState } from "react";
import { login } from "../api/userService";


export const UserContext = createContext();

export function UserProvider({children}){


    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(
        {
            email:"",
            fullName:"",
            id: 0,
            jwtToken:"",
            phone: "",
            role: ""
        }
    );

    const handleLogout = () => {


        setUser({
            email:"",
            fullName:"",
            id: 0,
            jwtToken:"",
            phone: "",
            role: ""
        });
    }

    
    const handleLogin = async (loginRequest) => {

        try{

            let data = await login(loginRequest);

            setUser(data.body);



        }catch(err){
            alert(err);
            setLoading(false);
        }

    }


    const contextValue = {
        user,
        handleLogin,
        handleLogout
    }

    return(

        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}