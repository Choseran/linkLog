import { useContext, useState } from "react";
import "../assets/css/style.css";

export default function JoinForm() {
    // 비밀번호 상태관리
    const [password, setPassword] = useState("");
    // 비밀번호 길이
    const [islengthValid, setIslengthValid] = useState(false);
    // 비밀번호 영문, 숫자
    const [isPatternValid, setIsPatternValid] = useState(false);
    // 체크박스 상태 관리
    const [checkedItems, setCheckedItems] = useState({
        service: false,
        privacy: false,
        marketing: false
    })
    // 약관 상세 상태관리
    const [openTerms, setOpenTerms] = useState({});

    // 약관 데이터
    const termsData = [
        { 
            id: 'service', 
            title: '(필수) 서비스 이용약관 동의', 
            content: '제 1조 (목적)\n본 약관은 Link.log(이하 "회사")가 제공하는 서비스의 이용 조건 및 절차, 이용자와 회사의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.\n\n제 2조 (서비스의 제공)\n회사는 이용자에게 커뮤니티 서비스 및 관련 부가 서비스를 제공하며, 구체적인 내용은 서비스 화면에 게시합니다.' 
        },
        { 
            id: 'privacy', 
            title: '(필수) 개인정보 수집 및 이용 동의', 
            content: '1. 수집하는 개인정보 항목: 닉네임, 아이디, 비밀번호\n2. 수집 목적: 회원 가입 및 서비스 이용 본인 확인, 부정 이용 방지\n3. 보유 및 이용 기간: 회원 탈퇴 시 즉시 파기 (단, 법령에 따른 보존 필요 시 해당 기간 보관)' 
        },
        { 
            id: 'marketing', 
            title: '(선택) 마케팅 정보 수신 동의', 
            content: '신규 서비스 출시, 이벤트 정보, 뉴스레터 등 다양한 소식을 이메일이나 알림을 통해 받아보실 수 있습니다. 동의하지 않으셔도 서비스 이용은 가능하나, 일부 혜택이 제한될 수 있습니다.' 
        },
    ]

    // 전체 동의 여부 계산 (모두 true일 때만 true)
    const isAllChecked = checkedItems.service && checkedItems.privacy && checkedItems.marketing;

    // 비밀번호 입력 실시간 검사
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        // 길이 검사 (6자 이상)
        setIslengthValid(value.length >= 6);

        // 영문+숫자 포함 검사
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        setIsPatternValid(hasLetter && hasNumber);
    }

    // 개별 체크박스 변경 함수
    const handleCheck = (id) => {
        setCheckedItems({
            ...checkedItems,
            [id]: !checkedItems[id] // 현재 상태의 반대로 변경
        })
    }

    // 전체 동의 클릭 시 함수
    const handleAllCheck = (e) => {
        const isChecked = e.target.checked;
        // 모든 항목을 전체 체크 상태와 동일하게 변경
        setCheckedItems({
            service: isChecked,
            privacy: isChecked,
            marketing: isChecked
        })
    }

    // 약관 상세 보기 토글
    const termsToggleHandeler = (id) => {
        setOpenTerms({
            ...openTerms,
            [id]: !openTerms[id]
        })
    }

    return (
        <section className="joinContainer">
            <form>
                <h4>회원가입</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <span className="requiredMark">*</span> 닉네임
                            </td>
                            <td>
                                <input type="text" placeholder="닉네임을 입력하세요." />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="requiredMark">*</span> 아이디
                            </td>
                            <td>
                                <input type="text" placeholder="아이디를 입력하세요." />
                                <button type="button" className="checkDuplicateBtn">
                                    중복확인
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="requiredMark">*</span> 비밀번호
                            </td>
                            <td>
                                <input
                                    type="password"
                                    value={password}
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
                                    placeholder="비밀번호를 다시 입력하세요."
                                />
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
                                        <label htmlFor="allAgreeCheck">전체 동의</label>
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
                                                <label htmlFor={terms.id}>{terms.title}</label>
                                                <button type="button" 
                                                className={`viewDetailBtn ${openTerms[terms.id] ? 'open' : ''}`} 
                                                aria-label="약관 보기" 
                                                onClick={() => termsToggleHandeler(terms.id)}>
                                                    {openTerms[terms.id] ? '━' : '╋'}
                                                </button>
                                            </div>
                                            {openTerms[terms.id] && (
                                                <div className="termsScrollBox">
                                                    <p>{terms.content}</p>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <button type="submit" className="joinBtn">가입하기</button>
        </section>
    );
}
