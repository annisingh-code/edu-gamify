import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../firebase/authFunctions";
import { setUser, setError, setLoading } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const user = await signupUser(email, password);
      dispatch(setUser({ email: user.email, uid: user.uid }));
      navigate("/dashboard");
    } catch (error) {
      dispatch(setError(error.message));
      alert(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
