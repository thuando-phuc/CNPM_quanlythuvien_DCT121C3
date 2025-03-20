import './tiepnhansachmoi.css'
function Tiepnhan({hide}){
    return (
        <form id="tiepnhan">
            <div className='title_'>Tiếp nhận sách mới</div>
            <div className='underline'></div>
            <button className='hide' onClick={hide}>
                <img src="./src/assets/close.png"/>
            </button>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Tên sách:</div>
                <input type="text" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Thể loại:</div>
                <input type="text" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Tác giả:</div>
                <input type="text" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Năm xuất bản:</div>
                <input type="text" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Nhà xuất bản:</div>
                <input type="text" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Ngày nhập:</div>
                <input type="date" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Trị giá:</div>
                <input type="text" className='inp_miniwin'/>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
                <button className="submit-button-tiepnhan" type='submit'>Tiếp nhận</button>
            </div>
        </form>
   )
}
export default Tiepnhan;