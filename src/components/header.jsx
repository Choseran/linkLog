import { useContext } from "react";
import "../assets/css/style.css";

import logoImg from "../assets/img/Link_log_logo.svg";
import hamMenu from "../assets/img/submenu_icon.svg";

export default function Header() {
  return (
    <header>
      <a className="index">
        <img src={logoImg} alt="logo" />
      </a>
      <button>
        {/* <img src={hamMenu} alt="menuBtn" /> */}
        {/* 이거 이미지로 다운 안 받고 이렇게 써도 돼요!
            홈페이지에서 copy svg 눌러서 바로 붙인거임 */}
        {/* svg 처음 가져오면 확인해야 하는 것
        1. class -> className
        2. stroke-width -> strokeWidth
        stroke-linecap -> strokeLinecap
        stroke-linejoin -> strokeLinejoin
        리액트 문법상 형식이 달라져서 수정하지 않아도 출력은 잘 되지만
        관리자메뉴? 켰을 때 빨간줄 생김! */}
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </header>
  );
}
