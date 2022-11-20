import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import "./login.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);
  // console.log(error);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      //   dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      //   console.log(res);
      alert("You have successfully Registered");
      navigate("/login");
    } catch (err) {
      console.log(err);
      //   dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  //   console.log(user);

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Register
        </button>
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default Register;
