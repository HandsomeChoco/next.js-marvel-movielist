import Link from 'next/link';
import Layout from '../components/Layout';
import indexCSS from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart as borderLessHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as borderHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

export async function getServerSideProps() {
	const movieList = await fetch(
		'http://10.10.12.3:4000/api/movie'
	).then((response) => response.json());

	return {
		props: {
			movieList,
		},
	};
}

const Home = ({ movieList }) => {
	const { movielist } = movieList;
	console.log(movielist)
	const [heart, toggleHeart] = useState({...movieList._id});

	function _renderMovie() {
		const list = movieList.map((data, index) => {
			return (
				<MovieList
					key={index}
					imageFileName={data.imageFileName}
					movieTitle={data.title}
				/>
			);
		});
		return list;
	}

	function _renderMovieComponent() {
		const component = (
			<ul className={indexCSS.movieList}>
				{_renderMovie ? _renderMovie() : 'loading...'}
			</ul>
		);
		return component;
	}

	console.log('Home Component render');
	return <Layout title={'index'}>{_renderMovieComponent()}</Layout>;
};

const MovieList = ({ index, imageFileName, movieTitle }) => {
	console.log('MovieList Component render');
	const heartStyle = {
		color: 'white',
		height: 20,
	}
	return (
		<li className={indexCSS.movieListItem} key={index}>
			<MovieImageAndLinkToMovie
				movieTitle={movieTitle}
				imageFileName={imageFileName}
			/>
			<h1>
				<FontAwesomeIcon icon={borderLessHeart} style={heartStyle}/>&nbsp;
				{movieTitle}
			</h1>
		</li>
	);
};

const MovieImageAndLinkToMovie = ({ movieTitle, imageFileName }) => {
	console.log('MovieImageAndLinkToMovie Component render');
	return (
		<Link href={`/movie/${movieTitle}`}>
			<a>
				<img
					src={`/imgs/poster/${imageFileName}`}
					alt={movieTitle}
					title={movieTitle}
				/>
			</a>
		</Link>
	);
};

export default Home;
