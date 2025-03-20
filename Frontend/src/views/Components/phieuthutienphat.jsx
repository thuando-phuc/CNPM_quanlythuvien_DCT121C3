import './phieuthutienphat.css'
import { useRef, useState } from 'react'
function Phieuthu({hide}){
    const valRef = useRef('')
    const [currentDocgia,setcurrentDocgia] = useState('')

    //Truy vấn thông tin tiền nợ của độc giả bỏ vào đây
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
                }
            ]
        }
    ]

    const search = () =>{
        const found = result.find(item => item.madocgia === valRef.current.value)
        if(found) {
            setcurrentDocgia(found.hovaten)
        } 
        else{
            setcurrentDocgia('')
        }
    }
    return (
        <form id="phieuthu">
            <div className='title_' >Phiếu thu tiền phạt</div>
            <div className='underline'></div>
            <button className='hide' onClick={hide}>
                <img src="./src/assets/close.png"/>
            </button>
            <div className='div_miniwin'>
                <div className='label_lapthe' style={{width:"150px"}}>Mã độc giả:</div>
                <input ref={valRef} type="text" className='inp_miniwin'/>
                <button className='search' onClick={()=>search(result)} type='button'><img src="./src/assets/search.png"/></button>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe' style={{width:"150px"}}>Họ tên độc giả:</div>
                <span style={{marginLeft:"10px",textTransform:"uppercase",marginRight:"100px"}}>
                    {currentDocgia}
                </span>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe' style={{width:"150px"}}>Tổng nợ:</div>
                ?
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe' style={{width:"150px"}}>Số tiền thu:</div>
                <input type="email" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe' style={{width:"150px"}}>Còn lại:</div>
                <input type="email" className='inp_miniwin'/>
            </div>
            <button className="submit-button" style={{marginLeft:"45%"}} type='submit'>Thu tiền</button>
        </form>
   )
}
export default Phieuthu;