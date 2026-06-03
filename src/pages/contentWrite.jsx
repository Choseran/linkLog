import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { getYoutubeThumbnail } from '../utils/youtube';  // 0603 령경추가 - 유튜브 링크로 썸네일 추가하는 함수 공유합니다!!

export default function ContentWrite() {
  const navigate = useNavigate();  // 0603 령경추가 - navigate("/"); 사용시 필요!
  const [content, setContent] = useState("");

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

  return (
    <form className="writeWrap">
      <div className="writeContent">
        <h4>Link</h4>
        <input type="text" placeholder="유튜브 링크를 첨부해주세요." />
      </div>
      <div className="writeContent">
        <h4>일기</h4>
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={150}
        />
        <p>
          <em>{content.length}</em>/150
        </p>
      </div>
    </form>
  );
}
