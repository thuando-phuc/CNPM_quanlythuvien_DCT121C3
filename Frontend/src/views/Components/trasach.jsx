import { use, useRef, useState } from 'react'
import Pagination from './pagination'
function Trasach({hide}){
    const [currentDocgia,setcurrentDocgia] = useState('')
    const [currentBooks,setcurrentBooks] = useState([])
    const [tienphatkynay,settienphatkynay] = useState(0)
    const [tongno,settongno] = useState(0)
    const valRef = useRef('')
    const dateRef = useRef('')
    //Truy vấn theo mã
    const result = [
        {
            madocgia: "DG001",
            hovaten: "Nguyễn Văn An",
            sach: [
                {
                    stt: 1,
                    masach: "MS001", 
                    tensach: "Lập trình C++",
                    theloai: "Công nghệ",
                    tacgia: "Nguyễn Văn A",
                    ngaymuon: "01/01/2024",
                    ngaytra: "12/01/2024", 
                    ngaytrathucte:"15/01/2024",
                    songaymuon: 14,
                    tienphat:2000
                },
                {
                    stt: 2,
                    masach: "MS002",
                    tensach: "Giải tích 1", 
                    theloai: "Toán học",
                    tacgia: "Trần Văn B",
                    ngaymuon: "02/01/2024",
                    ngaytra: "15/01/2024",
                    ngaytrathucte:"",
                    songaymuon: null,
                    tienphat:null
                },
            ]
        }
    ]
    const search = () =>{
        const found = result.find(item => item.madocgia === valRef.current.value)
        if(found) {
            setcurrentDocgia(found.hovaten)
            setcurrentBooks(found.sach)
        } 
        else{
            setcurrentDocgia('')
            setcurrentBooks([]) 
        }
    }
    const tinhtienphat = () => {
        if (currentDocgia===''){
            alert('Vui lòng nhập mã độc giả')
            return
        }
        if (!dateRef.current.value) {
            alert('Vui lòng chọn ngày trả')
            return
        }
    
        const ngaytra = new Date(dateRef.current.value)
        var tongno_ = 0
        var tienphatkynay_ = 0
        currentBooks.forEach((item) => {
            
      
            if (!item.songaymuon){
                //số ngày mượn
                const parts = item.ngaymuon.split('/')
                const ngaymuon = new Date(parts[2], parts[1] - 1, parts[0])
                const songaymuon = Math.floor((ngaytra - ngaymuon)/(1000*60*60*24))
                item.songaymuon = songaymuon

                //Tiền phạt
                const parts2 = item.ngaytra.split('/')
                const ngaytra_dukien = new Date(parts2[2], parts2[1] - 1, parts2[0])
                const songaytre = Math.floor((ngaytra - ngaytra_dukien)/(1000*60*60*24))
                if (songaytre > 0) {
                    item.tienphat = songaytre * 1000
                } else {
                    item.tienphat = 0
                }
                tienphatkynay_+=item.tienphat

            }
            tongno_+=item.tienphat
        })
        var books = currentBooks.map((item) => {
            return item
        })
        setcurrentBooks(books)
        settienphatkynay(tienphatkynay_)
        settongno(tongno_)
    }
    const [currentPage,setcurrentPage]=useState(1)
    const lastIndex = currentPage*7
    const firstIndex = lastIndex-7
    const new_currentBooks = currentBooks.slice(firstIndex,lastIndex)

    return (
        <form id="muonsach">
            <div className='title_'>Trả sách</div>
            <div className='underline_muonsach'></div>
            <button className='hide' onClick={hide}>
                <img src="./src/assets/close.png"/>
            </button>
            <div className='div_miniwin' style={{width:"100%"}}>
                <div className='label_lapthe' style={{width:"150px"}}>Mã độc giả:</div>
                <input ref={valRef} type="text" className='inp_miniwin'/>
                <button className='search' onClick={()=>search(result)} type='button'><img src="./src/assets/search.png"/></button>
            </div>
            <div className='div_miniwin' style={{width:"380px"}}>
                <div className='label_lapthe' style={{width:"150px"}}>Họ tên độc giả:</div>
                <span style={{marginLeft:"10px",textTransform:"uppercase",marginRight:""}}>
                    {currentDocgia}
                </span>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe' style={{width:"150px"}}>Ngày trả thực tế:</div>
                <input ref={dateRef} type="date" className='inp_miniwin'/>
                <button className='submit-button' style={{marginLeft:"30px"}} type='button' onClick={tinhtienphat}>
                    Tính tiền phạt
                </button>
            </div>
            <div className='div_miniwin' style={{width:"380px"}}>
                <div className='label_lapthe' style={{width:"150px"}}>Tiền phạt kỳ này:</div>
                {tienphatkynay}đ
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe' style={{width:"150px"}}>Tổng nợ:</div>
                {tongno}đ
            </div>
            <table className='table_muonsach' >
                <thead>
                    <tr>
                        <th style={{width:"50px"}}>STT</th>
                        <th style={{width:"110px"}}>Mã sách</th>
                        <th style={{width:"180px"}}>Ngày mượn</th>
                        <th style={{width:"180px"}}>Ngày trả dự kiến</th>
                        <th style={{width:"160px"}}>Số ngày mượn</th>
                        <th style={{width:"200px"}}>Tiền phạt</th>
                    </tr>
                </thead>
                <tbody>
                    {new_currentBooks.map((item)=>(
                        <tr>
                            <td>{item.stt}</td>
                            <td>{item.masach}</td>
                            <td>{item.ngaymuon}</td>
                            <td>{item.ngaytra}</td>
                            <td>{item.songaymuon}</td>
                            <td>{item.tienphat}</td>
                        </tr>
                    ))}
                  
                </tbody>
            </table>
            <Pagination totalRows={currentBooks.length} rowsperPage={7} setcurrentPage={setcurrentPage}/>
            <button className='submit-button' style={{marginLeft:"88%",marginTop:"10px"}}>Cập nhật</button>
            
        </form>

    )
}
export default Trasach;