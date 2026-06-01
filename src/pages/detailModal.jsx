import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../assets/css/style.css";

export default function DetailModal({ isModalOpen, isModalClose, selectDay, selectDayContents, getYoutubeThumbnail, saveDiaryHandle }){
    if(!isModalOpen) return null;

    return(
        <div className='detailModalContainer'>
            <div className='modalContainer'>
                <button type='button' className='modalCloseBtn' onClick={isModalClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <span>닫기</span>
                </button>
                <div className='modalBody'>
                    {/* 날짜표시 & 전날/다음날 이동 화살표 */}
                    <div className='modalHeader'>
                        <button type='button' className='prevMonthBtn'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="miter" strokeLinejoin="miter" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <p className='currentMonth'>{selectDay}</p>
                        <button type='button' className='nextMonthBtn'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                    {/* 유튜브 화면/미리보기 */}
                    <div className='youtubeArea'>
                        {selectDayContents?.youtubeUrl ? (
                            <iframe 
                            src={getYoutubeThumbnail(selectDayContents.youtubeUrl)} 
                            frameBorder='0' 
                            scrolling='no' 
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            ></iframe>
                        )
                        :
                        <div className='emptyVideoArea'>
                            <p>재생할 영상이 없습니다.</p>
                        </div>
                        }
                    </div>
                    {/* 일기 내용 */}
                    <div className='diaryContent'>
                        <textarea disabled>{selectDayContents?.content || '작성된 일기가 없습니다.'}</textarea>
                    </div>
                </div>
            </div>
            {/* 작성 / 수정 버튼 */}
            <button type='button' className='writeBtn' onClick={saveDiaryHandle}>
                {selectDayContents === null ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                )}
            </button>
            <div className='modalOverlay'>
            </div>
        </div>
    )
}