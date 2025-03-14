# Dự án Quản lý Dự án Công Nghệ Phần Mềm

## Mô tả

Dự án này được phát triển như một phần của môn học Công Nghệ Phần Mềm dưới sự hướng dẫn của thầy Đỗ Như Tài. Mục tiêu của dự án là xây dựng một hệ thống quản lý dự án hiệu quả, hỗ trợ các nhóm làm việc cộng tác và theo dõi tiến độ dự án.

## Thành viên

* Cường
* Kiên
* Thuận

## Công nghệ sử dụng

* **Frontend**: ReactJS
* **Backend**: Laravel

## Chức năng chính

* Quản lý dự án: Tạo, chỉnh sửa, xóa dự án.
* Quản lý công việc: Tạo, phân công, theo dõi tiến độ công việc.
* Quản lý thành viên: Thêm, xóa, phân quyền thành viên.
* Báo cáo: Tạo báo cáo tiến độ dự án.
* ....

## Hướng dẫn cài đặt

1.  **Cài đặt môi trường:**
    * Cài đặt Node.js và npm (nếu chưa có).
    * Cài đặt Composer (nếu chưa có).
    * Cài đặt Xampp, hoặc các ứng dụng quản lý database, môi trường php khác nếu cần.
2.  **Cài đặt Backend (Laravel):**

    * Clone repository về máy.
    * Chạy `composer install` để cài đặt các dependency.
    * Tạo file `.env` từ file `.env.example` và cấu hình database.
    * Chạy `php artisan key:generate` để tạo key ứng dụng.
    * Chạy `php artisan migrate` để tạo bảng database.
    * Chạy `php artisan serve` để khởi động server backend.
3.  **Cài đặt Frontend (ReactJS):**

    * Di chuyển vào thư mục `frontend`.
    * Chạy `npm install` để cài đặt các dependency.
    * Chạy `npm start` để khởi động ứng dụng frontend.

## Hướng dẫn sử dụng

* Truy cập vào địa chỉ `http://localhost:3000` trên trình duyệt để sử dụng ứng dụng.
* Đăng nhập hoặc đăng ký tài khoản.
* Tạo dự án mới và bắt đầu quản lý công việc.

## Cấu trúc thư mục
