import { useContext, useState, useEffect } from "react"; 
import { UserContext } from "../../services/state/UserContext";
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from 'antd';

export default function Login() {
    const navigate = useNavigate();
    const { handleLogin, errors, setErrors } = useContext(UserContext); 
    const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });
    const [fields, setFields] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginRequest({ ...loginRequest, [name]: value });
    };

    const handleSubmit = async () => {

        if (!loginRequest.email || !loginRequest.password) {
            setFields(true);
            return;
        }
        const success = await handleLogin(loginRequest); 
        
        
        if (success) {
            navigate('/home');
        }
    };

   
    useEffect(() => {
        return () => {
            setErrors([]); 
        };
    }, [setErrors]); 

    return (
        <>
            {errors.length > 0 && (
                <Alert 
                    className="alert-container-login"
                    message="Error"
                    description={errors.join(", ")}
                    type="error"
                    showIcon
                    closable
                />
            )}  
            {fields && (
                <Alert 
                    className="alert-container-login"
                    message="Error"
                    description={"Please fill in all fields"}
                    type="error"
                    showIcon
                    closable
                />
            )}  
            <div className="login-page">
                <div>
                    <div className="login-container">
                        <h1>Log in</h1>
                        <input
                            type="email"
                            name="email"
                            value={loginRequest.email}
                            onChange={handleInputChange}
                            placeholder="Your email"
                        />
                        <input
                            type="password"
                            name="password"
                            value={loginRequest.password}
                            onChange={handleInputChange}
                            placeholder="Your password"
                        />

                        <p>Don't have an account? <Link to={"/register"} className="register-link">Register here</Link></p>
                        <button className="login-button" onClick={handleSubmit}>
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}