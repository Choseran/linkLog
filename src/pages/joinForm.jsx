import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import { termsData } from "../assets/data/termsData";

export default function JoinForm() {
  const navigate = useNavigate();

  // 닉네임 상태관리
  const [userName, setUserName] = useState("");
  // 아이디 상태관리
  const [userId, setUserId] = useState("");
  // 아이디 중복체크 (null: 미실시, true: 가능, false: 중복, 'invalid': 형식오류)
  const [isIdCHk, setIsIdChk] = useState(null);
  // 비밀번호 상태관리
  const [userPassword, setUserPassword] = useState("");
  // 비밀번호 확인
  const [userPasswordChk, setUserPasswordChk] = useState("");
  // 비밀번호 길이
  const [islengthValid, setIslengthValid] = useState(false);
  // 비밀번호 영문, 숫자
  const [isPatternValid, setIsPatternValid] = useState(false);
  // 체크박스 상태 관리
  const [checkedItems, setCheckedItems] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });
  // 약관 상세 상태관리
  const [openTerms, setOpenTerms] = useState({});
  // 각 항목별 상태 여부 관리 (비어있거나 확인버튼을 누르지 않았음)
  const [errors, setErrors] = useState({
    userName: null,
    userId: false,
    userPassword: false,
    userPasswordChk: false,
    terms: false,
  });

  // 아이디 중복확인 버튼
  const idCheck = () => {
    // 아이디 존재 여부 확인
    if (!userId) return alert("아이디를 입력하세요.");

    // 아이디 유효성 검사 (3~12자, 영문, 숫자, -, _ 만 가능)
    const idReg = /^[a-zA-Z0-9-_]{3,12}$/;
    if(!idReg.test(userId)){
      setIsIdChk('invalid');  // 형식이 맞지않음
      return;
    }

    // 로컬 스토리지에서 기존 유저 리스트 확인
    const existingUsers = JSON.parse(localStorage.getItem("userList") || "[]");
    const isExist = existingUsers.some((user) => user.id === userId);

    if (isExist) {
      setIsIdChk(false); // 존재하는 아이디
    } else {
      setIsIdChk(true); // 사용 가능
    }
  };

  // 비밀번호 입력 실시간 검사
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUserPassword(value);

    // 길이 검사 (6자 이상)
    setIslengthValid(value.length >= 6);

    // 영문+숫자 포함 검사
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    setIsPatternValid(hasLetter && hasNumber);
  };

  // 비밀번호와 비밀번호 확인이 동일한지 체크
  const isPasswordMatch =
    userPassword === userPasswordChk && userPasswordChk !== "";
  // 비밀번호 확인 입력 실시간 검사
  const passwordChkHandler = (e) => {
    const value = e.target.value;
    setUserPasswordChk(value);
  };

  // 개별 체크박스 변경 함수
  const handleCheck = (id) => {
    setCheckedItems({
      ...checkedItems,
      [id]: !checkedItems[id], // 현재 상태의 반대로 변경
    });
  };

  // 전체 동의 여부 계산 (모두 true일 때만 true)
  const isAllChecked = checkedItems.service && checkedItems.privacy && checkedItems.marketing;

  // 전체 동의 클릭 시 함수
  const handleAllCheck = (e) => {
    const isChecked = e.target.checked;
    // 모든 항목을 전체 체크 상태와 동일하게 변경
    setCheckedItems({
      service: isChecked,
      privacy: isChecked,
      marketing: isChecked,
    });
  };

  // 약관 상세 보기 토글
  const termsToggleHandeler = (id) => {
    setOpenTerms({
      ...openTerms,
      [id]: !openTerms[id],
    });
  };

  // 가입하기 버튼 핸들러
  // 가입하기 버튼 핸들러
  const joinBtnHandler = (e) => {
    // 폼 제출 시 페이지 새로고침 방지
    if (e) e.preventDefault();

    // 1. 에러 상태 계산 (newErrors)
    // 모든 유효성 검사 결과를 한 번에 체크함
    const newErrors = {
      userName: !userName, // 닉네임 빈칸 체크
      userId: !userId || isIdCHk !== true, // 아이디 빈칸 또는 중복체크 미통과
      userPassword: !userPassword || !islengthValid || !isPatternValid, // 비밀번호 빈칸 또는 서식 오류
      userPasswordChk: !userPasswordChk || !isPasswordMatch, // 비밀번호 확인 빈칸 또는 불일치
      terms: !checkedItems.service || !checkedItems.privacy, // 필수 약관(서비스, 개인정보) 동의 여부
    };

    // 2. 화면에 에러 표시를 위해 상태 업데이트
    setErrors(newErrors);

    // 3. 중단 로직: 하나라도 true(에러)가 있으면 가입 중단
    if (Object.values(newErrors).some((error) => error === true)) {
      if (newErrors.userId && isIdCHk === null) {
        alert("아이디 중복확인을 해주세요.");
      } else if (newErrors.terms) {
        alert("필수 약관에 동의해야 가입이 가능합니다.");
      } else {
        alert("필수 입력 항목의 서식과 내용을 확인해주세요.");
      }
      return; // 여기서 함수 종료 (가입 진행 안 함)
    }

    // --- 여기서부터는 모든 조건이 충족된 경우에만 실행됨 ---

    // 4. 저장할 유저 객체 생성
    const newUser = {
      name: userName,
      id: userId,
      pw: userPassword,
      joinedDate: new Date().toLocaleDateString(),
    };

    // 5. 로컬 스토리지 데이터 처리
    const existingUsers = JSON.parse(localStorage.getItem("userList") || "[]");
    
    // 최종 중복 방어 체크 (데이터 무결성을 위해 한 번 더 확인)
    if (existingUsers.some(user => user.id === userId)) {
        alert("이미 가입된 아이디입니다.");
        return;
    }

    existingUsers.push(newUser);
    localStorage.setItem("userList", JSON.stringify(existingUsers));
    
    // 현재 가입한 유저를 바로 로그인 처리
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert(`${userName}님, 가입을 축하합니다!`);
    console.log("가입성공 및 메인 페이지로 이동");

    // 6. 메인 페이지로 이동
    navigate('/');
  };

  return (
    <section className="joinContainer">
      <form onSubmit={joinBtnHandler}>
        <h4>회원가입</h4>
        <table>
          <tbody>
            <tr>
              <td>
                <span className="requiredMark">*</span> 닉네임
              </td>
              <td>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {setUserName(e.target.value)}}
                  className={errors.userName ? "errorBorder" : ""}
                  placeholder="닉네임을 입력하세요."
                />
              </td>
            </tr>
            <tr>
              <td>
                <span className="requiredMark">*</span> 아이디
              </td>
              <td>
                <input
                  type="text"
                  className={errors.userId ? "errorBorder" : ""}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="아이디를 입력하세요."
                />
                <button
                  type="button"
                  className={`checkDuplicateBtn ${!userId ? 'inputEmpty' : ''}`}
                  onClick={idCheck}
                >
                  중복확인
                </button>
                {/* 사용 가능, 불가능 문구 */}
                {isIdCHk !== null &&(
                  <div className={`idpwchk ${isIdCHk === true ? 'true' : 'false'}`}>
                    {isIdCHk === true && <p>사용 가능한 아이디 입니다.</p>}
                    {isIdCHk === false && <p>존재하는 아이디 입니다.</p>}
                    {isIdCHk === 'invalid' && <p>아이디는 3~12자의 영문, 숫자, -, _ 만 사용 가능합니다.</p>}
                  </div>
                )
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="requiredMark">*</span> 비밀번호
              </td>
              <td>
                <input
                  type="password"
                  className={errors.userPassword ? "errorBorder" : ""}
                  value={userPassword}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호를 입력하세요."
                />
                <ul className="pwHint">
                  {/* 길이 체크 상태(islengthValid) 사용 */}
                  <li className={`pwStatusMessage ${islengthValid}`}>
                    {islengthValid ? (
                      // 조건 충족 시 (체크 표시 아이콘)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    ) : (
                      // 조건 미충족 시 (엑스 표시 아이콘)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    )}
                    <p>비밀번호는 최소 6자리 이상이어야 합니다.</p>
                  </li>

                  {/* 패턴 체크 상태(isPatternValid) 사용 */}
                  <li className={`pwStatusMessage ${isPatternValid}`}>
                    {isPatternValid ? (
                      // 조건 충족 시
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    ) : (
                      // 조건 미충족 시
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    )}
                    <p>영문, 숫자가 포함되어야 합니다.</p>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <span className="requiredMark">*</span> 비밀번호 확인
              </td>
              <td>
                <input
                  type="password"
                  className={errors.userPasswordChk ? "errorBorder" : ""}
                  value={userPasswordChk}
                  onChange={passwordChkHandler}
                  //  placeholder 문구 확인필요
                  placeholder="비밀번호를 다시 입력하세요."
                  disabled={!userPassword}
                />
                {/* 비밀번호 확인문구 */}
                {userPasswordChk && (
                  <div
                    className={`idpwchk ${isPasswordMatch ? "true" : "false"}`}
                  >
                    {isPasswordMatch ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <p>비밀번호가 일치합니다.</p>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <p>비밀번호가 일치하지 않습니다.</p>
                      </>
                    )}
                  </div>
                )}
              </td>
            </tr>
            <tr className="termsContainer">
              <td>
                <span className="requiredMark">*</span> 약관동의
              </td>
              <td className="termsList">
                <ul>
                  {/* 약관 전체동의 */}
                  <li className="allAgreeCheck">
                    <input
                      type="checkbox"
                      id="allAgreeCheck"
                      checked={isAllChecked} // 전체가 true면 자동 체크
                      onChange={handleAllCheck}
                    />
                    <label htmlFor="allAgreeCheck" className={errors.userId ? "errorCheckBox" : ""}>전체 동의</label>
                  </li>
                  {/* 개별 약관 */}
                  {termsData.map((terms) => (
                    <li className="termsItem" key={terms.id}>
                      <div className="termsMainRow">
                        <input
                          type="checkbox"
                          id={terms.id}
                          checked={checkedItems[terms.id]} // 내 상태 연결
                          onChange={() => handleCheck(terms.id)}
                        />
                        <label htmlFor={terms.id} className={errors.userId ? "errorCheckBox" : ""}>{terms.title}</label>
                        <button
                          type="button"
                          className={`viewDetailBtn ${openTerms[terms.id] ? "open" : ""}`}
                          aria-label="약관 보기"
                          onClick={() => termsToggleHandeler(terms.id)}
                        >
                          {openTerms[terms.id] ? "━" : "╋"}
                        </button>
                      </div>
                      <div
                        className={`termsScrollBox ${openTerms[terms.id] ? "show" : ""}`}
                      >
                        <p>{terms.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        {/* 페이지 이동 */}
        <button type="submit" className="btn">가입하기</button>
      </form>
    </section>
  );
}