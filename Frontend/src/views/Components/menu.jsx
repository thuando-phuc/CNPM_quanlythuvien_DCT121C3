import './menu.css'
function Menu({selection}){
    
    return (
        
       
            <div className="menu">
                
                <button className='selection_1' onClick={() => selection('lapthe')}>
                    Lập thẻ độc giả
                </button>
                <button className='selection' onClick={() => selection('tiepnhan')}>
                    Tiếp nhận sách mới
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