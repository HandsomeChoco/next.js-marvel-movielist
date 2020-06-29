import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import titleCSS from './title.module.css';

export async function getServerSideProps(context) {
  const data = await fetch(`http://10.10.12.3:4000/api/movie/${encodeURIComponent(context.params.title)}`)
               .then(response => response.json());
  return {
    props: { 
      data,
    }
  }
}

const Movie = ( data ) => {
  const router = useRouter();
  const { title } = router.query;
  const movieData = data.data[0];
  console.log(movieData)
  return (
    <Layout 
      title={`상세 정보: ${title}`}
      childComponent={
        <ChildOfLayout 
          children={movieData.title} 
          path={movieData.imageFileName}
          degree={movieData.degree}
        />
      }
    />
  );
}

function ChildOfLayout({ children, path, degree }) {
  return(
    <div id={titleCSS.contentContainer}>
      <div className={titleCSS.movieMetaDataWrapper}>
        <MoviePoster movieTitle={children} path={path}/>
        <MovieInfo 
          children={children} 
          degreeIcon={degree}
        />
      </div>
    </div>
  );
}

function MoviePoster({ path, movieTitle }) {
  return (
    <div className={titleCSS.moviePoster}>
      <div>
        <img src={`/imgs/poster/${path}`} alt={movieTitle} title={movieTitle+' 포스터'} />
      </div>
    </div>
  );
}

// degreeIcon 의 css 는 글로벌 스타일에 적용되어 있음.
function MovieInfo({ children, degreeIcon, likesCount, dislikesCount, scoreData, castingData }) {
  return(
    <div className={titleCSS.movieData}>
      <div>
        <h1>
          <div className={'_'+degreeIcon}>
            <span>{degreeIcon}</span>
          </div>   {children}
        </h1>
      </div>
      <MovieMetaData
        likes={likesCount}
        dislikes={dislikesCount}
        score={scoreData}
        casting={castingData}
      />
    </div>
  );
}

function MovieMetaData({ likes, dislikes, score, casting }) {
  return(
    <div>
      <div>좋아요: {likes}</div>
      <div>싫어요: {dislikes}</div>
      <div>평점: {score}</div>
      <div>출연진: {casting}</div>
    </div>
  );
}

export default Movie;