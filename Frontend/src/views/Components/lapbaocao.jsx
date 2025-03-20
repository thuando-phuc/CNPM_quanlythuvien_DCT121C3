import './lapbaocao.css'
import { useState } from "react";
import Pagination from './pagination';
function Lapbaocao({hide}){
    const [baocao,setbaocao] = useState('bc1')

    return (
        <div id="baocao">
            <div className='title_'>Báo cáo</div>
            <div className='underline_baocao'></div>
            <button className='hide' onClick={hide}>
                <img src="./src/assets/close.png"/>
            </button>
            <div className='div_miniwin' style={{width:"100%"}}>
                <button className='baocao-button' onClick={() => setbaocao('bc1')}>Báo cáo 1</button>
                <button className='baocao-button' onClick={() => setbaocao('bc2')}>Báo cáo 2</button>
            </div>
            {baocao==='bc1' && <Bc1 />}
            {baocao==='bc2' && <Bc2 />}
            
        </div>
    )
}
function Bc1(){
    const result_bc1=[
        {
            stt: 1,
            tentheloai: "Văn Học",
            soluotmuon: 25,
            tile: "20%"
        },
        {
            stt: 2,
            tentheloai: "Tiểu Thuyết", 
            soluotmuon: 30,
            tile: "24%"
        }
    ]
    const [currentPage,setcurrentPage]=useState(1)
    const lastIndex = currentPage*9
    const firstIndex = lastIndex-9
    const new_result = result_bc1.slice(firstIndex,lastIndex)

    return (
        <>
            <div style={{textAlign:"center"}}>
            <span style={{fontWeight:"bold",fontSize:"21px"}}>Báo Cáo Thông Kê Tình Hình Mượn Sách Theo Thể Loại</span>
            <br />
            <span>Tháng :</span>
            </div>
            <table className='table_muonsach' style={{marginTop:"10px",width:"800px"}}>
                <thead>
                    <tr>
                        <th style={{width:"50px"}}>STT</th>
                        <th style={{width:"180px"}}>Tên thể loại</th>
                        <th style={{width:"180px"}}>Số lượt mượn</th>
                        <th style={{width:"180px"}}>Tỉ lệ</th>      
                    </tr>
                </thead>
                <tbody>
                    {new_result.map((item)=>(
                        <tr>
                            <td>{item.stt}</td>
                            <td>{item.tentheloai}</td>
                            <td>{item.soluotmuon}</td>
                            <td>{item.tile}</td>
                        </tr>
        
                    ))}
                </tbody>
            </table>
            <Pagination totalRows={result_bc1.length} rowsperPage={9} setcurrentPage={setcurrentPage}/>
            <div style={{marginTop:"",marginLeft:"60%"}}>Tổng số lượt mượn : </div>

        </>
    )
}
function Bc2(){
    const result_bc2=[
        {
            stt: 1,
            tensach: "Lập trình C++",
            ngaymuon: "01/01/2024", 
            songaytre: 3
        },
        {
            stt: 2,
            tensach: "Giải tích 1",
            ngaymuon: "02/01/2024",
            songaytre: 5
        },
        {
            stt: 3, 
            tensach: "Đắc Nhân Tâm",
            ngaymuon: "05/01/2024",
            songaytre: 2
        }
    ]
    const [currentPage,setcurrentPage]=useState(1)
    const lastIndex = currentPage*8
    const firstIndex = lastIndex-8
    const new_result = result_bc2.slice(firstIndex,lastIndex)
    return (
        <>
            <div style={{textAlign:"center"}}>
            <span style={{fontWeight:"bold",fontSize:"21px"}}>Báo Cáo Thống Kê Sách Trả Trễ</span>
            <br />
            <span>Ngày :</span>
            </div>
            <table className='table_muonsach' style={{marginTop:"10px",width:"800px"}}>
                <thead>
                    <tr>
                        <th style={{width:"50px"}}>STT</th>
                        <th style={{width:"180px"}}>Tên sách</th>
                        <th style={{width:"180px"}}>Ngày mượn</th>
                        <th style={{width:"180px"}}>Số ngày trả trễ</th>      
                    </tr>
                </thead>
                <tbody>
                    {new_result.map((item)=>(
                            <tr>
                                <td>{item.stt}</td>
                                <td>{item.tensach}</td>
                                <td>{item.ngaymuon}</td>
                                <td>{item.songaytre}</td>
                            </tr>
            
                        ))}
                </tbody>
            </table>
            <Pagination totalRows={result_bc2.length} rowsperPage={8} setcurrentPage={setcurrentPage}/>
        </>
    )
}
export default Lapbaocao;
