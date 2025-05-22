import './muonsach.css'
// Import CSS chung cho modal nếu bạn muốn dùng chung, ví dụ:
// import './lapthedocgia.css' 
import { useState, useEffect } from 'react'
import apiClient from '../../api/apiClient';

// Giả sử bạn có một quy định về số ngày mượn tối đa và số sách tối đa
const MAX_BORROW_DAYS = 7; // Ví dụ: 7 ngày
const MAX_BOOKS_PER_BORROW = 5; // Ví dụ: tối đa 5 cuốn mỗi lần mượn (tính cả sách đang mượn)

function Muonsach({hide, onBorrowSuccess}){ // Thêm onBorrowSuccess để làm mới danh sách sách nếu cần
    const [maDocGiaInput, setMaDocGiaInput] = useState('');
    const [docGiaInfo, setDocGiaInfo] = useState(null); // { ID, ho_va_ten, ... }
    const [sachDaMuon, setSachDaMuon] = useState([]); // Sách độc giả đang mượn
    const [ngayMuon, setNgayMuon] = useState(new Date().toISOString().slice(0, 10));
    const [ngayTraDuKien, setNgayTraDuKien] = useState('');

    const [sachChoMuon, setSachChoMuon] = useState([]); // [{ ma_sach_input: '', sach_info: null, error: '' }]

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingReader, setIsLoadingReader] = useState(false);

    useEffect(() => {
        if (ngayMuon) {
            const borrowDate = new Date(ngayMuon);
            borrowDate.setDate(borrowDate.getDate() + MAX_BORROW_DAYS);
            setNgayTraDuKien(borrowDate.toISOString().slice(0, 10));
        } else {
            setNgayTraDuKien('');
        }
    }, [ngayMuon]);

    const handleSearchDocGia = async () => {
        if (!maDocGiaInput.trim()) {
            setError('Vui lòng nhập mã độc giả.');
            setDocGiaInfo(null);
            setSachDaMuon([]);
            setSachChoMuon([]);
            return;
        }
        setIsLoadingReader(true);
        setError('');
        setSuccessMessage('');
        setDocGiaInfo(null);
        setSachDaMuon([]);
        setSachChoMuon([]); // Reset sách cho mượn khi tìm độc giả mới
        try {
            const responseDocGia = await apiClient.get(`/docGia/${maDocGiaInput.trim()}`);
            setDocGiaInfo(responseDocGia.data);

            const responseSachMuon = await apiClient.get(`/borrow/search?id_doc_gia=${maDocGiaInput.trim()}`);
            setSachDaMuon(responseSachMuon.data);

        } catch (err) {
            console.error("Error searching reader or their borrowed books:", err);
            setError(err.response?.data?.message || 'Không tìm thấy độc giả hoặc có lỗi xảy ra.');
            setDocGiaInfo(null);
        } finally {
            setIsLoadingReader(false);
        }
    };

    const soSachCoTheMuonThem = docGiaInfo ? MAX_BOOKS_PER_BORROW - (sachDaMuon?.length || 0) : 0;

    const handleAddSachChoMuonRow = () => {
        if (!docGiaInfo) {
            alert('Vui lòng tìm thông tin độc giả trước.');
            return;
        }
        if (sachChoMuon.length < soSachCoTheMuonThem) {
            setSachChoMuon([...sachChoMuon, { ma_sach_input: '', sach_info: null, error: '' }]);
        } else {
            alert(`Độc giả chỉ được mượn tối đa ${MAX_BOOKS_PER_BORROW} cuốn (đã bao gồm sách đang mượn). Không thể thêm sách mới.`);
        }
    };

    const handleRemoveSachChoMuonRow = (index) => {
        const newRows = [...sachChoMuon];
        newRows.splice(index, 1);
        setSachChoMuon(newRows);
    };

    const handleMaSachInputChange = (index, value) => {
        const newRows = [...sachChoMuon];
        newRows[index].ma_sach_input = value;
        newRows[index].sach_info = null; 
        newRows[index].error = '';
        setSachChoMuon(newRows);
    };

    const handleFetchSachInfo = async (index) => {
        const maSach = sachChoMuon[index].ma_sach_input.trim();
        if (!maSach) {
            const newRows = [...sachChoMuon];
            newRows[index].sach_info = null;
            newRows[index].error = '';
            setSachChoMuon(newRows);
            return;
        };

        const newRows = [...sachChoMuon];
        newRows[index].error = ''; // Clear previous error
        try {
            const response = await apiClient.get(`/book/${maSach}`);
            if (response.data) {
                if (response.data.so_luong > 0) {
                    // Check if this book (by ID) is already in the sachChoMuon list (excluding current row)
                    // or in sachDaMuon list
                    const isAlreadySelected = sachChoMuon.some((row, i) => i !== index && row.sach_info?.ID === response.data.ID);
                    const isAlreadyBorrowed = sachDaMuon.some(borrowedBook => borrowedBook.sach?.ID === response.data.ID);

                    if (isAlreadySelected) {
                        newRows[index].sach_info = null;
                        newRows[index].error = 'Sách này đã được chọn.';
                    } else if (isAlreadyBorrowed) {
                        newRows[index].sach_info = null;
                        newRows[index].error = 'Độc giả đang mượn sách này.';
                    }
                    else {
                        newRows[index].sach_info = response.data;
                        newRows[index].error = '';
                    }
                } else {
                    newRows[index].sach_info = null;
                    newRows[index].error = 'Hết sách';
                }
            } else {
                 newRows[index].sach_info = null;
                 newRows[index].error = 'Không tìm thấy sách';
            }
        } catch (err) {
            newRows[index].sach_info = null;
            newRows[index].error = 'Không tìm thấy sách hoặc lỗi API.';
        }
        setSachChoMuon(newRows);
    };

    const handleSubmitMuonSach = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!docGiaInfo) {
            setError('Vui lòng tìm và chọn độc giả.');
            return;
        }
        if (!ngayMuon) {
            setError('Vui lòng chọn ngày mượn.');
            return;
        }
        const maSachArray = sachChoMuon
            .filter(item => item.sach_info && item.sach_info.ID && !item.error) // Only valid, error-free books
            .map(item => item.sach_info.ID);

        if (maSachArray.length === 0) {
            setError('Vui lòng thêm ít nhất một sách hợp lệ để mượn.');
            return;
        }
        // Check again for total books limit
        if ((sachDaMuon?.length || 0) + maSachArray.length > MAX_BOOKS_PER_BORROW) {
            setError(`Vượt quá số lượng sách tối đa (${MAX_BOOKS_PER_BORROW} cuốn) được mượn.`);
            return;
        }


        setIsSubmitting(true);
        try {
            const payload = {
                id_doc_gia: docGiaInfo.ID,
                ngay_muon: ngayMuon,
                ma_sach_array: maSachArray,
            };
            const response = await apiClient.post('/borrow/store', payload);
            setSuccessMessage(`Đã cho mượn ${response.data.length} sách thành công!`);
            setSachChoMuon([]);
            await handleSearchDocGia(); // Refresh reader's borrowed books list
            if(onBorrowSuccess) {
                onBorrowSuccess(); // Call callback to refresh main book list if needed
            }
            // setTimeout(hide, 2000); // Optionally auto-close
        } catch (err) {
            console.error("Error borrowing books:", err);
            setError(err.response?.data?.message || 'Lỗi khi thực hiện mượn sách.');
        } finally {
            setIsSubmitting(false);
        }
    };


   return (
        <div className="modal-overlay">
            <form id="muonsach_modal" onSubmit={handleSubmitMuonSach}> {/* Changed to form and ID */}
                <button type="button" className="hide_modal" onClick={hide}>×</button> {/* Use consistent class */}
                <div className='title_modal'>Cho Mượn Sách</div> {/* Use consistent class */}
                <div className='underline_modal'></div> {/* Use consistent class */}

                {error && <p className="error-message-modal">{error}</p>}
                {successMessage && <p className="success-message-modal">{successMessage}</p>}

                <div className='div_input_group_modal'>
                    <label className='label_modal'>Mã độc giả:</label>
                    <input value={maDocGiaInput} onChange={(e) => setMaDocGiaInput(e.target.value)} type="text" className='input_modal'/>
                    <button className='search-button-modal' onClick={handleSearchDocGia} type='button' disabled={isLoadingReader}>
                        {isLoadingReader ? 'Đang tìm...' : <img src="/src/assets/search.png" alt="Search"/>}
                    </button>
                </div>
                {docGiaInfo && (
                    <div className='div_input_group_modal'>
                        <label className='label_modal'>Họ tên ĐG:</label>
                        <span style={{fontWeight: "bold"}}>
                            {docGiaInfo.ho_va_ten} (Loại: {docGiaInfo.loai_doc_gia})
                        </span>
                    </div>
                )}
                <div className='div_input_group_modal'>
                    <label className='label_modal'>Ngày mượn:</label>
                    <input type="date" value={ngayMuon} onChange={(e) => setNgayMuon(e.target.value)} className='input_modal'/>
                </div>
                <div className='div_input_group_modal'>
                    <label className='label_modal'>Ngày trả (DK):</label>
                    <input type="date" value={ngayTraDuKien} className='input_modal' readOnly/>
                </div>

                {docGiaInfo && (
                    <>
                        <div className='div_input_group_modal'>
                            <label className='label_modal'>Sách đang mượn:</label>
                            <span>{sachDaMuon?.length || 0}</span>
                        </div>
                        <div className='div_input_group_modal'>
                            <label className='label_modal'>Có thể mượn thêm:</label>
                            <span>{soSachCoTheMuonThem > 0 ? soSachCoTheMuonThem : 0}</span>
                        </div>
                    </>
                )}

                {sachDaMuon && sachDaMuon.length > 0 && (
                    <div className='tableContainer_modal'>
                        <h4>Sách Đang Mượn</h4>
                        <table className='table_muonsach_modal' >
                            <thead>
                                <tr>
                                    <th>Mã sách</th>
                                    <th>Tên sách</th>
                                    <th>Ngày mượn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sachDaMuon.map((item) =>(
                                    <tr key={item.LoanID || `borrowed-${item.ma_sach}`}>
                                        <td>{item.sach?.ID || item.ma_sach}</td>
                                        <td>{item.sach?.ten_sach}</td>
                                        <td>{new Date(item.ngay_muon).toLocaleDateString('vi-VN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {docGiaInfo && (
                    <div className='tableContainer_modal'>
                        <h4>Sách Mượn Mới</h4>
                        <table className='table_muonsach_modal' >
                            <thead>
                                <tr>
                                    <th style={{width:"35px"}}>STT</th>
                                    <th style={{width:"100px"}}>Mã sách</th>
                                    <th style={{width:"200px"}}>Tên sách</th>
                                    <th style={{width:"110px"}}>Thể loại</th>
                                    <th style={{width:"150px"}}>Tác giả</th>
                                    <th style={{width:"50px"}}>SL</th>
                                    <th style={{width:"70px"}}>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sachChoMuon.map((row, index)=>(
                                    <tr key={`new-${index}`}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <input
                                                className='input_modal_table' // Add a class for table inputs
                                                type="text"
                                                value={row.ma_sach_input}
                                                onChange={(e) => handleMaSachInputChange(index, e.target.value)}
                                                onBlur={() => handleFetchSachInfo(index)}
                                            />
                                        </td>
                                        <td>{row.sach_info?.ten_sach || ''}</td>
                                        <td>{row.sach_info?.the_loai || ''}</td>
                                        <td>{row.sach_info?.tac_gia || ''}</td>
                                        <td style={{textAlign: 'center'}}>{row.sach_info?.so_luong}</td>
                                        <td style={{textAlign: 'center'}}>
                                            <button type='button' className="delete-row-button-modal" onClick={() => handleRemoveSachChoMuonRow(index)}>X</button>
                                        </td>
                                        {row.error && <tr style={{backgroundColor: 'transparent'}}><td colSpan="7" style={{color: 'red', fontSize: '0.8em', textAlign:'center', border: 'none', padding: '2px'}}>{row.error}</td></tr>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {docGiaInfo && soSachCoTheMuonThem > 0 && sachChoMuon.length < soSachCoTheMuonThem && (
                            <button type='button' className="add-row-button-modal" onClick={handleAddSachChoMuonRow}>
                                + Thêm sách
                            </button>
                        )}
                    </div>
                )}

                <button className="submit_button_modal" type='submit' disabled={isSubmitting || !docGiaInfo || sachChoMuon.filter(s => s.sach_info && !s.error).length === 0}>
                    {isSubmitting ? 'Đang xử lý...' : 'Cho mượn'}
                </button>
            </form>
        </div>
   )
}

export default Muonsach;
