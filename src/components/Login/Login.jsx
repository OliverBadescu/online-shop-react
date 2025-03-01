import { useContext, useState } from "react";
import { UserContext } from "../../services/state/UserContext";
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd'; 

export default function Login() {
    const navigate = useNavigate();
    const { handleLogin } = useContext(UserContext);
    const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null); 


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginRequest({ ...loginRequest, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await handleLogin(loginRequest);
            navigate('/home');
        } catch (err) {
            setErrorMessage(err.message || "Login failed"); 

        }
    };

    return (
        <>
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
                        {errorMessage && (
                            <Alert
                                message="Error"
                                description={errorMessage}
                                type="error"
                                showIcon
                                closable
                                onClose={() => setErrorMessage(null)} 
                            />
                        )}
                        <button className="login-button" onClick={handleSubmit}>
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}