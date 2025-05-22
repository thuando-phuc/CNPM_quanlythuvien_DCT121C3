import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import './trasach.css'; // Create this CSS file
// You can reuse modal CSS from other components if the style is similar
// import './lapthedocgia.css';

function Trasach({ hide, onReturnSuccess }) {
    const [maDocGiaInput, setMaDocGiaInput] = useState('');
    const [docGiaInfo, setDocGiaInfo] = useState(null);
    const [sachDangMuon, setSachDangMuon] = useState([]); // Books currently borrowed by the reader
    const [selectedBooksToReturn, setSelectedBooksToReturn] = useState({}); // { LoanID: true/false }
    const [ngayTra, setNgayTra] = useState(new Date().toISOString().slice(0, 10));

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchDocGia = async () => {
        if (!maDocGiaInput.trim()) {
            setError('Vui lòng nhập mã độc giả.');
            setDocGiaInfo(null);
            setSachDangMuon([]);
            setSelectedBooksToReturn({});
            return;
        }
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        setDocGiaInfo(null);
        setSachDangMuon([]);
        setSelectedBooksToReturn({});

        try {
            const docGiaRes = await apiClient.get(`/docGia/${maDocGiaInput.trim()}`);
            setDocGiaInfo(docGiaRes.data);

            // Fetch books currently borrowed by this reader that haven't been returned yet
            // The backend /borrow/search should ideally filter out already returned books
            // or you add a specific endpoint for "books_to_return_for_reader/{id_doc_gia}"
            const muonSachRes = await apiClient.get(`/borrow/search?id_doc_gia=${maDocGiaInput.trim()}`);
            // Filter out books that might have a 'ngay_tra_thuc_te' if your MuonSach model tracks it
            setSachDangMuon(muonSachRes.data.filter(item => !item.ngay_tra_thuc_te));

        } catch (err) {
            console.error("Error fetching reader or borrowed books:", err);
            setError(err.response?.data?.message || 'Không tìm thấy độc giả hoặc lỗi khi tải sách đang mượn.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookSelectionChange = (loanId) => {
        setSelectedBooksToReturn(prev => ({
            ...prev,
            [loanId]: !prev[loanId]
        }));
    };

    const handleSubmitReturn = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        const booksToReturnLoanIDs = Object.keys(selectedBooksToReturn).filter(loanId => selectedBooksToReturn[loanId]);

        if (booksToReturnLoanIDs.length === 0) {
            setError('Vui lòng chọn ít nhất một sách để trả.');
            return;
        }
        if (!ngayTra) {
            setError('Vui lòng chọn ngày trả.');
            return;
        }

        setIsSubmitting(true);
        let successCount = 0;
        let errors = [];

        for (const loanId of booksToReturnLoanIDs) {
            try {
                await apiClient.post('/return/store', {
                    LoanID: loanId,
                    ngay_tra: ngayTra,
                });
                successCount++;
            } catch (err) {
                console.error(`Error returning book with LoanID ${loanId}:`, err);
                errors.push(err.response?.data?.message || `Lỗi khi trả sách (LoanID: ${loanId})`);
            }
        }

        setIsSubmitting(false);
        if (successCount > 0) {
            setSuccessMessage(`Đã trả thành công ${successCount} sách.`);
            await handleSearchDocGia(); // Refresh the list of borrowed books
            if (onReturnSuccess) {
                onReturnSuccess(); // Callback to refresh main book list (for quantity)
            }
        }
        if (errors.length > 0) {
            setError(errors.join('\n'));
        }
        if (successCount > 0 && errors.length === 0) {
            // Optionally close modal after a delay if all successful
            // setTimeout(hide, 2000);
        }
    };

    return (
        <div className="modal-overlay">
            <form id="trasach_modal" onSubmit={handleSubmitReturn}>
                <button type="button" className="hide_modal" onClick={hide}>×</button>
                <div className='title_modal'>Nhận Trả Sách</div>
                <div className='underline_modal'></div>

                {error && <p className="error-message-modal" style={{whiteSpace: 'pre-line'}}>{error}</p>}
                {successMessage && <p className="success-message-modal">{successMessage}</p>}

                <div className='div_input_group_modal'>
                    <label className='label_modal'>Mã độc giả:</label>
                    <input value={maDocGiaInput} onChange={(e) => setMaDocGiaInput(e.target.value)} type="text" className='input_modal'/>
                    <button className='search-button-modal' onClick={handleSearchDocGia} type='button' disabled={isLoading}>
                        {isLoading ? 'Đang tìm...' : <img src="/src/assets/search.png" alt="Search"/>}
                    </button>
                </div>

                {docGiaInfo && (
                    <div className='div_input_group_modal'>
                        <label className='label_modal'>Họ tên ĐG:</label>
                        <span style={{fontWeight: "bold"}}>{docGiaInfo.ho_va_ten}</span>
                    </div>
                )}

                <div className='div_input_group_modal'>
                    <label className='label_modal'>Ngày trả:</label>
                    <input type="date" value={ngayTra} onChange={(e) => setNgayTra(e.target.value)} className='input_modal' required/>
                </div>

                {sachDangMuon.length > 0 && (
                    <div className='tableContainer_modal'>
                        <h4>Sách Đang Mượn Cần Trả</h4>
                        <table className='table_trasach_modal'>
                            <thead>
                                <tr>
                                    <th>Chọn</th>
                                    <th>Mã sách</th>
                                    <th>Tên sách</th>
                                    <th>Ngày mượn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sachDangMuon.map(item => (
                                    <tr key={item.LoanID}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={!!selectedBooksToReturn[item.LoanID]}
                                                onChange={() => handleBookSelectionChange(item.LoanID)}
                                            />
                                        </td>
                                        <td>{item.sach?.ID || item.ma_sach}</td>
                                        <td>{item.sach?.ten_sach}</td>
                                        <td>{new Date(item.ngay_muon).toLocaleDateString('vi-VN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {docGiaInfo && sachDangMuon.length === 0 && !isLoading && <p>Độc giả này không có sách nào đang mượn.</p>}

                <button className="submit_button_modal" type='submit' disabled={isSubmitting || Object.values(selectedBooksToReturn).every(v => !v)}>
                    {isSubmitting ? 'Đang xử lý...' : 'Nhận trả sách'}
                </button>
            </form>
        </div>
    );
}

export default Trasach;