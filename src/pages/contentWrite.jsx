import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getYoutubeThumbnail } from "../utils/youtube"; // 0603 령경추가 - 유튜브 링크로 썸네일 추가하는 함수 공유합니다!!

export default function ContentWrite() {
  const navigate = useNavigate(); // 0603 령경추가 - navigate("/"); 사용시 필요!
  const location = useLocation(); // location.state로 데이터 받기 위해 필요!

  const [linkError, setLinkError] = useState(false);

  // 0603 령경추가
  // 저장버튼에 navigate("/");
  // 해라. 가 아니라 참고하시라고!

  // DetailModal.jsx 61번째 줄 참고하시면 아시겠지만
  // 일기 신규작성/수정 버튼 누르면 state로 데이터 넘어옵니다!
  // 아마 useLocation 같은거 사용하셔서 받으시면 될 것 같습니다
  // navigate('/write',
  //   { state: {
  //     selectDay: selectDay,  // 날짜
  //     selectDayContents: selectDayContents  // content, youtubeUrl, thumbnail
  //   }
  // });

  // 유튜브 링크 검수
  const isValidYoutubeUrl = (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?[a-zA-Z0-9_-]{11}$/;
    return youtubeRegex.test(url);
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
        <h4>Link</h4>
        <input
          type="text"
          placeholder="유튜브 링크를 첨부해주세요."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className={linkError ? "error" : ""}
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
