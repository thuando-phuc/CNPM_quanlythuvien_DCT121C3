import { useNavigate } from "react-router";
import './user_info.css'; // Giả sử bạn có file CSS này

function User({ userData }) { // Nhận userData làm prop
    let navigate = useNavigate();

    function logout() {
        localStorage.removeItem('authToken'); // Xóa token khi đăng xuất
        // localStorage.removeItem('user'); // Xóa thông tin người dùng nếu có lưu
        navigate("/"); // Điều hướng về trang đăng nhập
    }

    // Định dạng ngày tháng (nếu cần)
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } catch (e) {
            return dateString;
        }
    };

    if (!userData) {
        return <div id="user-info"><center>Đang tải thông tin người dùng...</center></div>;
    }

    return (
        <div id="user-info" >
            <center>Thông tin người dùng</center><br />
            <div className='info'>
                <div className="label">Họ tên:</div>
                {/* Giả sử API trả về 'name' hoặc 'ho_ten' */}
                <span className="result">{userData.name || userData.ho_ten || 'Chưa cập nhật'}</span>
            </div>
            <div className="info">
                <div className="label">Email:</div>
                <span className="result">{userData.email || 'Chưa cập nhật'}</span>
            </div>
            {/* Các trường khác bạn có thể thêm nếu API trả về */}
            {/* Ví dụ:
            {userData.ngay_sinh && (
                <div className="info">
                    <div className="label">Ngày sinh:</div>
                    <span className="result">{formatDate(userData.ngay_sinh)}</span>
                </div>
            )}
            {userData.chuc_vu && (
                 <div className="info">
                    <div className="label">Chức vụ:</div>
                    <span className="result">{userData.chuc_vu}</span>
                </div>
            )}
            */}
            <div className="div-button">
                <button className='button'>Đổi mật khẩu</button>
                <button className='button' onClick={logout}>Đăng xuất</button>
            </div>
        </div>
    )
}
export default User;