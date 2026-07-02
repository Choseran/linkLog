import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getYoutubeThumbnail } from "../utils/youtube";

export default function ContentWrite() {
  const navigate = useNavigate();
  const location = useLocation();

  const [linkError, setLinkError] = useState(false);

  // 유튜브 링크 검수
  const isValidYoutubeUrl = (url) => {
    // 대문자 -> 소문자로 변환
    // 넣은 이유 : 혹시 모를 대문자로 복사될 오류 방지
  const lowercaseUrl = url.trim().toLowerCase();

  // 유튜브 관련 도메인이 포함되어있는지 확인
  const hasDomain = lowercaseUrl.includes("youtube.com") || lowercaseUrl.includes("youtu.be");

  // 주소창 주소(youtube.com/) 뒤에 영상 식별 글자가 더 붙어있는지 확인
  // https://www.youtube.com/ (기본주소 24자) 보다 주소 길이가 더 길어야 함
  const isLongEnough = lowercaseUrl.length > 25;

  return hasDomain && isLongEnough;
};

  // location.state에서 데이터 받기
  const { selectDay, selectDayContents } = location.state || {};
  const [youtubeUrl, setYoutubeUrl] = useState(
    selectDayContents?.youtubeUrl || "",
  );
  const [contentText, setContentText] = useState(
    selectDayContents?.content || "",
  );

  // 저장 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 유튜브 링크 필수 및 검수
    if (!youtubeUrl.trim()) {
      alert("유튜브 링크를 입력해주세요.");
      setLinkError(true);
      return;
    }

    if (!isValidYoutubeUrl(youtubeUrl)) {
      alert("올바른 유튜브 링크를 입력해주세요.");
      setLinkError(true);
      return;
    }

    const diaries = JSON.parse(localStorage.getItem("linklog_diaries")) || {};

    diaries[selectDay] = {
      content: contentText,
      youtubeUrl: youtubeUrl,
      thumbnail: getYoutubeThumbnail(youtubeUrl),
    };

    console.log("selectDay", selectDay);
    console.log(getYoutubeThumbnail(youtubeUrl));
    localStorage.setItem("linklog_diaries", JSON.stringify(diaries));
    navigate("/");
  };

  return (
    <form className="writeWrap" onSubmit={handleSubmit}>
      <div className="writeContent">
        <h4>
          <span className="requiredMark">*</span> Link
        </h4>
        <input
          type="text"
          placeholder="유튜브 링크를 첨부해주세요."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className={linkError ? "inputError" : ""}
        />
      </div>
      <div className="writeContent">
        <h4>일기</h4>
        <textarea
          placeholder="내용"
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
          maxLength={150}
        />
        <p>
          <em>{contentText.length}</em>/150
        </p>
      </div>
      <button type="submit" className="btn">
        작성완료
      </button>
    </form>
  );
}
