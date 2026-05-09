import { useContext, useState } from "react";
import "../assets/css/style.css";

export default function InquiryForm(){
    // 문의유형 선택값을 담음
    const [selectedType, setSelectedType] = useState('');
    // 첨부파일 상태
    const [fileList, setFileList] = useState([]);
    // 첨부파일 드래그 색상 변경
    const [isDragging, setIsDragging] = useState(false);

    // 문의유형 핸들러
    const selectBoxHandler = (e) => {
        setSelectedType(e.target.value);
        console.log('선택한 문의 유형 : ', e.target.value);
    }

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

    return(
       <section className="inquiryFormContainer">
            <form>
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
                                <input type="text"
                                placeholder="닉네임을 입력하세요."
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="requiredMark">*</span> 이메일
                            </td>
                            <td>
                                <input type="text"
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
                                    <option value="error">일반</option>
                                    <option value="error">오류 및 버그신고</option>
                                    <option value="error">기타</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="requiredMark">*</span> 제목
                            </td>
                            <td>
                                <input type="text"
                                placeholder="제목을 입력하세요."
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="requiredMark">*</span> 문의내용
                            </td>
                            <td>
                                <textarea type="text"
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
                                                {/* svg 코드 넣어야됨!!! */}
                                                <svg onClick={() => fileDeleteHandler(index)}></svg>
                                                <p>{file.name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="inquiryFormTerm">
                                <input type="checkbox" id="term"/>
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