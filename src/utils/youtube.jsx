// 썸네일 링크 추출 후 배열에 추가하는 함수
export const getYoutubeThumbnail = (url) => {
  if (!url) return "";

  // 주소창(watch?v=), 공유(youtu.be/), 쇼츠(shorts/) 등 주소에서 11자리 ID만 빼냄
  const regID = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regID);

  // 매칭된 결과에서 11자리 ID 추출 성공 시 mqdefault 썸네일 주소 반환
  if (match && match[1].length === 11) {
    const videoID = match[1];
    return `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`;
  }
  
  return "";
};
