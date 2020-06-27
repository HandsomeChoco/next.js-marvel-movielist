import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import indexCSS from './index.module.css'
import LinesEllipsis from 'react-lines-ellipsis'

export async function getStaticProps(context) {
  const posts = await fetch("http://10.10.12.3:4000/api/movie").then(response => response.json());
  
  return {
    props: {
      posts,
    },
  }
}
function Home({ posts }) {
  function _renderMovie () {
    const list = posts.map((data, index) => {
      return(
        <MovieList
          key={index}
          imageFileName={data.imageFileName}
          movieTitle={data.title}
          year={data.year}
          mainCasting={data.mainCasting}
          score={data.score}
          runningTime={data.runningTime}
          degree={data.degree}
        />
      );
    })
    return list;
  }

  console.log('Home Component render');
  return (
    <Layout title={'index'}>
      <ul className={indexCSS.movieList}>
        {_renderMovie ? _renderMovie() : 'loading...'}
      </ul>
    </Layout>
  );
}

function MovieList({ index, imageFileName, movieTitle, mainCasting, score, runningTime, degree}) {
  console.log('MovieList Component render')
  return(
    <li className={indexCSS.movieListItem} key={index}>
      <MovieImageAndLinkToMovie 
        movieTitle={movieTitle} 
        imageFileName={imageFileName}
      />
      <MovieInfo movieTitle={movieTitle}/>
      <MovieTags
        score={score}
        runningTime={runningTime}
        degree={degree}
      />
      <MovieMainCasting mainCasting={ mainCasting }/>
    </li>
  );
}

function MovieImageAndLinkToMovie({ movieTitle, imageFileName }) {
  console.log('MovieImageAndLinkToMovie Component render');
  return(
    <Link href={`/movie/${movieTitle}`}>
      <a>
        <img src={`/imgs/poster/${imageFileName}`} alt={movieTitle} title={movieTitle}/>
      </a>
    </Link>
  );
} 

function MovieInfo({ movieTitle }) {
  console.log('MovieInfo Component render')
  return(
      <LinesEllipsis 
        text={movieTitle}
        maxLine="1"
        ellipsis=".."
        trimRight="true"
        basedOn="letters"
        component="h1"
      />

  );  
}

function MovieMainCasting({ mainCasting }) {
  console.log('MovieMainCasting Component render')
  const iterlateCasting = function() {
    const list = mainCasting.map((data, index) => {
      return(
        <span key={index}>
          {data}
        </span>
      );
    });
    return list;
  }

  return(
    <div className={indexCSS.casting}>
      {iterlateCasting()}
    </div>
  );
}

function MovieTags({ score, runningTime, degree }) {
  console.log('MovieTags Component render')
  return (
    <div className={indexCSS.movieMetaData}>
      <div>평점: {score}</div> <div>{runningTime}분</div> 
      <div className={indexCSS.degree}>등급: {degree}세 관람가</div>
    </div>
  );
}

export default Home;
