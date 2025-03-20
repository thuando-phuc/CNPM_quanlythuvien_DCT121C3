import './docgia_table.css'
import { useState } from 'react'
import Pagination from './pagination'
function Docgia(){
    //Truy vấn danh sách độc giả dán vào result
    const result = [
        {
            madocgia: "DG001",
            hovaten: "Nguyễn Văn An", 
            diachi: "123 Lê Lợi, Q.1, TP.HCM",
            email: "nguyenvanan@gmail.com", 
            ngaysinh: "15/03/1995",
            loaidocgia: "Sinh viên",
            ngaylapthe: "01/01/2023"
        },
        {
            madocgia: "DG002", 
            hovaten: "Trần Thị Bình",
            diachi: "456 Nguyễn Huệ, Q.3, TP.HCM",
            email: "tranthibinh@gmail.com",
            ngaysinh: "22/08/1998",
            loaidocgia: "Sinh viên", 
            ngaylapthe: "15/02/2023"
        },
        {
            madocgia: "DG003",
            hovaten: "Lê Hoàng Nam",
            diachi: "789 Võ Văn Tần, Q.10, TP.HCM", 
            email: "lehoangnam@gmail.com",
            ngaysinh: "10/12/1990",
            loaidocgia: "Giảng viên",
            ngaylapthe: "01/03/2023"
        },
        {
            madocgia: "DG004",
            hovaten: "Phạm Minh Tuấn",
            diachi: "147 Cách Mạng T8, Q.3, TP.HCM",
            email: "phamminhtuan@gmail.com",
            ngaysinh: "05/06/1992",
            loaidocgia: "Sinh viên",
            ngaylapthe: "20/03/2023"
        },
        {
            madocgia: "DG005",
            hovaten: "Hoàng Thị Mai",
            diachi: "258 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM",
            email: "hoangthimai@gmail.com",
            ngaysinh: "18/11/1994",
            loaidocgia: "Sinh viên",
            ngaylapthe: "05/04/2023"
        },
        {
            madocgia: "DG006",
            hovaten: "Vũ Đức Minh",
            diachi: "369 Nguyễn Đình Chiểu, Q.3, TP.HCM",
            email: "vuducminh@gmail.com",
            ngaysinh: "30/09/1989",
            loaidocgia: "Giảng viên",
            ngaylapthe: "15/04/2023"
        },
        {
            madocgia: "DG007",
            hovaten: "Đặng Thu Hà",
            diachi: "741 Trần Hưng Đạo, Q.5, TP.HCM",
            email: "dangthuha@gmail.com",
            ngaysinh: "25/04/1996",
            loaidocgia: "Sinh viên",
            ngaylapthe: "01/05/2023"
        },
        {
            madocgia: "DG008",
            hovaten: "Ngô Văn Hùng",
            diachi: "852 Lý Thường Kiệt, Q.10, TP.HCM",
            email: "ngovanhung@gmail.com",
            ngaysinh: "12/07/1993",
            loaidocgia: "Sinh viên",
            ngaylapthe: "10/05/2023"
        },
        {
            madocgia: "DG009",
            hovaten: "Bùi Thị Lan",
            diachi: "963 Nguyễn Thị Minh Khai, Q.1, TP.HCM",
            email: "buithilan@gmail.com",
            ngaysinh: "08/02/1997",
            loaidocgia: "Sinh viên",
            ngaylapthe: "20/05/2023"
        },
        {
            madocgia: "DG010",
            hovaten: "Trương Minh Đức",
            diachi: "159 Hai Bà Trưng, Q.1, TP.HCM",
            email: "truongminhduc@gmail.com",
            ngaysinh: "14/10/1991",
            loaidocgia: "Giảng viên",
            ngaylapthe: "01/06/2023"
        },
        {
            madocgia: "DG011",
            hovaten: "Lý Thanh Hương",
            diachi: "357 Lê Hồng Phong, Q.5, TP.HCM",
            email: "lythanhhuong@gmail.com",
            ngaysinh: "20/01/1999",
            loaidocgia: "Sinh viên",
            ngaylapthe: "15/06/2023"
        },
        {
            madocgia: "DG012",
            hovaten: "Đinh Công Thành",
            diachi: "951 Nguyễn Trãi, Q.5, TP.HCM",
            email: "dinhcongthanh@gmail.com",
            ngaysinh: "03/08/1995",
            loaidocgia: "Sinh viên",
            ngaylapthe: "01/07/2023"
        },
        {
            madocgia: "DG013",
            hovaten: "Nguyễn Thị Hồng",
            diachi: "123 Lý Thái Tổ, Q.10, TP.HCM", 
            email: "nguyenthihong@gmail.com",
            ngaysinh: "15/05/1997",
            loaidocgia: "Sinh viên",
            ngaylapthe: "15/07/2023"
        },
    ]
    const [currentPage,setcurrentPage]=useState(1)
    const lastIndex = currentPage*12
    const firstIndex = lastIndex-12
    const new_result = result.slice(firstIndex,lastIndex)

    return (
        <>
           
            <div id="table_container">
                <div className='number-page'>
                    <span style={{fontWeight:"bold"}}>-Trang {currentPage}-</span>
                </div>
                <table className="book_table">
                    <thead>
                        <tr>
                            <th style={{width:"120px"}}>Mã độc giả</th>
                            <th style={{width:"190px"}}>Họ và tên</th>
                            <th style={{width:"350px"}}>Địa chỉ</th>
                            <th style={{width:"200px"}}>Email</th>
                            <th style={{width:"100px"}}>Ngày sinh</th>
                            <th style={{width:"150px"}}>Loại độc giả</th>
                            <th style={{width:"110px"}}>Ngày lập thẻ</th>
        
                        </tr>
                    </thead>
                    <tbody>
                        {new_result.map((item) => (
                            <>
                            <tr>
                                <td>{item.madocgia}</td>
                                <td>{item.hovaten}</td>
                                <td>{item.diachi}</td>
                                <td>{item.email}</td>
                                <td>{item.ngaysinh}</td>
                                <td>{item.loaidocgia}</td>
                                <td>{item.ngaylapthe}</td>
                            </tr>
                            </>
                        ))}
                    
                    </tbody>
                </table>
                <Pagination totalRows={result.length} rowsperPage={12} setcurrentPage={setcurrentPage}/>
            </div>
            
            
        </>
    )
}
export default Docgia;