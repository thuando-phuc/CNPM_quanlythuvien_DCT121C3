import { useNavigate } from "react-router";

function User(){
    let navigate = useNavigate()
    function logout(){
        navigate("/");      
    }
    return(
        <div id="user-info">
                <center>Thông tin</center><br></br>
                <div className='info'>
                    <div className="label">Họ tên:</div>
                    <span className="result">NGUYỄN VĂN A</span>
                </div>
                <div className="info">
                    <div className="label">Ngày sinh:</div>
                    <span className="result">01/01/1998</span>
                </div>
                <div className="info">
                    <div className="label">Giới tính:</div>
                    <span className="result">Nam</span>
                    </div>
                <div className="info">
                    <div className="label">Chức vụ:</div>
                    <span className="result">Nhân viên quản lí</span>
                </div>
                <div className="div-button">
                    <button className='button'>Đổi mật khẩu</button>
                    <button className='button' onClick={logout}>Đăng xuất</button>
                </div>
        </div>
    )
}
export default User;