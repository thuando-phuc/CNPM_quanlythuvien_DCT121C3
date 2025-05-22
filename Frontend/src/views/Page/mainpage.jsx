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
import { useEffect, useState, useCallback } from "react";
import Lapbaocao from "../Components/lapbaocao";
import apiClient from '../../api/apiClient'; // Import apiClient
import BookDetailView from '../Components/BookDetailView'; // Import BookDetailView
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Mainpage(){
    const navigate = useNavigate(); // For redirecting if auth fails
    const [isOpen,setisOpen] = useState(false)
    const [currentOpen,setcurrentOpen] = useState(null)
    const [userData, setUserData] = useState(null);
    const [selectedBookForDetail, setSelectedBookForDetail] = useState(null);
    const [books, setBooks] = useState([]); // State để lưu danh sách sách
    const [isLoadingBooks, setIsLoadingBooks] = useState(true); // State cho trạng thái tải sách
    const [booksError, setBooksError] = useState(null); // State cho lỗi khi tải sách
    const [refreshReaderListKey, setRefreshReaderListKey] = useState(0); // Key to trigger reader list refresh

    // Fetch logged-in user data
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await apiClient.get('/user');
                    setUserData(response.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        localStorage.removeItem('authToken'); // Clear invalid token
                        navigate('/login'); // Redirect to login
                    }
                }
            } else {
                navigate('/login'); // No token, redirect to login
            }
        };
        fetchUserData();
    }, [navigate]);

    // Fetch books list
    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoadingBooks(true);
            setBooksError(null);
            try {
                const response = await apiClient.get('/book'); // Gọi API lấy danh sách sách
                setBooks(response.data);
            } catch (error) {
                console.error("Detailed error fetching books:", error.response || error.message || error);
                setBooksError("Không thể tải danh sách sách.");
                // Xử lý lỗi xác thực tương tự như fetchUserData nếu cần
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    console.log("Authentication error while fetching books. Redirecting to login.");
                    localStorage.removeItem('authToken');
                    navigate('/login');
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received for /api/book:", error.request);
                    setBooksError("Không nhận được phản hồi từ máy chủ khi tải sách.");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error setting up request for /api/book:", error.message);
                }
            } finally {
                setIsLoadingBooks(false);
            }
        };
        fetchBooks();
    }, [navigate]); // Thêm navigate vào dependency array

    // Handle window scaling
    useEffect(() => {
        const handleResize = () => {
            if (window.devicePixelRatio === 1.25) {
                document.getElementById("root").style.zoom = 0.8;
            } else {
                document.getElementById("root").style.zoom = 1; // Reset zoom
            }
        };
        handleResize(); // Call on mount
        window.addEventListener('resize', handleResize); // Adjust on resize
        return () => window.removeEventListener('resize', handleResize); // Cleanup
    }, []);

    function selection(select){
        setisOpen(true)
        setcurrentOpen(select)
        setSelectedBookForDetail(null); // Close book detail if other modal opens
    }
    function hide(){
        setisOpen(false)
        setcurrentOpen(null) // Reset currentOpen when any modal is hidden
        setSelectedBookForDetail(null); // Also clear selected book for detail
    }

    const handleShowBookDetails = useCallback(async (bookId) => {
        try {
            const response = await apiClient.get(`/book/${bookId}`);
            setSelectedBookForDetail(response.data);
            setcurrentOpen('bookDetail'); // Set a specific type for book detail
            setisOpen(true);
        } catch (error) {
            console.error("Error fetching book details:", error);
            // You might want to show an error message to the user
        }
    }, []);

    const handleReaderAdded = () => {
        setRefreshReaderListKey(prevKey => prevKey + 1); // Increment key to trigger re-fetch
        hide(); // Close the modal
    };

    return (
        <>  
            <Menu selection={selection}/>

            <div className='middle'>
                {/* Truyền books, onBookSelect, isLoading, error xuống Book_table */}
                {/* Show Book_table for home, or when no specific modal is open, or for tiepnhan/baocao if they are overlays/related */}
                {(currentOpen === 'homeView' || currentOpen === null || currentOpen === 'tiepnhan' || currentOpen === 'baocao') &&
                    <Book_table
                        books={books}
                        onBookSelect={handleShowBookDetails}
                        isLoading={isLoadingBooks}
                        error={booksError}
                    />}
                {/* Hiển thị danh sách độc giả. Nút "Thêm độc giả" sẽ được render bên trong Docgia component */}
                {currentOpen === 'docgiaView' && (
                    // Pass the selection function to Docgia so it can trigger the 'lapthe' modal
                    <Docgia 
                        onOpenLapTheModal={() => selection('lapthe')} 
                        refreshKey={refreshReaderListKey} // Pass the key
                    />
                )}
                {/* Các modal khác */}
                {isOpen && currentOpen==='lapthe' && <Lapthe hide={hide} onReaderAdded={handleReaderAdded} />}
                {isOpen && currentOpen==='tiepnhan' && <Tiepnhan hide={hide}/>}
                {isOpen && currentOpen==='muonsach' && <Muonsach hide={hide}/>}
                {isOpen && currentOpen==='trasach' && <Trasach hide={hide}/>}
                {isOpen && currentOpen==='phieuthu' && <Phieuthu hide={hide}/>}
                {isOpen && currentOpen==='baocao' && <Lapbaocao hide={hide}/>}
                {/* Render BookDetailView as a modal, controlled by isOpen and currentOpen */}
                {isOpen && currentOpen==='bookDetail' && selectedBookForDetail && (
                    <BookDetailView book={selectedBookForDetail} hide={hide} />
                )}
            </div>
            {/* Pass userData to User component */}
            <User userData={userData} /> 
        </>
    )
}
export default Mainpage;