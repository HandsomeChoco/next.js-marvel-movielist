import Layout from '../../components/Layout';
import titleCSS from './title.module.css';
import components from '../../components/lib/component';
import lib from '../../components/lib/lib';
import moment from 'moment';
import Axios from 'axios';

import FontAwesome, { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
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
	const [ writeReview, setWriteReview ] = useState({
		isHide: true,
		content: '',
	}); // 리뷰 작성 모달 hide/show 토글 및 모달 내용 
	
	const onChangeReview = (e) => {
		
		const value = e.target.value;
		setWriteReview({ 
			content: value 
		})
	}

	return (
		<Layout title={`상세 정보: ${title}`}>
			<Container 
				data={data} 
				write={writeReview}
				onChange={onChangeReview}
			/>
		</Layout>
	);
};

const Container = ({ data, write, onChange }) => {
	console.log(write)
	return (
		<>
			<main className={titleCSS.container}>
				<Article data={data} />
				<content>
					<Titles data={data} />
					<Casting data={data} />
				</content>
			</main>
			<Review data={data} />
			<WriteReview onChange={onChange} />
		</>
	);
};

const Article = ({ data }) => {
	const imgFileName = data.imageFileName;
	const title = data.title;
	const degree = data.degree;
	const runningTime = data.runningTime;

	return (
		<article className={titleCSS.wrapper}>
			<img
				src={`/imgs/poster/${imgFileName}`}
				alt={title}
				srcSet=''
				className={titleCSS.poster}
			/>
			<div className={titleCSS.runningTime}>
				{degree != 0 ? `${degree}세 관람가` : '등급 심사중'}, {runningTime}분
			</div>
			<Tasty data={data} />
		</article>
	);
};

const Tasty = ({ data }) => {
	const likes = data.likes.length;
	const dislikes = data.dislikes.length;
	const runningTime = data.runningTime;
	const score = data.score;
	const noScore = '아직 평가가 없습니다.';

	return (
		<div>
			<div>
				<div className={titleCSS.tasty}>
					{components.CreateIcon(
						titleCSS.icon,
						faThumbsUp,
						titleCSS.like,
						lib.kFormatter(likes)
					)}
					{components.CreateIcon(
						titleCSS.icon,
						faThumbsDown,
						titleCSS.dislike,
						lib.kFormatter(dislikes)
					)}
				</div>
				<div>평점: {lib.showText(score, noScore)} </div>
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
				<span>{lib.showText(title, errText)}</span>
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

	function List(arr)  {
		const list = arr.map((v, i) => {
			return (
				<li key={i} className={titleCSS.item}>
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
		<div className={titleCSS.listWrapper}>
			<h3 className={titleCSS.listName}>감독</h3>
			<ul className={titleCSS.list}>
				{List(director)}
			</ul>
			<h3 className={titleCSS.listName}>출연</h3>
			<ul className={titleCSS.list}>
				{List(allCasting)}
			</ul>
		</div>
	);
};

const Review = ({ data, review }) => {
	function list(arr) {
		arr.map;
	}
	return (
		<div>
			<h3>리뷰</h3>
			<ul>
				<li>리뷰 1</li>
				<li>리뷰 2</li>
				<li>리뷰 3</li>
				<li>리뷰 4</li>
				<li>리뷰 5</li>
			</ul>
			<div>
				<button>리뷰 남기기</button>
			</div>
		</div>
	);
};

const WriteReview = ({ onChange }) => {
	const guideText = '여기에 리뷰를 작성하세요.'
	return (
		<div className={titleCSS.writeReviewModal}>
			<form
				action=''
				method='POST'
				onSubmit={(e) => {
					e.preventDefault();
				}}
				onChange={onChange}
			>
				<textarea name='' id='' placeholder={guideText}></textarea>
				<button type='submit'>등록</button>
			</form>
		</div>
	);
};

export default Movie;
