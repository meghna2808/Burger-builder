import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Import Firebase auth instance
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import './Auth.css'
const Auth = ({ onAuthSuccess }) => {
    const navigate = useNavigate();

    // State for email, password, login/signup toggle, and error message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

    const handleAuth = async () => {
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            onAuthSuccess();
            navigate("/order"); // Redirect to Burger page
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleAuth}>{isLogin ? "Login" : "Sign Up"}</button>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </p>
        </div>
    );
};

export default Auth;