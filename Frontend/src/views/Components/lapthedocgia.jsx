import React, { useState } from 'react';
import apiClient from '../../api/apiClient'; // Your configured Axios instance
import './lapthedocgia.css'; // Your CSS for the modal

function Lapthe({ hide, onReaderAdded }) { // 'hide' and onReaderAdded props
    const [hoVaTen, setHoVaTen] = useState('');
    const [loaiDocGia, setLoaiDocGia] = useState(''); // Consider a select dropdown for this
    const [ngaySinh, setNgaySinh] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [email, setEmail] = useState('');
    const [ngayLapThe, setNgayLapThe] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsSubmitting(true);

        // Basic validation (you can add more)
        if (!hoVaTen || !loaiDocGia) {
            setError('Họ tên và Loại độc giả là bắt buộc.');
            setIsSubmitting(false);
            return;
        }

        const readerData = {
            ho_va_ten: hoVaTen,
            loai_doc_gia: loaiDocGia, // Ensure this matches what backend expects (e.g., 'A', 'B')
            ngay_sinh: ngaySinh || null, // Send null if empty
            dia_chi: diaChi || null,
            email: email || null,
            ngay_lap_the: ngayLapThe || new Date().toISOString().slice(0, 10), // Default to today if empty
        };

        try {
            const response = await apiClient.post('/docGia/store', readerData);
            setSuccessMessage('Thêm độc giả thành công!');
            console.log('Reader added:', response.data);
            // Optionally reset form fields
            setHoVaTen('');
            setLoaiDocGia('');
            setNgaySinh('');
            setDiaChi('');
            setEmail('');
            setNgayLapThe('');
            if (onReaderAdded) {
                onReaderAdded(); // Call the callback to refresh reader list and close modal
            }
        } catch (err) {
            if (err.response && err.response.data) {
                if (err.response.data.errors) {
                    // Handle Laravel validation errors
                    const messages = Object.values(err.response.data.errors).flat();
                    setError(messages.join(' '));
                } else if (err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('Lỗi khi thêm độc giả. Vui lòng thử lại.');
                }
            } else {
                setError('Lỗi kết nối hoặc lỗi không xác định.');
            }
            console.error("Failed to add reader:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay"> {/* This div is for the backdrop */}
            <div id="lapthe"> {/* This is the main modal container, styled by #lapthe in CSS */}
                <button type="button" className="hide" onClick={hide}>×</button> {/* Close button */}
                
                <div className="title_"> {/* Title container */}
                    Lập Thẻ Độc Giả Mới
                    <div className="underline"></div> {/* Underline for the title */}
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="div_miniwin">
                        <label htmlFor="hoVaTen" className="label_lapthe">Họ và tên:</label>
                        <input className="inp_miniwin" type="text" id="hoVaTen" value={hoVaTen} onChange={(e) => setHoVaTen(e.target.value)} required />
                    </div>
                    <div className="div_miniwin">
                        <label htmlFor="loaiDocGia" className="label_lapthe">Loại độc giả:</label>
                        {/* It's better to use a select for predefined types */}
                        {/* Backend validation expects max:1 char, e.g., 'A', 'B' */}
                        <select className="select_miniwin inp_miniwin" id="loaiDocGia" value={loaiDocGia} onChange={(e) => setLoaiDocGia(e.target.value)} required>
                            <option value="">Chọn loại</option>
                            <option value="X">X</option>
                            <option value="Y">Y</option>
                            {/* Add other types if necessary, ensuring value is a single char */}
                        </select>
                    </div>
                    <div className="div_miniwin">
                        <label htmlFor="ngaySinh" className="label_lapthe">Ngày sinh:</label>
                        <input className="inp_miniwin" type="date" id="ngaySinh" value={ngaySinh} onChange={(e) => setNgaySinh(e.target.value)} />
                    </div>
                    <div className="div_miniwin">
                        <label htmlFor="diaChi" className="label_lapthe">Địa chỉ:</label>
                        <input className="inp_miniwin" type="text" id="diaChi" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} />
                    </div>
                    <div className="div_miniwin">
                        <label htmlFor="email" className="label_lapthe">Email:</label>
                        <input className="inp_miniwin" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="div_miniwin">
                        <label htmlFor="ngayLapThe" className="label_lapthe">Ngày lập thẻ:</label>
                        <input className="inp_miniwin" type="date" id="ngayLapThe" value={ngayLapThe} onChange={(e) => setNgayLapThe(e.target.value)} />
                    </div>
                    {/* Removed modal-actions div, submit button will be styled by .submit-button and centered by its own margin */}
                    <button className="submit-button" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Đang lưu...' : 'Lưu độc giả'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Lapthe;
