import './menu.css'
function Menu({selection}){
    
    return (
        
       
            <div className="menu">
                
                <button className='selection_1' onClick={() => selection('homeView')}>
                    Trang chủ (DS Sách)
                </button>
                <button className='selection' onClick={() => selection('docgiaView')}>
                    Danh sách thẻ độc giả
                </button>
                <button className='selection' onClick={() => selection('muonsach')}>
                    Cho mượn sách
                </button>
                <button className='selection' onClick={() => selection('trasach')}>
                    Nhận trả sách
                </button>
                <button className='selection' onClick={() => selection('phieuthu')}>
                    Lập phiếu thu tiền phạt
                </button>
                <button className='selection' onClick={() => selection('baocao')}>
                    Lập báo cáo
                </button>
                <button className='selection_last' onClick={() => selection('quydinh')}>
                    Thay đổi qui định
                </button>
            </div>
      
    )
}
export default Menu;