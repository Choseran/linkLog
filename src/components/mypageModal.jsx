import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../assets/context/AuthContext";
import "../assets/css/style.css";

export default function MypageModal({
  mypageRef,
  mypage,
  setMypage,
  mypageBtnRef,
}) {
  // 마이페이지 모달창 내부 로그인한 유저 정보로 뜨게 하기 위해 AuthContext에서 user 정보 가져오기
  const { user } = useContext(AuthContext);
  const [userName] = useState(user ? user.name : "");
  const [userId, setUserId] = useState(user ? user.id : "");

  return (
    <div className={`mypageWrap ${mypage ? "mypageModalBackOpen" : ""}`}>
      <div
        ref={mypageRef}
        className={`mypageModal ${mypage ? "mypageModalOpen" : ""}`}
      >
        {/* 마이페이지 모달 닫기 버튼 */}
        <button
          type="button"
          className="mypageModalBtn"
          onClick={() => setMypage(false)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* 마이페이지 모달 메뉴 프로필 */}
        <div className={"mypageModalTop"}>
          <div className={"mypageInfo"}>
            <p className={"mypageName"}>{userName}</p>
            {/* 0603 령경추가 - 여기 user 들어가야하지않나요? */}
            <p className={"mypageId"}>@{userId}</p>
          </div>
          <Link
            to="/login"
            className={"infoEditBtn btn"}
            onClick={() => {
              alert("로그아웃 되었습니다.");
              setMypage(false);
            }}
          >
            로그아웃
          </Link>
        </div>
        {/* 마이페이지 모달 메뉴 리스트 */}
        <ul className={"mypageModalList"}>
          <li>
            <Link
              to="/"
              onClick={() => {
                setMypage(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={"size-6"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                />
              </svg>
              <p>공지사항</p>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => {
                setMypage(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={"size-6"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <p>자주 묻는 Q&A</p>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => {
                setMypage(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={"size-6"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <p>업데이트 노트</p>
            </Link>
          </li>
          <li>
            <Link
              to="/Inquiry"
              onClick={() => {
                setMypage(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={"size-6"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <p>문의하기</p>
            </Link>
          </li>
        </ul>
        {/* 마이페이지 모달 하단 */}
        <Link
          to="/"
          className={"mypageModalBottom"}
          onClick={() => {
            setMypage(false);
          }}
        >
          탈퇴하기
        </Link>
      </div>
    </div>
  );
}
