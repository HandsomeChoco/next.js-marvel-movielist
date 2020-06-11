import style from './layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link'
function Layout({ children }) {
  let alt = '메인으로 이동합니다.'
  return (
    <div id={style.container}>
      <div className={style.nav}>
        <div>
          <FontAwesomeIcon icon={faBars}/>
        </div>
        <img src="/MarvelLogo.svg" alt={alt} title={alt}/>
        <div>
        </div>
      </div>
      <div className={style.content}>
        {children}
      </div>
      <div className={style.footer}>
        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
  
  export default Layout