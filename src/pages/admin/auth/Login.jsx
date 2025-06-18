import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../components/login-form";
import { authRepository } from "../../../repositories/authRepository";

const Login = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [text, setText] = useState("");
    const [isError, setIsError] = useState(false);

    const handleLogin = async (data) => {
        const response = await authRepository.login(data);
        setAlert(true);
        if (response?.access_token) {
            localStorage.setItem("access_token", response?.access_token);
            setText("Login successful!");
            setIsError(false);
            navigate("/dashboard")
        } else {
            setText(response?.error || "Login failed");
            setIsError(true);
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                {alert && (
                    <div
                        className={`mb-4 p-3 rounded-md text-sm ${
                            isError
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                        }`}
                    >
                        {text}
                    </div>
                )}

                <LoginForm onSubmit={handleLogin} />
            </div>
        </div>
    );
};

export default Login;
