// linklog-server/server.js
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000; // 백엔드 서버가 켜질 포트번호

// 미들웨어 세팅 (리액트에서 오는 요청을 허용하고 json을 파싱함)
app.use(cors());
app.use(express.json());

// 1. 구글 인증 설정 (방금 옮긴 json 파일 경로 지정)
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'google-key.json'), 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// 구글 스프레드시트 ID
const SPREADSHEET_ID = '1LdZxh-IJzBAQWNeyjBGltCZo87B2YoMvALT-wiSB-s4'; 

// 2. 리액트에서 문의하기 데이터를 받아 시트에 저장하는 API 엔드포인트
app.post('/api/inquiry', async (req, res) => {
  // 리액트의 newInquiry 객체 안에 들어있는 Key 이름과 완벽하게 일치시켜야 변수에 데이터가 담김
  const { inquiryId, userName, userEmail, type, title, content, date, files } = req.body;

  // 간단한 방어 코드
  if (!userName || !userEmail || !title || !content) {
    return res.status(400).json({ success: false, message: '필수 필드가 누락되었습니다.' });
  }

  try {
    // 배열로 들어온 파일 이름들을 구글 시트에 한 줄로 예쁘게 넣기 위해 문자열로 합쳐주는 작업
    const fileNamesString = files && files.length > 0 ? files.join(', ') : '없음';

    // 구글 시트에 행 추가하기
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'linklog-server!A:H', // Sheet1의 A열부터 H열까지 사용
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            inquiryId,       // A열: 문의 ID
            userName,        // B열: 이름
            userEmail,       // C열: 이메일
            type,            // D열: 문의 유형
            title,           // E열: 제목
            content,         // F열: 내용
            date,            // G열: 날짜
            fileNamesString  // H열: 첨부파일 리스트
          ]
        ],
      },
    });

    console.log('구글 시트 저장 성공:', { userName, title }); 
    return res.status(200).json({ success: true, message: '문의가 성공적으로 접수되었습니다.' });

  } catch (error) {
    console.error('구글 시트 연동 에러:', error);
    return res.status(500).json({ success: false, message: '서버 에러로 저장에 실패했습니다.' });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`백엔드 서버가 http://localhost:${PORT} 에서 돌아가는 중입니다.`);
});