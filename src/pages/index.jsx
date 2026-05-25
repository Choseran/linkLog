import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../assets/css/style.css';
import '../assets/css/reset.css';

export default function Index(){
    const navigate = useNavigate();

    const weeks = ['일', '월', '화', '수', '목', '금', '토'];
    const [currDate, setCurrDate] = useState(new Date());

    // 이전 달로 이동하는 함수
    const handlePrevMonth = () => {
        setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() - 1, 1));
    };

    // 다음 달로 이동하는 함수
    const handleNextMonth = () => {
        setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() + 1, 1));
    };
    
    return(
        <div className='indexContainer'>
            {/* 월 / 월 이동 화살표 */}
            <div className='calendarHeader'>
                <button type='button' className='prevMonthBtn' onClick={handlePrevMonth}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="miter" strokeLinejoin="miter" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <p className='currentMonth'>{currDate.getMonth() + 1}월</p>
                <button type='button' className='nextMonthBtn' onClick={handleNextMonth}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
            <div className='calendarBody'>
                <Calendar 
                    onChange={setCurrDate} 
                    value={currDate} 
                    // 언어
                    locale='ko-KR' 
                    // 일요일 시작
                    calendarType='gregory' 
                    // ~일 삭제
                    formatDay={(locale, date) => date.getDate().toString()}
                    // 월 이동 안보이게
                    showNavigation={false} 
                    // 특정 날짜 표시
                    // tileContent = {({ date, view }) => view === 'month' && date.getDate() === 15 ? <p>★</p> : null}
                    // 예시: 일기가 있는 날짜 타일에 'has-diary' 클래스 부여
                    // 지금은 테스트용으로 15일이랑 22일에만 넣어둠. 나중엔 로컬스토리지 데이터 체크로 변경.
                    tileClassName={({ date, view }) => {
                        if (view === 'month' && (date.getDate() === 15 || date.getDate() === 22)) {
                            return 'has-diary';
                        }
                    }}
                />
            </div>
        </div>
    )
}