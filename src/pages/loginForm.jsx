import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../assets/context/AuthContext";  // 0603 령경추가

export default function LoginForm() {
  const navigate = useNavigate();

  // const { login } = useContext(AuthContext);  // 0603 령경추가

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [idError, setIdError] = useState(null);
  const [pwError, setPwError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      setIdError("IDEMPTY");
    } else if (userId !== "admin") {
      setIdError("IDERROR");
    } else {
      setIdError(null);
      if (!userPassword) {
        setPwError("PWEMPTY");
      } else if (userPassword !== "1234") {
        setPwError("PWERROR");
      } else {
        setPwError(null);
        navigate("/");
      }
    }

    // 0603 령경추가 - 9번째 줄에 추가한걸로 로컬에 저장된 유저 리스트 가져오기 이런거 써야할듯...
    // const findUsers = JSON.parse(localStorage.getItem("users") || "[]");
  };
  return (
    <form className="loginWrap contentWrap">
      <div className={`loginInput ${idError ? "error" : ""}`}>
        <p>아이디</p>
        <input
          type="text"
          value={userId}
          placeholder="아이디를 입력해주세요."
          onChange={(e) => setUserId(e.target.value)}
        />
        {idError === "IDEMPTY" && <i>아이디를 입력해주세요.</i>}
        {idError === "IDERROR" && <i>아이디가 존재하지 않습니다.</i>}
      </div>
      <div className={`loginInput ${pwError ? "error" : ""}`}>
        <p>비밀번호</p>
        <input
          type="password"
          value={userPassword}
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setUserPassword(e.target.value)}
        />
        {pwError === "PWEMPTY" && <i>비밀번호를 입력해주세요.</i>}
        {pwError === "PWERROR" && <i>비밀번호가 일치하지 않습니다.</i>}
      </div>
      <button className="loginBtn btn" onClick={handleSubmit} type="submit">
        로그인
      </button>
      <ul className="loginBottom">
        <li>
          <Link to="/join" className="joinLink">
            회원가입
          </Link>
        </li>
        <li>
          <Link to="/join" className="joinLink">
            아이디 찾기
          </Link>
        </li>
        <li>
          <Link href="/join" className="joinLink">
            비밀번호 찾기
          </Link>
        </li>
      </ul>
    </form>
  );
}
