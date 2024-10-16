import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostApi } from "hooks";
import { Eye, EyeOff, Loader } from "lucide-react";
import "./LoginPage.scss";
import logoImage from "../assets/logo.png";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

interface ValidationErrors {
  username?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const navigate = useNavigate();

  const { postData, loading, error } = usePostApi<LoginResponse>("login");

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await postData({ username, password });
        if (response && response.token) {
          localStorage.setItem("token", response.token);
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Login failed:", err);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logoImage} alt="FINN PLAY" className="logo" />
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <fieldset>
              <legend>
                <label htmlFor="username">Login</label>
              </legend>
              <input
                type="text"
                id="username"
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                  if (errors.username)
                    setErrors({ ...errors, username: undefined });
                }}
                placeholder="player"
                className={errors.username ? "error" : ""}
              />
            </fieldset>
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
          </div>
          <div className="input-group">
            <fieldset>
              <legend>
                <label htmlFor="password">Password</label>
              </legend>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors({ ...errors, password: undefined });
                  }}
                  className={errors.password ? "error" : ""}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="eye-icon" />
                  ) : (
                    <Eye className="eye-icon" />
                  )}
                </button>
              </div>
            </fieldset>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <Loader /> : "Login"}
          </button>
          {error && <p className="error-message">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
