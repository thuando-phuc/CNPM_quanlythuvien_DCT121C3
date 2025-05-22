// import './lapbaocao.css' // Bạn có thể tạo file CSS riêng nếu cần style phức tạp hơn
import React, { useState } from 'react';
import apiClient from '../../api/apiClient';
import './lapbaocao.css'; // Create this CSS file
import './lapthedocgia.css'; // Tái sử dụng style từ lapthedocgia.css cho modal

function Lapbaocao({ hide }) {
    const [reportType, setReportType] = useState('muonTheoTheLoai'); // 'sachTraTre'
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateReport = async () => {
        setIsLoading(true);
        setError('');
        setReportData(null);
        try {
            if (reportType === 'muonTheoTheLoai') {
                const response = await apiClient.get(`/reports/muon-theo-the-loai?month=${month}&year=${year}`);
                setReportData(response.data);
            }
            // Add logic for BM7.2 (SachTraTre) here
        } catch (err) {
            console.error("Error generating report:", err);
            setError(err.response?.data?.message || "Lỗi khi tạo báo cáo.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay"> {/* Bắt đầu return với modal-overlay */}
            <div id="baocao_modal" style={{width: '800px', minHeight: '400px'}}> {/* Adjust size as needed */}
                <button type="button" className="hide" onClick={hide}>×</button>
                <div className='title_'>Lập Báo Cáo</div>
                <div className='underline'></div>

                <div className="div_miniwin" style={{justifyContent: 'space-between'}}>
                    <div>
                        <label className='label_lapthe' htmlFor="reportMonth">Tháng:</label>
                        <input className='inp_miniwin' style={{width: '100px'}} type="number" id="reportMonth" value={month} onChange={e => setMonth(e.target.value)} min="1" max="12" />
                    </div>
                    <div>
                        <label className='label_lapthe' htmlFor="reportYear">Năm:</label>
                        <input className='inp_miniwin' style={{width: '120px'}} type="number" id="reportYear" value={year} onChange={e => setYear(e.target.value)} min="1900" />
                    </div>
                    <button className="submit-button" style={{margin: '0'}} onClick={handleGenerateReport} disabled={isLoading}>
                        {isLoading ? 'Đang tạo...' : 'Xem báo cáo'}
                    </button>
                </div>

                {error && <p className="error-message" style={{textAlign: 'center'}}>{error}</p>}

                {reportData && reportType === 'muonTheoTheLoai' && (
                    <div className="report-content" style={{marginTop: '20px'}}>
                        <h3>Báo Cáo Tình Hình Mượn Sách Theo Thể Loại - Tháng {reportData.month}/{reportData.year}</h3>
                        <table className="book_table" style={{maxWidth: '100%'}}> {/* Reuse book_table style */}
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên Thể Loại</th>
                                    <th>Số Lượt Mượn</th>
                                    <th>Tỉ Lệ (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.report.map((item, index) => (
                                    <tr key={item.the_loai}>
                                        <td>{index + 1}</td>
                                        <td>{item.the_loai}</td>
                                        <td>{item.so_luot_muon}</td>
                                        <td>{item.ti_le}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p style={{textAlign: 'right', marginTop: '10px'}}><b>Tổng số lượt mượn: {reportData.total_borrows}</b></p>
                    </div>
                )}
                {/* Add rendering for BM7.2 here */}
            </div>
        </div>
    );
}
export default Lapbaocao;
