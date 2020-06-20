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
      <img src="/MarvelLogo.svg" alt={alt} title={alt}/>
      <div></div>
    </div>
  );
}

function Footer({ items }) {
  return(
    <div className={style.footer}>
      <ul>
        {items.map((data, index) => {
          return(
            <Link href={data} key={index}>
              <a className="footerLink"><li>{data}</li></a>
            </Link>
          );
        })}
      </ul>
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
      <Footer items = {[`Terms of Use`, `Privacy Policy`, `Your California Privacy Rights`, `Do Not Sell My Info`, `Children's Online Privacy Policy`, `License Agreement`, `Interest-Based-Ads`, `Marvel Insider Terms`, `©2020 MARVEL`]}/>
    </div>
  );
}

export default Layout;