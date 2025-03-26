import { useNavigate } from "react-router";
import './Login.css';

function Login() {
   let navigate = useNavigate();

   function handle(event) {
      event.preventDefault();
      navigate('/main');
   }

   return (
      <div className="login_container">
         <form className="login_form" onSubmit={handle}>
            <h1 className="title">Q/L THƯ VIỆN</h1>
            <h2 className="login_label">Đăng nhập</h2>
            <div className="id_inp">
               <img className="user_img" src="src/assets/user.png" alt="User Icon" width={25} height={25} />
               <input 
                  className="inp" 
                  type="text" 
                  placeholder="Tài khoản" 
                  aria-label="Tài khoản" 
                  required 
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