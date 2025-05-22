import React from 'react';
import './BookTable.css'; // Bạn có thể tạo file CSS riêng để style cho bảng này

function Book_table({ books, onBookSelect, isLoading, error }) {
  if (isLoading) {
    return <p>Đang tải danh sách sách...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!books || books.length === 0) {
    return <p>Không có sách nào để hiển thị.</p>;
  }

  return (
    <div className="book-table-container" style={{ marginTop: '20px', padding: '20px' }}>
      <h2>Danh Mục Sách</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Sách</th>
            <th>Tên Sách</th>
            <th>Thể Loại</th>
            <th>Tác Giả</th>
            <th>Tình Trạng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.ID}>
              <td>{index + 1}</td>
              <td>{book.ID}</td>
              <td>{book.ten_sach}</td>
              <td>{book.the_loai}</td>
              <td>{book.tac_gia}</td>
              <td>{book.tinh_trang}</td> {/* 'tinh_trang' từ accessor của Laravel Model */}
              <td>
                <button onClick={() => onBookSelect(book.ID)}>
                  Xem Chi Tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Book_table;