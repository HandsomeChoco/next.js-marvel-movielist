import style from './layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';
import Link from 'next/link';
import Head from 'next/head';

const Top = ({ alt }) => {
	return (
		<nav className={style.nav}>
			<div>
				<FontAwesomeIcon icon={faBars} />
			</div>
			<Link href='/'>
				<a>
					<img src='/MarvelLogo.svg' alt={alt} title={alt} />
				</a>
			</Link>

			<div></div>
		</nav>
	);
};

const Footer = ({ items }) => {
	function movieCard(arr) {
		const list = arr.map((data, index) => {
			return (
				<Link href={data} key={index}>
					<a className={style.footerLink}>
						<span>{data}</span>
					</a>
				</Link>
			);
		});
		return list;
	}

	return (
		<footer className={style.footer}>
			<div>{movieCard(items)}</div>
		</footer>
	);
};

const Content = ({ children }) => {
	return <div className={style.content}>{children}</div>;
};

const Layout = ({ childComponent, title }) => {
	const fontLink =
		'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@700&display=swap';
	return (
		<div id={style.container}>
			<Head>
				<title>{title}</title>
				<link href={fontLink} rel='stylesheet' />
			</Head>
			<Top alt={'메인으로 이동 합니다.'} />
			<Content children={childComponent} />
			<Footer
				items={[
					`Terms of Use`,
					`Privacy Policy`,
					`Your California Privacy Rights`,
					`Do Not Sell My Info`,
					`Children's Online Privacy Policy`,
					`License Agreement`,
					`Interest-Based-Ads`,
					`Marvel Insider Terms`,
					`©2020 MARVEL`,
				]}
			/>
		</div>
	);
};

export default Layout;
