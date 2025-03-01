import { useContext, useState, useEffect } from "react"; 
import { UserContext } from "../../services/state/UserContext";
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from 'antd';

export default function Register() {
    const [request, setRequest] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        country: "",
        billingAddress: "",
        shippingAddress: ""
    });

    const navigate = useNavigate();
    const { handleRegister, errors, setErrors } = useContext(UserContext); 
    const [registered, setRegistered] = useState(false);
    const [fields, setFields] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequest({ ...request, [name]: value });
    };

    const handleSubmit = async () => {
        if (!request.fullName || !request.email || !request.password || !request.phone || !request.country || !request.billingAddress || !request.shippingAddress) {
            setFields(true);
            return;
        }

        const success = await handleRegister(request);
        if (success) {
            setRegistered(true);
            setTimeout(() => navigate('/login'), 2000); 
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
            {registered && (
                <Alert
                    className="alert-container-login"
                    message="Success"
                    description={"Registered successfully, login to continue"}
                    type="success"
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

            <div className="register-page">
                <div>
                <div className="register-container">
                    <h1>Register</h1>
                    <div className="email-input">
                        <p>Email:</p>
                        <input
                            onChange={handleInputChange}
                            type="email"
                            name="email"
                            id="email-register"
                            placeholder="Your email here"
                        />
                    </div>
                    <div className="password-input">
                        <p>Password:</p>
                        <input
                            onChange={handleInputChange}
                            type="password"
                            name="password"
                            id="password-register"
                            placeholder="Your password here"
                        />
                    </div>
                    <div className="name-input">
                        <p>Full name:</p>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="fullName"
                            id="name-register"
                            placeholder="Your full name here"
                        />
                    </div>
                    <div className="phone-input">
                        <p>Phone:</p>
                        <input
                            onChange={handleInputChange}
                            type="number"
                            name="phone"
                            id="phone-register"
                            placeholder="Your phone number here"
                        />
                    </div>
                    <div className="country-input">
                        <p>Country:</p>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="country"
                            id="country-register"
                            placeholder="Your country here"
                        />
                    </div>
                    <div className="billing-input">
                        <p>Billing address:</p>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="billingAddress"
                            id="billing-register"
                            placeholder="Your billing address here"
                        />
                    </div>
                    <div className="shipping-input">
                        <p>Shipping address:</p>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="shippingAddress"
                            id="shipping-register"
                            placeholder="Your shipping address here"
                        />
                    </div>
                    <p>
                        Already have an account?
                        <Link to={"/login"} className="login-link">
                            Log in here
                        </Link>
                    </p>
                    <button className="register-button" onClick={handleSubmit}>Register</button>
                </div>
                </div>
            </div>
        </>
    );
}