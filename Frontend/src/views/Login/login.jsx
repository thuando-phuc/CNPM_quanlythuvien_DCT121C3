import { useNavigate } from "react-router";
import './Login.css';
import { useState } from "react";

function Login() {
   let navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   function handle(event) {
      event.preventDefault();
      if (username === "admin" && password === "1") {
         setError("");
         navigate('/main');
      } else {
         setError("Sai tài khoản hoặc mật khẩu!");
      }
   }

   return (
      <div className="login_container">
         <form className="login_form" onSubmit={handle}>
            <h1 className="title">Q/L THƯ VIỆN</h1>
            <h2 className="login_label">Đăng nhập</h2>
            {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
            <div className="id_inp">
               <img className="user_img" src="src/assets/user.png" alt="User Icon" width={25} height={25} />
               <input 
                  className="inp" 
                  type="text" 
                  placeholder="Tài khoản" 
                  aria-label="Tài khoản" 
                  required 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
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