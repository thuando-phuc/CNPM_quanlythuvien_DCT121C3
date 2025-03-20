function Lapthe({hide}){
   return (
        <form id="lapthe">
            <div className='title_'>Lập thẻ độc giả</div>
            <div className='underline'></div>
            <button className='hide' onClick={hide}>
                <img src="./src/assets/close.png"/>
            </button>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Họ và tên:</div>
                <input type="text" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Địa chỉ:</div>
                <input type="text" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Email:</div>
                <input type="email" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Ngày sinh:</div>
                <input type="date" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Loại độc giả:</div>
                <input type="text" className='inp_miniwin'/>
            </div>
            <div className='div_miniwin'>
                <div className='label_lapthe'>Ngày lập thẻ:</div>
                <input type="date" className='inp_miniwin'/>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}><button className="submit-button" type='submit'>Lập thẻ</button></div>
        </form>
   )
}
export default Lapthe;