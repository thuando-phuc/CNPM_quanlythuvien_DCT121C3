import { useNavigate } from "react-router";
import './Login.css';
import { useState } from "react";
import axios from 'axios'; // Import axios

function Login() {
   let navigate = useNavigate();
   const [email, setEmail] = useState(""); // Changed from username to email
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   async function handleLogin(event) { // Renamed and made async
      event.preventDefault();
      setError(""); // Clear previous errors

      try {
         const response = await axios.post('http://127.0.0.1:8000/api/user/login', {
            email: email,
            password: password,
         });

         // Assuming the backend returns a token and user data on successful login
         // You might want to store the token (e.g., in localStorage) for future authenticated requests
         if (response.data && response.data.token) {
            localStorage.setItem('authToken', response.data.token); // Example: store token
            // You can also store user info if needed: localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log("Login successful:", response.data);
            navigate('/main');
         } else {
            // Handle cases where token might be missing in a successful response (should not happen with your backend)
            setError("Đăng nhập thành công nhưng không nhận được token.");
         }
      } catch (err) {
         if (err.response && err.response.data) {
            // Assuming backend sends error messages in err.response.data.message or err.response.data.errors
            const backendError = err.response.data.errors?.email?.[0] || err.response.data.message || "Sai tài khoản hoặc mật khẩu!";
            setError(backendError);
         } else {
            setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
         }
         console.error("Login failed:", err);
      }
   }

   return (
      <div className="login_container">
         <form className="login_form" onSubmit={handleLogin}>
            <h1 className="title">Q/L THƯ VIỆN</h1>
            <h2 className="login_label">Đăng nhập</h2>
            {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
            <div className="id_inp">
               <img className="user_img" src="src/assets/user.png" alt="User Icon" width={25} height={25} />
               <input
                  className="inp"
                  type="email" // Changed type to email for better validation and keyboard on mobile
                  placeholder="Email" // Changed placeholder
                  aria-label="Email" // Changed aria-label
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </div>
            <div className="pass_inp">
               <img className="pass_img" src="src/assets/pass.png" alt="Password Icon" width={25} height={25} />
               <input 
                  className="inp" 
                  type="password" 
                  placeholder="Mật khẩu"
                  aria-label="Mật khẩu"
                  required 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />
            </div>
            <div>
               <button className="login_button" type="submit">Đăng nhập</button>
            </div>
         </form>
      </div>
   );
}

export default Login;