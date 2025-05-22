import React, { useState } from 'react';
import apiClient from '../../api/apiClient';
import './tiepnhansachmoi.css'; // CSS riêng cho form này

function Tiepnhan({ hide, onBookAdded }) {
    const [tenSach, setTenSach] = useState('');
    const [theLoai, setTheLoai] = useState('');
    const [tacGia, setTacGia] = useState('');
    const [namXuatBan, setNamXuatBan] = useState('');
    const [nhaXuatBan, setNhaXuatBan] = useState('');
    const [ngayNhap, setNgayNhap] = useState(new Date().toISOString().slice(0, 10)); // Default to today
    const [gia, setGia] = useState('');
    const [soLuong, setSoLuong] = useState('');

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsSubmitting(true);

        if (!tenSach || !theLoai || !tacGia || !soLuong) {
            setError('Tên sách, thể loại, tác giả và số lượng là bắt buộc.');
            setIsSubmitting(false);
            return;
        }
        if (parseInt(soLuong) < 1) {
            setError('Số lượng phải ít nhất là 1.');
            setIsSubmitting(false);
            return;
        }
        if (namXuatBan && (namXuatBan.length !== 4 || isNaN(parseInt(namXuatBan)))) {
            setError('Năm xuất bản phải là số có 4 chữ số.');
            setIsSubmitting(false);
            return;
        }

        const bookData = {
            ten_sach: tenSach,
            the_loai: theLoai,
            tac_gia: tacGia,
            nam_xuat_ban: namXuatBan || null,
            nha_xuat_ban: nhaXuatBan || null,
            ngay_nhap: ngayNhap || null,
            gia: gia || null,
            so_luong: parseInt(soLuong),
        };

        try {
            const response = await apiClient.post('/book/store', bookData);
            setSuccessMessage('Tiếp nhận sách mới thành công!');
            console.log('Book added:', response.data);
            // Reset form
            setTenSach('');
            setTheLoai('');
            setTacGia('');
            setNamXuatBan('');
            setNhaXuatBan('');
            setNgayNhap(new Date().toISOString().slice(0, 10));
            setGia('');
            setSoLuong('');

            if (onBookAdded) {
                onBookAdded(); // Callback để làm mới danh sách sách và đóng modal
            }
        } catch (err) {
            if (err.response && err.response.data) {
                if (err.response.data.errors) {
                    const messages = Object.values(err.response.data.errors).flat();
                    setError(messages.join(' '));
                } else if (err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('Lỗi khi tiếp nhận sách. Vui lòng thử lại.');
                }
            } else {
                setError('Lỗi kết nối hoặc lỗi không xác định.');
            }
            console.error("Failed to add book:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div id="tiepnhan_sach_modal"> {/* ID riêng cho modal này */}
                <button type="button" className="hide_modal" onClick={hide}>×</button>
                <div className="title_modal">
                    Tiếp Nhận Sách Mới
                    <div className="underline_modal"></div>
                </div>

                {error && <p className="error-message-modal">{error}</p>}
                {successMessage && <p className="success-message-modal">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="div_input_group_modal"><label className="label_modal">Tên sách:</label><input className="input_modal" type="text" value={tenSach} onChange={(e) => setTenSach(e.target.value)} required /></div>
                    <div className="div_input_group_modal"><label className="label_modal">Thể loại:</label><input className="input_modal" type="text" value={theLoai} onChange={(e) => setTheLoai(e.target.value)} required /></div>
                    <div className="div_input_group_modal"><label className="label_modal">Tác giả:</label><input className="input_modal" type="text" value={tacGia} onChange={(e) => setTacGia(e.target.value)} required /></div>
                    <div className="div_input_group_modal"><label className="label_modal">Số lượng:</label><input className="input_modal" type="number" value={soLuong} onChange={(e) => setSoLuong(e.target.value)} required min="1" /></div>
                    <div className="div_input_group_modal"><label className="label_modal">Năm XB:</label><input className="input_modal" type="number" value={namXuatBan} onChange={(e) => setNamXuatBan(e.target.value)} placeholder="YYYY" /></div>
                    <div className="div_input_group_modal"><label className="label_modal">Nhà XB:</label><input className="input_modal" type="text" value={nhaXuatBan} onChange={(e) => setNhaXuatBan(e.target.value)} /></div>
                    <div className="div_input_group_modal"><label className="label_modal">Ngày nhập:</label><input className="input_modal" type="date" value={ngayNhap} onChange={(e) => setNgayNhap(e.target.value)} /></div>
                    <div className="div_input_group_modal"><label className="label_modal">Giá (VNĐ):</label><input className="input_modal" type="number" value={gia} onChange={(e) => setGia(e.target.value)} step="1000" min="0" /></div>
                    
                    <button className="submit_button_modal" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang lưu...' : 'Lưu sách'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Tiepnhan;