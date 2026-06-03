import { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../assets/css/style.css';
import '../assets/css/reset.css';

import DetailModal from './detailModal';
import { getYoutubeThumbnail } from '../utils/youtube';

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
            const dummy = {
                '2026.06.01' : {
                    'content' : `와 진짜 레전드 사건 \n내가대체이걸어떻게해낸거냐 \n열심히검색한나자신정말고생했다!!`,
                    'youtubeUrl' : 'https://youtu.be/wA1LKdGwFgc?si=XWKFjIp8KFGCoGJa', 
                    'thumbnail' : 'https://img.youtube.com/vi/wA1LKdGwFgc/mqdefault.jpg',
                },
                '2026.06.02' : {
                    'content' : '더미 일기0',
                    'youtubeUrl' : 'https://youtu.be/N4FN1Fb-4i8?si=LnnJ7xTDQ6sLphZ7', 
                    'thumbnail' : 'https://img.youtube.com/vi/N4FN1Fb-4i8/mqdefault.jpg',
                },
                '2026.06.10' : {
                    'content' : '더미 일기1',
                    'youtubeUrl' : 'https://youtu.be/ItSKahBISg0?si=LSYRc95a5NuGBZVx', 
                    'thumbnail' : 'https://img.youtube.com/vi/ItSKahBISg0/mqdefault.jpg',
                },
                '2026.06.11' : {
                    'content' : '더미 일기2',
                    'youtubeUrl' : 'https://youtu.be/6zwJqum91vs?si=e9fCuHxP8FkQbnzQ', 
                    'thumbnail' : 'https://img.youtube.com/vi/6zwJqum91vs/mqdefault.jpg',
                },
                '2026.06.13' : {
                    'content' : '더미 일기더미 일기더미 일기더미 일기',
                    'youtubeUrl' : 'https://youtu.be/wrHH2QjA4yM?si=IiGaIDI64_PZzt4O', 
                    'thumbnail' : 'https://img.youtube.com/vi/wrHH2QjA4yM/mqdefault.jpg',
                },
                '2026.06.15' : {
                    'content' : '더미 일기3',
                    'youtubeUrl' : 'https://youtu.be/CUO2BpYPXUs?si=FNkkZam9e8vioMYc', 
                    'thumbnail' : 'https://img.youtube.com/vi/CUO2BpYPXUs/mqdefault.jpg',
                },
                '2026.06.19' : {
                    'content' : '더미 일기4',
                    'youtubeUrl' : 'https://youtu.be/z1ZIWJaKWGY?si=Iv4Q2G5UJFClkdD4', 
                    'thumbnail' : 'https://img.youtube.com/vi/z1ZIWJaKWGY/mqdefault.jpg',
                },
                '2026.06.20' : {
                    'content' : '와! 정말 엄청난일이 벌어졌습니다 \n제가이걸대체어떻게만든거죠 \nai가도와주긴했습니다그래도엄청나게장하다고생각합니다 \n \n^______^',
                    'youtubeUrl' : 'https://youtu.be/EXtiYj1w7dI?si=U2h_shvXFRZdvUXT', 
                    'thumbnail' : 'https://img.youtube.com/vi/EXtiYj1w7dI/mqdefault.jpg',
                },
                '2026.06.21' : {
                    'content' : '더미 일기6',
                    'youtubeUrl' : 'https://youtu.be/2lwu4ZB-d44?si=0LH_fPRtw52MEMhI', 
                    'thumbnail' : 'https://img.youtube.com/vi/2lwu4ZB-d44/mqdefault.jpg',
                },
                '2026.06.25' : {
                    'content' : '더미 일기7',
                    'youtubeUrl' : 'https://youtu.be/ZoZQoYpZaso?si=PdmLzHh9IUWeJCej', 
                    'thumbnail' : 'https://img.youtube.com/vi/ZoZQoYpZaso/mqdefault.jpg',
                },
                '2026.06.29' : {
                    'content' : '더미 일기8',
                    'youtubeUrl' : 'https://youtu.be/DYgE3SGPEqk?si=Ji9MVeZertqIRhGN', 
                    'thumbnail' : 'https://img.youtube.com/vi/DYgE3SGPEqk/mqdefault.jpg',
                },
            }

            localStorage.setItem('linklog_diaries', JSON.stringify(dummy));
            setDiaries(dummy);
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
                        <path strokeLinecap="miter" strokeLinejoin="miter" d="M15.75 19.5 8.25 12l7.5-7.5" />
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