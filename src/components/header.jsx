import { useContext } from 'react';
import '../assets/css/style.css';

import logoImg from '../assets/img/Link_log_logo.svg';
import hamMenu from '../assets/img/submenu_icon.svg';

export default function Header(){
    return(
        <header>
            <a className='index'>
                <img src={logoImg} alt="logo" />
            </a>
            <button>
                <img src={hamMenu} alt="menuBtn" />
            </button>
        </header>
    )
}