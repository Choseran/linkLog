// 썸네일 링크 추출 후 배열에 추가하는 함수
export const getYoutubeThumbnail = (url) => {
  if (!url) return "";

  // ID 추출
  const regID =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regID);

  if (match && match[2].length == 11) {
    const videoID = match[2];

    // ID 조합해서 중화질 썸네일 반환함
    // maxresdefault <- 이건 고화질
    // 고화질 안 쓴 이유 : 옛날 영상이면 없을수도 있기때문
    return `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`; // 06.24 세란 - 여기 부분 링크 형식으로 들어가니 썸네일 변환(jpg)로 안 나와서 수정했습니다.
  }
  // 올바르지 않은 링크일 경우 빈값으로 반환
  return "";
};
