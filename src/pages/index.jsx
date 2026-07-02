import { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../assets/css/style.css';
import '../assets/css/reset.css';

import DetailModal from './detailModal';
import { getYoutubeThumbnail } from '../utils/youtube';
import { initialDiaries } from '../assets/data/initialDiaries';

export default function Index(){
    // 날짜
    const [currDate, setCurrDate] = useState(new Date());
    // 달력
    const [activeDate, setActiveDate] = useState(new Date());
    // 일기 데이터
    const [diaries, setDiaries] = useState({});
    // 모달 상태관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 선택 날짜
    const [selectDay, setSelectDay] = useState('');
    // 선택 날짜 내용
    const [selectDayContents, setSelectDayContents] = useState(null);
    // ┖> 예시)
    // '2026-05-10' : {
    //                 'content' : '더미 일기1',
    //                 'youtubeUrl' : 'https://youtu.be/ItSKahBISg0?si=LSYRc95a5NuGBZVx', 
    //                 'thumbnail' : 'https://img.youtube.com/vi/ItSKahBISg0/mqdefault.jpg',
    //             },

    useEffect(() => {
        const data = localStorage.getItem('linklog_diaries');

        if(!data){
            

            localStorage.setItem('linklog_diaries', JSON.stringify(initialDiaries));
            setDiaries(initialDiaries);
        }else{
            setDiaries(JSON.parse(data));
        }
    }, [])

    // selectDay(선택된 날짜)가 바뀔 때마다 일기 데이터 자동 동기화
    useEffect(() => {
        if (selectDay) {
            const dateStr = dataFormat(selectDay);
            if (diaries[dateStr]) {
                setSelectDayContents(diaries[dateStr]);
            } else {
                setSelectDayContents(null); // 일기 없는 날은 null 처리
            }
        }
    }, [selectDay, diaries]);

    const dataFormat = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    }

    // 이전 달로 이동하는 핸들러
    const prevMonthHandler = () => {
        const nextDate = new Date(currDate.getFullYear(), currDate.getMonth() - 1, 1);
        setActiveDate(nextDate);
        setCurrDate(nextDate);
    }

    // 다음 달로 이동하는 핸들러
    const nextMonthHandler = () => {
        const nextDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 1);
        setActiveDate(nextDate);
        setCurrDate(nextDate);
    }

    // 날짜 선택시 상세페이지(모달) 켜지는 핸들러
    const selectDayHandler = (date) => {
        setCurrDate(date);
        setActiveDate(date);

        // 'YYYY-MM-DD' 형식 변환
        const dateStr = dataFormat(date);
        setSelectDay(date);

        if(diaries[dateStr]){
            setSelectDayContents(diaries[dateStr]);
        }else{
            setSelectDayContents(null);
            // alert('작성된 일기가 없습니다');
        }

        // 모달 열기
        setIsModalOpen(true);
    }

    // 하루 전날로 이동하는 핸들러
    const prevDayHandler = () => {
        if (!selectDay) return;
        const prev = new Date(selectDay);
        prev.setDate(prev.getDate() - 1);
        
        setSelectDay(prev);
        setActiveDate(prev); // 메인 달력 월 이동 연동
    }

    // 하루 다음날로 이동하는 핸들러
    const nextDayHandler = () => {
        if (!selectDay) return;
        const next = new Date(selectDay);
        next.setDate(next.getDate() + 1);
        
        setSelectDay(next);
        setActiveDate(next); // 메인 달력 월 이동 연동
    }
    
    return(
        <div className='indexContainer'>
            {/* 월 / 월 이동 화살표 */}
            <div className='calendarHeader'>
                <button type='button' className='prevMonthBtn' 
                onClick={() => {
                    const prevMonth = new Date(activeDate);
                    prevMonth.setMonth(prevMonth.getMonth() - 1);
                    setActiveDate(prevMonth);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <p className="currentMonth">{activeDate.getMonth() + 1}월</p>
                <button type='button' className='nextMonthBtn' 
                onClick={() => {
                    const nextMonth = new Date(activeDate);
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    setActiveDate(nextMonth);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
            <div className='calendarBody'>
                <Calendar 
                    onChange={selectDayHandler} 
                    value={currDate} 
                    // 언어
                    locale='ko-KR' 
                    // 일요일 시작
                    calendarType='gregory' 
                    // ~일 삭제
                    formatDay={(locale, date) => date.getDate().toString()}
                    // 월 이동 안보이게
                    showNavigation={false} 
                    onClickDay={(date) => {
                        setSelectDay(date);
                        setIsModalOpen(true);
                    }} 
                    // 특정 날짜 표시
                    // tileContent = {({ date, view }) => view === 'month' && date.getDate() === 15 ? <p>★</p> : null}
                    // 예시: 일기가 있는 날짜 타일에 'has-diary' 클래스 부여
                    // 지금은 테스트용으로 15일이랑 22일에만 넣어둠. 나중엔 로컬스토리지 데이터 체크로 변경.
                    tileClassName={({ date, view }) => {
                        if (view === 'month') {
                            const dateStr = dataFormat(date);
                            if (diaries[dateStr]) {
                                return 'has-diary';
                            }
                        }
                    }} 
                    // 썸네일 추가
                    tileContent={({ date, view }) => {
                        if (view === 'month') {
                            const dateStr = dataFormat(date);
                            const diary = diaries[dateStr];
                            if (diary && diary.thumbnail) {
                                return (
                                    <div 
                                        className="tileBgImage" 
                                        style={{ backgroundImage: `url(${diary.thumbnail})` }}
                                    />
                                );
                            }
                        }
                        return null;
                    }}
                    activeStartDate={activeDate}
                    onActiveStartDateChange={({ activeStartDate }) => setActiveDate(activeStartDate)}
                />
            </div>
            <DetailModal 
                isModalOpen = {isModalOpen} 
                isModalClose = {() => setIsModalOpen(false)} 
                selectDay = {selectDay ? dataFormat(selectDay) : ''} 
                selectDayContents = {selectDayContents} 
                prevDayHandler = {prevDayHandler}
                nextDayHandler = {nextDayHandler}
            />
        </div>
    )
}