import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../assets/css/style.css';
import '../assets/css/reset.css';

export default function Index(){
    // 날짜
    const [currDate, setCurrDate] = useState(new Date());
    // 일기 데이터
    const [diaries, setDiaries] = useState({});

    useEffect(() => {
        const data = localStorage.getItem('linklog_diaries');

        if(!data){
            const dummy = {
                '2026-05-10' : {
                    'content' : '더미 일기1',
                    'youtubeUrl' : 'https://youtu.be/ItSKahBISg0?si=LSYRc95a5NuGBZVx', 
                    'thumbnail' : 'https://img.youtube.com/vi/ItSKahBISg0/mqdefault.jpg',
                },
                '2026-05-11' : {
                    'content' : '더미 일기2',
                    'youtubeUrl' : 'https://youtu.be/6zwJqum91vs?si=e9fCuHxP8FkQbnzQ', 
                    'thumbnail' : 'https://img.youtube.com/vi/6zwJqum91vs/mqdefault.jpg',
                },
                '2026-05-15' : {
                    'content' : '더미 일기3',
                    'youtubeUrl' : 'https://youtu.be/CUO2BpYPXUs?si=FNkkZam9e8vioMYc', 
                    'thumbnail' : 'https://img.youtube.com/vi/CUO2BpYPXUs/mqdefault.jpg',
                },
                '2026-05-19' : {
                    'content' : '더미 일기4',
                    'youtubeUrl' : 'https://youtu.be/z1ZIWJaKWGY?si=Iv4Q2G5UJFClkdD4', 
                    'thumbnail' : 'https://img.youtube.com/vi/z1ZIWJaKWGY/mqdefault.jpg',
                },
                '2026-05-20' : {
                    'content' : '더미 일기5',
                    'youtubeUrl' : 'https://youtu.be/EXtiYj1w7dI?si=U2h_shvXFRZdvUXT', 
                    'thumbnail' : 'https://img.youtube.com/vi/EXtiYj1w7dI/mqdefault.jpg',
                },
                '2026-05-21' : {
                    'content' : '더미 일기6',
                    'youtubeUrl' : 'https://youtu.be/2lwu4ZB-d44?si=0LH_fPRtw52MEMhI', 
                    'thumbnail' : 'https://img.youtube.com/vi/2lwu4ZB-d44/mqdefault.jpg',
                },
                '2026-05-25' : {
                    'content' : '더미 일기7',
                    'youtubeUrl' : 'https://youtu.be/ZoZQoYpZaso?si=PdmLzHh9IUWeJCej', 
                    'thumbnail' : 'https://img.youtube.com/vi/ZoZQoYpZaso/mqdefault.jpg',
                },
                '2026-05-29' : {
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

    const dataFormat = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // 썸네일 추출, 배열에 추가 - 추후 사용
    const getYoutubeThumbnail = (url) => {
        if(!url) return '';

        // ID 추출
        const regID = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regID);

        if(match && match[2].length == 11){
            const videoID = match[2];

            // ID 조합해서 중화질 썸네일 반환함
            // maxresdefault <- 이건 고화질
            // 고화질 안 쓴 이유 : 옛날 영상이면 없을수도 있기때문
            return `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`;
        }
        // 올바르지 않은 링크일 경우 빈값으로 반환
        return '';
    }

    // 이전 달로 이동하는 핸들러
    const prevMonthHandler = () => {
        setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() - 1, 1));
    };

    // 다음 달로 이동하는 핸들러
    const nextMonthHandler = () => {
        setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() + 1, 1));
    };
    
    return(
        <div className='indexContainer'>
            {/* 월 / 월 이동 화살표 */}
            <div className='calendarHeader'>
                <button type='button' className='prevMonthBtn' onClick={prevMonthHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="miter" strokeLinejoin="miter" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <p className='currentMonth'>{currDate.getMonth() + 1}월</p>
                <button type='button' className='nextMonthBtn' onClick={nextMonthHandler}>
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
                />
            </div>
            <button type='button' className='writeBtn'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>
        </div>
    )
}