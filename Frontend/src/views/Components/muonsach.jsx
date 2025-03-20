import './muonsach.css'
import './lapthedocgia.css'
import { useRef, useState } from 'react'
function Muonsach({hide}){
    const [numRow, setnumRow] = useState(0)
    const [currentDocgia,setcurrentDocgia] = useState('')
    const [currentBooks,setcurrentBooks] = useState([])
    
    //Lấy ngày hiện tại
   
    const valRef = useRef('')
    //Truy vấn được danh sách độc giả bỏ vào đây (lấy cột mã, tên và các sách đã mượn): 
    //Chỉ truy vấn tìm những cuốn sách được mượn vào N ngày gần nhất (dựa vào quy định)
    //Giả sử nếu quy định là 4 ngày và hiện tại ngày 10/3, thì chỉ tìm những cuốn sách được mượn từ ngày 7,8,9,10
    const max_numofBooks = 6
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
                    ngaytra: "15/01/2024"
                },
                {
                    stt: 2, 
                    masach: "MS002",
                    tensach: "Giải tích 1",
                    theloai: "Toán học",
                    tacgia: "Trần Văn B",
                    ngaymuon: "01/01/2024", 
                    ngaytra: "15/01/2024"
                }
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
        setnumRow(0)
    }
    function Row_table(){
        return (
            <tr>
                <td><input style={{width:"20px"}} type="text"/></td>
                <td><input style={{width:"80px"}} type="text"/></td>
                <td><input style={{width:"180px"}} type="text"/></td>
                <td><input style={{width:"100px"}} type="text"/></td>
                <td><input style={{width:"150px"}} type="text"/></td>
                <td></td>
                <td></td>
            </tr> 
        )
    }
    const increaseRow = () =>{
        if (currentDocgia===''){
            alert('Vui lòng nhập mã độc giả trước')
        }
        else{
            if (numRow<max_numofBooks && numRow+currentBooks.length<max_numofBooks){
                setnumRow(numRow+1)
            }
            else{
                alert('Chỉ mượn tối đa '+max_numofBooks+' cuốn trong 4 ngày gần nhất')
            }
        }
    }
    const decreaseRow = () =>{
        if (numRow>0){
            setnumRow(numRow-1)
        }
    }
    let ar = Array(numRow).fill(1)

   return (
        <form id="muonsach">
            <div className='title_'>Mượn sách</div>
            <div className='underline_muonsach'></div>
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
                <span style={{marginLeft:"10px",textTransform:"uppercase"}}>
                    {currentDocgia}
                </span>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe' style={{width:"150px"}}>Ngày mượn:</div>
                <input type="date" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe' style={{width:"150px"}}>Ngày trả dự kiến:</div>
                <input type="date" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div style={{marginLeft:"10px"}}><b>Số lượng sách mượn trong ? ngày gần nhất:</b></div>
                <span style={{marginLeft:"20px"}}>{currentBooks.length}</span>
            </div>
            <div className='div_miniwin'>
                <div style={{marginLeft:"10px"}}><b>Số lượng sách có thể mượn:</b></div>
                <span style={{marginLeft:"20px"}}>{5-currentBooks.length}</span>
            </div>
            <div className='tableContainer'>
            <table className='table_muonsach' >
                <thead>
                    <tr>
                        <th style={{width:"30px"}}>STT</th>
                        <th style={{width:"110px"}}>Mã sách</th>
                        <th style={{width:"210px"}}>Tên sách</th>
                        <th style={{width:"120px"}}>Thể loại</th>
                        <th style={{width:"160px"}}>Tác giả</th>
                        <th style={{width:"120px"}}>Ngày mượn</th>
                        <th style={{width:"120px"}}>Ngày trả dự kiến</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBooks.map((item)=>(
                        <>
                        <tr>
                            <td>{item.stt}</td>
                            <td>{item.masach}</td>
                            <td>{item.tensach}</td>
                            <td>{item.theloai}</td>
                            <td>{item.tacgia}</td>
                            <td>{item.ngaymuon}</td>
                            <td>{item.ngaytra}</td>
                        </tr>
                        </>
                    ))}
                    {ar.map(()=>(
                        <Row_table />
                    ))
                        
                    }
                </tbody>
            </table>
            </div>
            <div>
                <button type='button' className="delete-row" onClick={decreaseRow}>
                    -
                </button>
                <button type='button' className="add-row" onClick={increaseRow}>
                    +
                </button>
                <button className="submit-button-muonsach" type='submit'>Cho mượn</button>
            </div>
        </form>
   )
}

export default Muonsach;