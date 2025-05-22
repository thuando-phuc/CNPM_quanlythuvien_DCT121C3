import './docgia_table.css' // Import file CSS mới
import { useState, useEffect } from 'react' // Thêm useEffect
import Pagination from './pagination'
import apiClient from '../../api/apiClient'; // Import apiClient

function Docgia({ onOpenLapTheModal, refreshKey }){ // Add refreshKey prop
    const [readers, setReaders] = useState([]); // State để lưu danh sách độc giả
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage,setcurrentPage]=useState(1)
    const lastIndex = currentPage*12
    const firstIndex = lastIndex-12
    const currentReaders = readers.slice(firstIndex,lastIndex) // Sử dụng readers đã fetch

    useEffect(() => {
        const fetchReaders = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiClient.get('/docGia'); // API endpoint của bạn
                setReaders(response.data);
            } catch (err) {
                console.error("Error fetching readers:", err);
                setError("Không thể tải danh sách độc giả.");
                // Xử lý lỗi xác thực nếu cần, tương tự như trong mainpage.jsx
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    // Có thể bạn muốn điều hướng về trang login ở đây nếu lỗi là 401
                    // navigate('/login'); // Cần import useNavigate từ react-router-dom nếu dùng
                    localStorage.removeItem('authToken'); // Hoặc chỉ xóa token
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchReaders();
    }, [refreshKey]); // Add refreshKey to dependency array

    // Helper function to format date (YYYY-MM-DD or similar to DD/MM/YYYY)
    // Bạn có thể di chuyển hàm này ra một file utils nếu dùng ở nhiều nơi
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } catch (e) {
            return dateString; // Return original if parsing fails
        }
    };

    if (isLoading) {
        return <p style={{ textAlign: 'center', marginTop: '20px' }}>Đang tải danh sách độc giả...</p>;
    }

    if (error) {
        return <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>;
    }

    return (
        <>
            {/* Container để căn chỉnh nút sang phải */}
            <div className="add-reader-button-container">
                <button onClick={onOpenLapTheModal} className="add-reader-button">
                    + Thêm độc giả
                </button>
            </div>


            <div id="table_container">
                <div className='number-page'>
                    <span style={{fontWeight:"bold"}}>-Trang {currentPage}-</span>
                </div>
                <table className="book_table">
                    <thead>
                        <tr>
                             <th style={{width:"50px"}}>Mã ĐG</th> {/* Giảm chiều rộng và rút gọn tiêu đề nếu cần */}
                            <th style={{width:"150px"}}>Họ và tên</th>
                            <th style={{width:"250px"}}>Địa chỉ</th>
                            <th style={{width:"180px"}}>Email</th>
                            <th style={{width:"50px"}}>Ngày sinh</th>
                            <th style={{width:"50px"}}>Loại ĐG</th> {/* Rút gọn tiêu đề */}
                            <th style={{width:"50px"}}>Ngày lập thẻ</th>
        
                        </tr>
                    </thead>
                    <tbody>
                        {currentReaders.length > 0 ? (
                            currentReaders.map((item) => (
                            <tr key={item.ID}> {/* Sử dụng item.ID (hoặc khóa chính của bạn) làm key */}
                                <td>{item.ID}</td> {/* Giả sử ID là mã độc giả */}
                                <td>{item.ho_va_ten}</td>
                                <td>{item.dia_chi}</td>
                                <td>{item.email}</td>
                                <td>{formatDate(item.ngay_sinh)}</td>
                                <td>{item.loai_doc_gia}</td> {/* Cần đảm bảo backend trả về tên loại thay vì chỉ mã nếu cần */}
                                <td>{formatDate(item.ngay_lap_the)}</td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>Không có độc giả nào để hiển thị.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination totalRows={readers.length} rowsperPage={12} setcurrentPage={setcurrentPage}/>
            </div>
            
            
        </>
    )
}
export default Docgia;