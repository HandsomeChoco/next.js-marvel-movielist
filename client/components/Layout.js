import style from './layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import Head from 'next/head';
function Top({ alt }) {
  return (
    <div className={style.nav}>
      <div>
        <FontAwesomeIcon icon={faBars}/>
      </div>
      <img src="/MarvelLogo.svg" alt={alt} title={alt}/>
      <div></div>
    </div>
  );
}

function Footer() {
  return(
    <div className={style.footer}>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}

function Content({ children }) {
  return(
    <div className={style.content}>
        {children}
    </div>
  );
}

function Layout({ children, title  }) {
  return (
    <div id={style.container}>
      <Head>
        <title>{title}</title>
      </Head>
      <Top alt={'메인으로 이동 합니다.'}/>
      <Content children = {children}/>
      <Footer/>
    </div>
  );
}

export default Layout