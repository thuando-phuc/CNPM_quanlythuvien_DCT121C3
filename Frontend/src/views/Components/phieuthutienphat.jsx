import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import './phieuthutienphat.css'; // Create this CSS file
// Reuse modal CSS:
import './lapthedocgia.css';

function Phieuthu({ hide }) {
    const [maDocGiaInput, setMaDocGiaInput] = useState('');
    const [docGiaInfo, setDocGiaInfo] = useState(null);
    const [tongNo, setTongNo] = useState(0);
    const [soTienThu, setSoTienThu] = useState('');
    const [conLai, setConLai] = useState(0);

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (docGiaInfo && tongNo !== null) {
            const thu = parseFloat(soTienThu) || 0;
            setConLai(Math.max(0, tongNo - thu));
        } else {
            setConLai(0);
        }
    }, [soTienThu, tongNo, docGiaInfo]);

    const handleSearchDocGia = async () => {
        if (!maDocGiaInput.trim()) {
            setError('Vui lòng nhập mã độc giả.');
            setDocGiaInfo(null);
            setTongNo(0);
            return;
        }
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        setDocGiaInfo(null);
        setTongNo(0);
        setSoTienThu('');

        try {
            const docGiaRes = await apiClient.get(`/docGia/${maDocGiaInput.trim()}`);
            setDocGiaInfo(docGiaRes.data);

            // Fetch current debt (sum of 'con_lai' from bills table for this reader)
            // This requires an endpoint or calculation. For now, let's assume DocGia model has tong_no_hien_tai accessor
            // Or fetch all bills and sum 'con_lai'
            const billsRes = await apiClient.get(`/bill?id_doc_gia=${maDocGiaInput.trim()}`);
            const currentDebt = billsRes.data.reduce((acc, bill) => acc + parseFloat(bill.con_lai), 0);
            setTongNo(currentDebt);
            setConLai(currentDebt); // Initially, con_lai is the total debt

        } catch (err) {
            console.error("Error fetching reader or debt info:", err);
            setError(err.response?.data?.message || 'Không tìm thấy độc giả hoặc lỗi khi tải thông tin nợ.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitFinePayment = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!docGiaInfo) {
            setError('Vui lòng tìm và chọn độc giả.');
            return;
        }
        const tienThuNum = parseFloat(soTienThu);
        if (isNaN(tienThuNum) || tienThuNum <= 0) {
            setError('Số tiền thu phải là một số dương.');
            return;
        }
        if (tienThuNum > tongNo) {
            setError('Số tiền thu không được vượt quá tổng nợ.'); // QĐ6
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                id_doc_gia: docGiaInfo.ID,
                so_tien_thu: tienThuNum,
            };
            const response = await apiClient.post('/bill/store', payload);
            setSuccessMessage('Thu tiền phạt thành công!');
            // Refresh debt info
            await handleSearchDocGia();
            setSoTienThu(''); // Reset input
        } catch (err) {
            console.error("Error submitting fine payment:", err);
            setError(err.response?.data?.message || 'Lỗi khi thực hiện thu tiền phạt.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <form id="phieuthu_modal" onSubmit={handleSubmitFinePayment}> {/* Use a specific ID */}
                <button type="button" className="hide" onClick={hide}>×</button>
                <div className='title_'>Lập Phiếu Thu Tiền Phạt</div>
                <div className='underline'></div>

                {error && <p className="error-message" style={{textAlign: 'center'}}>{error}</p>}
                {successMessage && <p className="success-message" style={{textAlign: 'center', color: 'green'}}>{successMessage}</p>}

                <div className='div_miniwin'>
                    <label className='label_lapthe'>Mã độc giả:</label>
                    <input value={maDocGiaInput} onChange={(e) => setMaDocGiaInput(e.target.value)} type="text" className='inp_miniwin'/>
                    <button className='search-button-modal' style={{marginLeft: '10px', padding: '8px 10px'}} onClick={handleSearchDocGia} type='button' disabled={isLoading}>
                        {isLoading ? 'Đang tìm...' : <img src="/src/assets/search.png" alt="Search" style={{width: '18px', height: '18px', verticalAlign: 'middle'}}/>}
                    </button>
                </div>
                {docGiaInfo && (
                    <>
                        <div className='div_miniwin'><label className='label_lapthe'>Họ tên ĐG:</label><span className='inp_miniwin' style={{border:'none', fontWeight:'bold'}}>{docGiaInfo.ho_va_ten}</span></div>
                        <div className='div_miniwin'><label className='label_lapthe'>Tổng nợ:</label><span className='inp_miniwin' style={{border:'none', fontWeight:'bold'}}>{tongNo.toLocaleString('vi-VN')} VNĐ</span></div>
                        <div className='div_miniwin'><label className='label_lapthe'>Số tiền thu:</label><input type="number" value={soTienThu} onChange={(e) => setSoTienThu(e.target.value)} className='inp_miniwin' min="0" max={tongNo} required/></div>
                        <div className='div_miniwin'><label className='label_lapthe'>Còn lại:</label><span className='inp_miniwin' style={{border:'none', fontWeight:'bold'}}>{conLai.toLocaleString('vi-VN')} VNĐ</span></div>
                    </>
                )}
                <button className="submit-button" type='submit' disabled={isSubmitting || !docGiaInfo || tongNo === 0}>
                    {isSubmitting ? 'Đang xử lý...' : 'Thu tiền'}
                </button>
            </form>
        </div>
    );
}

export default Phieuthu;