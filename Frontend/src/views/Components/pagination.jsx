import './pagination.css'
function Pagination({totalRows,rowsperPage,setcurrentPage}){
    let pages = []
    let totalPages=Math.ceil(totalRows/rowsperPage)
    for (let i=1; i<= totalPages;++i){
        pages = [...pages,i]
    }
    return (
        <div className="pages">
            {totalPages>1 && pages.map((page) =>(
                <button type='button' className='page_button' onClick={()=>setcurrentPage(page)}>{page}</button>
            ))}
        </div>
    )
}
export default Pagination;