import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [idError, setIdError] = useState(null);
  const [pwError, setPwError] = useState(null);

  const handleSubmit = (e) => {
    setIdError("error");
    if (!userId) {
      setIdError("IDEMPTY");
      if (!userPassword) {
        setPwError("PWEMPTY");
      } else if (userPassword !== "1234") {
        setPwError("PWERROR");
      } else {
        setPwError(null);
      }
    } else if (userId !== "admin") {
      setIdError("IDERROR");
      if (!userPassword) {
        setPwError("PWEMPTY");
      } else if (userPassword !== "1234") {
        setPwError("PWERROR");
      } else {
        setPwError(null);
      }
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
          <a href="/join" className="joinLink">
            회원가입
          </a>
        </li>
        <li>
          <a href="/join" className="joinLink">
            아이디 찾기
          </a>
        </li>
        <li>
          <a href="/join" className="joinLink">
            비밀번호 찾기
          </a>
        </li>
      </ul>
    </form>
  );
}
