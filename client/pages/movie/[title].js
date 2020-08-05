import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import titleCSS from './title.module.css';

import moment from 'moment';
import Axios from 'axios';

import FontAwesome, { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import React, { useState, useEffect } from 'react';

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
	const imgFileName = data.imageFileName;
	const title = data.title;
	const enTitle = data.enTitle;

	return (
		<main className={titleCSS.container}>
			<img
				className={titleCSS.poster}
				src={`/imgs/poster/${imgFileName}`}
				alt={`/imgs/poster/${imgFileName}`}
				srcSet=''
			/>
			<article className={titleCSS.wrapper}>
				<Titles title={title} enTitle={enTitle} />
			</article>
		</main>
	);
};

const Titles = ({ title, enTitle }) => {
	function showTitle(arg) {
		return arg ? arg : '제목 정보를 가져오지 못했습니다.';
	}

	return (
		<header>
			<h1 className={`${titleCSS.title} ${titleCSS.kr}`}>{showTitle(title)}</h1>
			<h6 className={`${titleCSS.title} ${titleCSS.en}`}>
				{showTitle(enTitle)}
			</h6>
		</header>
	);
};

const MetaData = ({}) => {
	return (
		<div>
			<h1>asddsad</h1>
		</div>
	);
};

export default Movie;
