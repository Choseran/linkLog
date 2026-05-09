export default function JoinSuccess() {
  return (
    <div className="successWrap contentWrap">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p className="successTitle">회원가입이 완료되었습니다.</p>
      <a href="/login" className="btn">
        로그인
      </a>
    </div>
  );
}
