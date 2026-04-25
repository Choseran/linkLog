import { useContext, useState } from "react";
import "../assets/css/style.css";

export default function JoinForm() {
    const [password, setPassword] = useState("");
    const [islengthValid, setIslengthValid] = useState(false);
    const [isPatternValid, setIsPatternValid] = useState(false);

    // 약관 데이터 (ID와 실제 데이터 매칭)
    const termsData = [
        { id: 'service', title: '(필수) 서비스 이용약관', content: '이용약관 내용어쩌구...' },
        { id: 'privacy', title: '(필수) 개인정보 처리방침', content: '개인정보 내용어쩌구...' },
        { id: 'marketing', title: '(선택) 마케팅 정보 수신', content: '이벤트 알림 내용...' },
    ];

    // 1. 초기 상태를 데이터 ID 기반으로 자동 생성
    const [checkedItems, setCheckedItems] = useState(
        termsData.reduce((acc, term) => ({ ...acc, [term.id]: false }), {})
    );

    // 2. 전체 동의 여부 실시간 계산 (모든 항목이 true인지 확인)
    const isAllChecked = termsData.every((term) => checkedItems[term.id]);

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setIslengthValid(value.length >= 6);
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        setIsPatternValid(hasLetter && hasNumber);
    }

    // 개별 체크 핸들러
    const handleCheck = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    // 전체 동의 핸들러
    const handleAllCheck = (e) => {
        const isChecked = e.target.checked;
        const newCheckedState = {};
        termsData.forEach(term => {
            newCheckedState[term.id] = isChecked;
        })
        setCheckedItems(newCheckedState);
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
                                    <li className="allAgreeCheck">
                                        <input
                                            type="checkbox"
                                            id="allAgreeCheck"
                                            checked={isAllChecked} // 전체가 true면 자동 체크
                                            onChange={handleAllCheck}
                                        />
                                        <label htmlFor="allAgreeCheck">전체 동의</label>
                                    </li>
                                    {termsData.map((terms) => (
                                        <li className="termsItem" key={terms.id}>
                                            <input
                                                type="checkbox"
                                                id={terms.id}
                                                checked={checkedItems[terms.id]} // 내 상태 연결
                                                onChange={() => handleCheck(terms.id)}
                                            />
                                            <label htmlFor={terms.id}>{terms.title}</label>
                                            <button type="button" className="viewDetailBtn" aria-label="약관 보기">╋</button>
                                            <div className="termsScrollBox">
                                                <p>{terms.content}</p>
                                            </div>
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
