import './mainpage.css';
import Menu from "../Components/menu";
import User from "../Components/user_info";
import Book_table from "../Components/book_table";
import Lapthe from "../Components/lapthedocgia";
import Tiepnhan from "../Components/tiepnhansachmoi";
import Muonsach from "../Components/muonsach";
import Docgia from "../Components/docgia_table";
import Trasach from "../Components/trasach";
import Phieuthu from "../Components/phieuthutienphat";
import { useEffect, useState } from "react";
import Lapbaocao from "../Components/lapbaocao";

function Mainpage(){
    
    const [isOpen,setisOpen] = useState(false)
    const [currentOpen,setcurrentOpen] = useState(null)
    
    const checkWindowScale =()=> {
        if (window.devicePixelRatio === 1.25) {   
          useEffect(()=>{
            document.getElementById("root").style.zoom=0.8;
  
          })
        } 
    }
    function selection(select){
        setisOpen(true)
        setcurrentOpen(select)
    
    }
    function hide(){
        setisOpen(false)
    }
    checkWindowScale();

    return (
        <>  
            
            <Menu selection={selection}/>
            
            <div className='middle'>
                {(currentOpen==='tiepnhan' || currentOpen==='baocao' || currentOpen===null ) && <Book_table/>}
                {(currentOpen==='lapthe'|| currentOpen==='phieuthu' || currentOpen==='muonsach' || currentOpen==='trasach') && <Docgia/>}
                {isOpen && currentOpen==='lapthe' && <Lapthe hide={hide}/>}
                {isOpen && currentOpen==='tiepnhan' && <Tiepnhan hide={hide}/>}
                {isOpen && currentOpen==='muonsach' && <Muonsach hide={hide}/>}
                {isOpen && currentOpen==='trasach' && <Trasach hide={hide}/>}
                {isOpen && currentOpen==='phieuthu' && <Phieuthu hide={hide}/>}
                {isOpen && currentOpen==='baocao' && <Lapbaocao hide={hide}/>}
            </div>
            <User/>
          
        </>
    )
}
export default Mainpage;