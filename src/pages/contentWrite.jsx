import { useState } from "react";

export default function ContentWrite() {
  const [content, setContent] = useState("");

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
