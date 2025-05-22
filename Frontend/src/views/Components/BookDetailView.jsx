import React from 'react';
import './BookDetailView.css'; // Tạo file CSS này để style nếu cần

function BookDetailView({ book, hide }) {
  if (!book) {
    return null;
  }

  // Helper function to format date (YYYY-MM-DD or similar to DD/MM/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (e) {
      return dateString; // Return original if parsing fails
    }
  };

  // Helper function to format currency
  const formatCurrency = (number) => {
    if (number === null || number === undefined) return 'N/A';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
  };

  return (
    <div className="book-detail-modal-overlay" onClick={hide}>
      <div className="book-detail-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={hide}>X</button>
        <h2>BM2: Thông Tin Sách</h2>
        <div className="book-detail-info">
          <p><strong>Tên sách:</strong> {book.ten_sach || 'N/A'}</p>
          <p><strong>Thể loại:</strong> {book.the_loai || 'N/A'}</p>
          <p><strong>Tác giả:</strong> {book.tac_gia || 'N/A'}</p>
          <p><strong>Năm xuất bản:</strong> {book.nam_xuat_ban || 'N/A'}</p>
          <p><strong>Nhà xuất bản:</strong> {book.nha_xuat_ban || 'N/A'}</p>
          <p><strong>Ngày nhập:</strong> {formatDate(book.ngay_nhap)}</p>
          <p><strong>Trị giá:</strong> {formatCurrency(book.gia)}</p>
          {/* Giả sử có trường tinh_trang, nếu không có thì xóa dòng dưới */}
          <p><strong>Tình trạng:</strong> {book.tinh_trang || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetailView;
