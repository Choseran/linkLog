import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/style.css';

export default function Index(){  // 여긴 무조건 대문자
    const [log, setLog] = ('');
    const navigate = useNavigate();
    
    return(
        <div className='indexContainer'>
            <a className='index'>메인 홈화면</a>
            {/* <Link to='/detail'>
                글쓰기
            </Link>
            <button type="submit" onClick={() => {navigate(-1)}}>이건 뒤로가기 버튼</button> */}
        </div>
    )
}