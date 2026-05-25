import { useContext, useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";

import { AuthContext } from "../assets/context/AuthContext";

export default function InquiryForm(){
    const navigate = useNavigate();

    // 유저정보 가져오기
    const { user } = useContext(AuthContext);

    // 초기값 설정 (유저가 있으면 이름 넣고, 없으면 빈값)
    const [userName] = useState(user ? user.name : "");
    // 이메일
    const [email, setEmail] = useState(user ? user.email : "");
    // 제목
    const [title, setTitle] = useState('');
    // 내용
    const [content, setContent] = useState('');
    // 개인정보 수집이용 동의
    const [isAgreed, setIsAgreed] = useState(false);
    // 문의유형 선택값을 담음
    const [selectedType, setSelectedType] = useState('');
    // 첨부파일 상태
    const [fileList, setFileList] = useState([]);
    // 첨부파일 드래그 색상 변경
    const [isDragging, setIsDragging] = useState(false);

    // 문의유형 핸들러
    const selectBoxHandler = (e) => setSelectedType(e.target.value);

    // 첨부파일 추가 핸들러
    const fileAddHandler = (e) => {
        const selectedFiles = Array.from(e.target.files);  //선택파일 배열로 변환

        // 기존 첨부파일, 새 첨부파일 합치기
        setFileList((prev) => [...prev, ...selectedFiles]);

        // input 값을 비워서 다음 파일을 작동시킬 수 있게
        e.target.value = '';
    }

    // 첨부파일 선택 삭제 핸들러
    const fileDeleteHandler = (target) => {
        setFileList((prev) => prev.filter((_, index) => index !== target));
    }

    // 첨부파일 드래그 중일 때
    const dragOverHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);  // 박스 위로 가져오면 true
    }
    // 첨부파일드래그하다가 박스 밖으로 나갔을 때
    const dragLeaveHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);  // 박스 나가면 false
    }
    // 첨부파일 떨어트렸을 때
    const dragDropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if(files && files.length > 0){
            const selectedFiles = Array.from(files);
            setFileList((prev) => [...prev, ...selectedFiles]);
        }
        setIsDragging(false);  // 드롭 완료 후 false
    }

    // 문의 배열(로컬)에 추가하는 핸들러
    const submitHandler = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        // 필수 항목 유효성 검사 로직
        if (!user) return alert("로그인이 필요한 서비스입니다.");
        if (!email.trim()) return alert("이메일을 입력해 주세요.");
        if (!selectedType) return alert("문의 유형을 선택해 주세요.");
        if (!title.trim()) return alert("제목을 입력해 주세요.");
        if (!content.trim()) return alert("내용을 입력해 주세요.");
        if (!isAgreed) return alert("개인정보 수집 동의가 필요합니다.");

        // 저장할 데이터 객체 만들기
        const newInquiry = {
            inquiryId: Date.now(),
            userName: userName,
            userEmail: email,
            type: selectedType,
            title: title,
            content: content,
            date: new Date().toLocaleDateString(),
            files: fileList.map(file => file.name)
        };

        // try {
        //     // 백엔드 API 서버로 데이터 전송 구문 추가
        //     const response = await fetch("http://localhost:5000/api/inquiry", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(newInquiry), // 객체를 JSON 문자열로 변환해서 전송
        //     });

        //     const result = await response.json();

        //     if (result.success) {
        //         // 백엔드(구글 시트) 저장 성공 시 기존 로컬 스토리지 백업 진행
        //         const existingInquiries = JSON.parse(localStorage.getItem("inquiryList") || "[]");
        //         const updatedInquiries = [...existingInquiries, newInquiry];
        //         localStorage.setItem("inquiryList", JSON.stringify(updatedInquiries));

        //         alert("문의가 접수되었습니다.");
        //         navigate("/");
        //     } else {
        //         // 백엔드에서 에러 메시지를 던진 경우
        //         alert(`접수 실패: ${result.message}`);
        //     }

        // } catch (error) {
        //     // 서버가 꺼져있거나 네트워크 연결이 안 될 때 처리
        //     console.error("백엔드 연동 에러:", error);
        //     alert("백엔드 서버와 연결할 수 없습니다. 서버(node server.js)가 켜져 있는지 확인하세요.");
        // }

        // 기존 문의 내역에 추가
        const existingInquiries = JSON.parse(localStorage.getItem("inquiryList") || "[]");
        const updatedInquiries = [...existingInquiries, newInquiry];

        // 로컬 스토리지에 다시 저장
        localStorage.setItem("inquiryList", JSON.stringify(updatedInquiries));

        alert("문의가 접수되었습니다.");
        
        navigate("/")
    }

    return(
       <section className="inquiryFormContainer contentWrap">
            <form onSubmit={submitHandler}>
                <h4>문의하기</h4>
                <p>궁금한 점이나 불편한 사항을 남겨주세요.</p>
                <p className="inquiryGuide">빠르게 답변드리겠습니다.</p>
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
                                    readOnly // 수정 불가능
                                    placeholder="로그인이 필요합니다."
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="requiredMark">*</span> 이메일
                            </td>
                            <td>
                                <input 
                                    type="text" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="이메일을 입력하세요."
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="requiredMark">*</span> 문의유형
                            </td>
                            <td>
                                <select value={selectedType} onChange={selectBoxHandler}>
                                    <option value="" disabled hidden>유형을 선택해주세요.</option>
                                    <option value="normal">일반</option>
                                    <option value="bug">오류 및 버그신고</option>
                                    <option value="etc">기타</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="requiredMark">*</span> 제목
                            </td>
                            <td>
                                <input 
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="제목을 입력하세요."
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="requiredMark">*</span> 문의내용
                            </td>
                            <td>
                                <textarea 
                                    value={content} 
                                    onChange={(e) => setContent(e.target.value)} 
                                    placeholder="내용을 입력하세요."
                                />
                            </td>
                        </tr>
                        <tr className="fileUploadTr">
                            <td>첨부파일</td>
                            <td>
                                <label>
                                    <input type="file" multiple onChange={fileAddHandler} />
                                    <div className={`fileUploadBox ${isDragging ? 'active' : ''}`} 
                                    onDragOver={dragOverHandler} 
                                    onDragLeave={dragLeaveHandler} 
                                    onDrop={dragDropHandler}>
                                        <p>파일을 드래그하거나 클릭해서 업로드</p>
                                        {/* <p>┼</p> */}
                                    </div>
                                </label>
                            </td>
                            <td>
                                {fileList.length > 0 && (
                                    <ul className="fileList">
                                        {fileList.map((file, index) => (
                                            <li key={`${file.name}-${index}`}>
                                                <button type="button" onClick={() => fileDeleteHandler(index)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                                <p>{file.name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="inquiryFormTerm">
                                <input 
                                    type="checkbox" 
                                    id="term" 
                                    checked={isAgreed}
                                    onChange={(e) => setIsAgreed(e.target.checked)}
                                />
                                <label htmlFor='term'>개인정보 수집·이용에 동의합니다.</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className="btn">제출하기</button>
                <p className="responseTime">평균 답변 시간 : 영업일 기준 1~2일 소요</p>
            </form>
       </section> 
    )
}