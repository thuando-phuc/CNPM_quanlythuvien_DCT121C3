import { useState } from 'react';
import './book_table.css'
import Pagination from './pagination';
function Book_table(){

    const result = [
        {
            stt: 1,
            masach: "MS001",
            tensach: "Đắc Nhân Tâm",
            theloai: "Tâm Lý",
            tacgia: "Dale Carnegie",
            tinhtrang: "Còn"
        },
        {
            stt: 2,
            masach: "MS002", 
            tensach: "Nhà Giả Kim",
            theloai: "Tiểu Thuyết",
            tacgia: "Paulo Coelho",
            tinhtrang: "Còn"
        },
        {
            stt: 3,
            masach: "MS003",
            tensach: "Cây Cam Ngọt Của Tôi",
            theloai: "Tiểu Thuyết",
            tacgia: "José Mauro",
            tinhtrang: "Đã Mượn"
        },
        {
            stt: 4,
            masach: "MS004",
            tensach: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
            theloai: "Văn Học",
            tacgia: "Nguyễn Nhật Ánh",
            tinhtrang: "Còn"
        },
        {
            stt: 5,
            masach: "MS005",
            tensach: "Số Đỏ",
            theloai: "Văn Học",
            tacgia: "Vũ Trọng Phụng",
            tinhtrang: "Còn"
        },
        {
            stt: 6,
            masach: "MS006",
            tensach: "Chí Phèo",
            theloai: "Văn Học",
            tacgia: "Nam Cao",
            tinhtrang: "Đã Mượn"
        }
        
    ]
    const [currentPage,setcurrentPage]=useState(1)
    const lastIndex = currentPage*11
    const firstIndex = lastIndex-11
    const new_result = result.slice(firstIndex,lastIndex)
    return (
        <>
            
            <div id="table_container">
                <div className='searchbar'>
                    <span className="material-symbols-outlined" style={{cursor:"pointer"}}>search</span>
                    <input className='search-input' type="search" placeholder='Nhập tên sách'/>
                </div>
                <div className='number-page'>
                    <span style={{fontWeight:"bold"}}>-Trang {currentPage}-</span>
                </div>
                <table className="book_table">
                    <thead>
                        <tr>
                            <th style={{width:"100px"}}>STT</th>
                            <th style={{width:"150px"}}>Mã sách</th>
                            <th style={{width:"300px"}}>Tên sách</th>
                            <th style={{width:"200px"}}>Thể loại</th>
                            <th style={{width:"150px"}}>Tác giả</th>
                            <th style={{width:"150px"}}>Tình trạng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {new_result.map((item) => (
                            <tr>
                                <td>{item.stt}</td>
                                <td>{item.masach}</td>
                                <td>{item.tensach}</td>
                                <td>{item.theloai}</td>
                                <td>{item.tacgia}</td>
                                <td>{item.tinhtrang}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
            <Pagination totalRows={result.length} rowsperPage={12} setcurrentPage={setcurrentPage}/>
        </>
    )
}
export default Book_table;