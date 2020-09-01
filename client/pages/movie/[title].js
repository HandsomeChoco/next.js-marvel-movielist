import Layout from '../../components/Layout';
import titleCSS from './title.module.css';
import components from '../../components/lib/component';
import lib from '../../components/lib/lib';
import moment from 'moment';
import Axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
	let data, review;
	try {
		data = await Axios.get(
			`http://10.10.12.3:4000/api/movie/${encodeURIComponent(context.params.title)}`
		)
	} catch (err) {
		return err;
	}
	
	return {
		props: {
			data: data.data[0],
		},
	};
}

const Movie = ({ data, review }) => {
	console.log(data);
	const router = useRouter();
	const { title } = router.query;
	const [ writeReview, setWriteReview ] = useState({
		isHide: false,
		content: '',
	}); // 리뷰 작성 모달 hide/show 토글 및 모달 내용 
	
	const { isHide, content } = writeReview;

	const onChangeReview = (e) => {
		const value = e.target.value;
		setWriteReview({ 
			isHide,
			content: value 
		});
	};

	const onModalView = () => {
		setWriteReview({
			isHide: !isHide,
			content: content
		});
	}

	const onChange  = (e) => {
		e.preventDefault();
	}
	
	return (
		<Layout title={`상세 정보: ${title}`}>
			<Container 
				data={data} 
				write={writeReview}
				onChange={onChangeReview}
				onModalView={onModalView}
				isHide={isHide}
				onChange={onChange}
			/>
		</Layout>
	);
};

const Container = ({ data, onCreate, onChange, onModalView, isHide, onSubmit }) => {
	return (
		<>
			<main className={titleCSS.container}>
				<Article data={data} />
				<content>
					<Titles data={data} />
					<Casting data={data} />
				</content>
			</main>
			<Tasty data={data} />
			<Synopsis data={data} />
			<Trailer data={data} />
			<Review 
				data={data} 
				onModalView={onModalView}
				isHide={isHide}
			>
				<WriteReview 
					onChange={onChange} 
					onSubmit={onSubmit}
					onClick={onModalView}
				/>
			</Review>
		</>
	);
};

const Article = ({ data }) => {
	const { imageFileName, title, degree, runningTime, synopsis } = data;

	return (
		<article className={titleCSS.wrapper}>
			<img
				src={`/imgs/poster/${imageFileName}`}
				alt={title}
				srcSet=''
				className={titleCSS.poster}
			/>
			<div className={titleCSS.runningTime}>
				{degree != 0 ? `${degree}세 관람가` : '등급 심사중'}, {runningTime}분
			</div>
			
		</article>
	);
};

const Tasty = ({ data }) => {
	const { likes, dislikes, runningTime, score } = data;

	return (
		<div>
			<div>
				<div className={titleCSS.tasty}>
					{components.CreateIcon(
						titleCSS.icon,
						faThumbsUp,
						titleCSS.like,
						lib.kFormatter(likes.length)
					)}
					{components.CreateIcon(
						titleCSS.icon,
						faThumbsDown,
						titleCSS.dislike,
						lib.kFormatter(dislikes.length)
					)}
				</div>
			</div>
		</div>
	);
};

const Titles = ({ data }) => {
	const { year, title, enTitle } = data;
	const _year = moment(year).format('YYYY');
	const errText = '제목 정보를 가져오지 못했습니다.';

	return (
		<header className={titleCSS.titleWrap}>
			<h3 className={`${titleCSS.title} ${titleCSS.kr}`}>
				<span>{lib.showText(title, errText)}</span>
			</h3>
			<h6 className={`${titleCSS.title} ${titleCSS.en}`}>
				{lib.showText(enTitle, errText)}, ({_year})
			</h6>
		</header>
	);
};

const Casting = ({ data }) => {
	const { director, casting } = data;

	const list = (v) => {
		return(
			<Link href={`/actor/${v}`}>
				<a style={{ textDecoration: 'none' }}>
				<img
					className={titleCSS.profile}
					src={`/imgs/actor/${v}.jfif`}
					alt={`${v} 프로필 이미지`}
				/>
				<div className={titleCSS.actorName}>{v}</div>
				</a>
			</Link>
		);
	}
	
	return (
		<div className={titleCSS.listWrapper}>
			<h3 className={titleCSS.listName}>감독</h3>
			<ul className={titleCSS.list}>
				{components.List(titleCSS.item, director, list)}
			</ul>
			<h3 className={titleCSS.listName}>출연</h3>
			<ul className={titleCSS.list}>
				{components.List(titleCSS.item, casting, list)}
			</ul>
		</div>
	);
};

const Synopsis = ({data}) => {
	const { synopsis } = data;
	return(
		<div className={titleCSS.synopsis}>
			<h3>줄거리</h3>
			<div>
				<p dangerouslySetInnerHTML={{__html: synopsis ? synopsis : '등록된 줄거리가 없습니다'}}></p>
			</div>
		</div>
	)
}


const Trailer = ({ data }) => {
	return (
		<div className={titleCSS.trailer}>
			<h3>예고편 및 미리보기</h3>
			<div dangerouslySetInnerHTML={{__html: data.trailer}}/>
		</div>
	);
}

const Review = ({ data, review, onModalView, isHide, children }) => {
	const toggleModal = isHide ? { display: 'flex' } : { display: 'none' };
	return (
		<div className={titleCSS.review}>
			<h3>리뷰</h3>
			<div className={titleCSS.reviewBtnWrapper}>
				<button onClick={onModalView}>리뷰 쓰기</button>
			</div>
			<ul className={titleCSS.reviewList}>
				<li>
					<div>리뷰 1</div><div>아이콘</div>
				</li>
				<li>리뷰 2</li>
				<li>리뷰 3</li>
				<li>리뷰 4</li>
				<li>리뷰 5</li>
			</ul>
			<div 
				className={titleCSS.overlay}
				style={toggleModal}
			>
			</div>
			<div 
				className={titleCSS.writeReviewModal}
				style={toggleModal}
			>
				{children}
			</div>
		</div>
	);
};

const WriteReview = ({ onChange, onSubmit, onClick }) => {
	const guideText = '여기에 리뷰를 작성하세요.'
	return (
		<>	
			<form
				action=''
				method='POST'
				onSubmit={onSubmit}
				onChange={onChange}
			>
				<div className={titleCSS.closeModalWrap}>
				<FontAwesomeIcon icon={faTimes} onClick={onClick} />
				</div>
				<h3>리뷰 작성</h3>
				<textarea 
					name='' 
					id='' 
					placeholder={guideText}
				/>

				<button type='submit'>등록</button>
			</form>
		</>
		
	);
};

export default Movie;
