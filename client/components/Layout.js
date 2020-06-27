import style from './layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';
import Link from 'next/link';
import Head from 'next/head';

function Top({ alt }) {
  return (
    <div className={style.nav}>
      <div>
        <FontAwesomeIcon icon={faBars}/>
      </div>
      <Link href="/">
        <a>
          <img src="/MarvelLogo.svg" alt={alt} title={alt}/>
        </a>
      </Link>
      
      <div></div>
    </div>
  );
}

function Footer({ items }) {
  return(
    <div className={style.footer}>
      <div>
        {items.map((data, index) => {
          return(
            <Link href={data} key={index}>
              <a className="footerLink"><span>{data}</span></a>
            </Link>
          );
        })}
      </div>
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

function Layout({ childComponent, title  }) {
  return (
    <div id={style.container}>
      <Head>
        <title>{title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@700&display=swap" rel="stylesheet"/>
      </Head>
      <Top alt={'메인으로 이동 합니다.'}/>
      <Content children = {childComponent}/>
      <Footer items = {[`Terms of Use`, `Privacy Policy`, `Your California Privacy Rights`, `Do Not Sell My Info`, `Children's Online Privacy Policy`, `License Agreement`, `Interest-Based-Ads`, `Marvel Insider Terms`, `©2020 MARVEL`]}/>
    </div>
  );
}

export default Layout;