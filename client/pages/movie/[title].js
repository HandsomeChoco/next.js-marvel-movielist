import Layout from '../../components/Layout';
import titleCSS from './title.module.css';
import components from '../../components/lib/component';
import lib from '../../components/lib/lib';
import moment from 'moment';
import Axios from 'axios';

import FontAwesome, { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
	let data, review;
	try {
		data = await fetch(
			`http://10.10.12.3:4000/api/movie/${encodeURIComponent(
				context.params.title
			)}`
		).then((response) => response.json());

		review = await fetch(`http://10.10.12.3:4000/api/review`).then((response) =>
			response.json()
		);
	} catch (err) {
		return err;
	}

	return {
		props: {
			data: data[0],
			review,
		},
	};
}

const Movie = ({ data, review }) => {
	const router = useRouter();
	const { title } = router.query;

	return (
		<Layout
			title={`상세 정보: ${title}`}
			childComponent={<Container data={data} />}
		/>
	);
};

const Container = ({ data }) => {
	return (
		<>
			<main className={titleCSS.container}>
				<Article data={data} />
				<content>
					<Titles data={data} />
					<Casting data={data} />
					<Review data={data} />
				</content>
			</main>
		</>
	);
};

const Article = ({ data }) => {
	const imgFileName = data.imageFileName;
	const title = data.title;
	return (
		<article className={titleCSS.wrapper}>
			<img
				src={`/imgs/poster/${imgFileName}`}
				alt={title}
				srcSet=''
				className={titleCSS.poster}
			/>
			<Tasty data={data} />
		</article>
	);
};

const Tasty = ({ data }) => {
	const likes = data.likes.length;
	const dislikes = data.dislikes.length;

	return (
		<div>
			<div className={titleCSS.tasty}>
				{components.CreateIcon(
					faThumbsUp,
					titleCSS.like,
					lib.kFormatter(likes)
				)}
				{components.CreateIcon(
					faThumbsDown,
					titleCSS.dislike,
					lib.kFormatter(dislikes)
				)}
			</div>
		</div>
	);
};

const Titles = ({ data }) => {
	const year = moment(data.year).format('YYYY');
	const title = data.title;
	const enTitle = data.enTitle;
	const errText = '제목 정보를 가져오지 못했습니다.';
	return (
		<header className={titleCSS.titleWrap}>
			<h3 className={`${titleCSS.title} ${titleCSS.kr}`}>
				{lib.showText(title)}
			</h3>
			<h6 className={`${titleCSS.title} ${titleCSS.en}`}>
				{lib.showText(enTitle, errText)}, ({year})
			</h6>
		</header>
	);
};

const Casting = ({ data }) => {
	const director = data.director;
	const mainCasting = data.mainCasting;
	const allCasting = data.casting;

	function casting(arr) {
		const list = arr.map((v, i) => {
			return (
				<li className={titleCSS.item} key={i}>
					<Link href={`/actor/${v}`}>
						<a style={{ textDecoration: 'none' }}>
							<img
								className={titleCSS.profile}
								src={`/imgs/actor/${v}.jfif`}
								alt={`${v} 프로필 이미지`}
							/>
							<div className={titleCSS.name}>{v}</div>
						</a>
					</Link>
				</li>
			);
		});
		return list;
	}

	return (
		<div>
			<h3 className={titleCSS.listName}>감독</h3>
			<ul className={titleCSS.list}>{casting(director)}</ul>
			<h3 className={titleCSS.listName}>출연</h3>
			<ul className={titleCSS.list}>{casting(mainCasting)}</ul>
		</div>
	);
};

const Review = ({ data }) => {
	return (
		<div>
			<span>asdf</span>
		</div>
	);
};

export default Movie;
