import { useNavigate } from "react-router";
import './Login.css'
function Login(){
   let navigate = useNavigate()
   function handle(){
      navigate('/main');
   }
   
   return (
      <div className="login_container">
         <p className="title">THƯ VIỆN</p>
         <form className="login_form" onSubmit={handle}>
            <p className="login_label">Đăng nhập</p>
            <div className="id_inp">
               <img className="user_img" src="src/assets/user.png" width={25} height={25}/>
               <input className="inp" type="text" placeholder="Tài khoản"/>
            </div>
            <div className="pass_inp">
               <img className="pass_img" src="src/assets/pass.png" width={25} height={25}/>
               <input className="inp" type="password" placeholder="Mật khẩu" />
            </div>
            <div>
               <button className="login_button" type="submit">Đăng nhập</button>
            </div>
         </form>
      </div>
   )
}
export default Login;