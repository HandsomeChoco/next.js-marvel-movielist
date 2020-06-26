import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import indexCSS from './index.module.css'
import LinesEllipsis from 'react-lines-ellipsis'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      movies: []
    }
    this._callApi = this._callApi.bind(this);
    this._getMovies = this._getMovies.bind(this);
    this._renderMovies = this._renderMovies.bind(this);
  }

  componentDidMount() {
    this._getMovies();
  }

  _callApi = () => {
    return fetch("http://10.10.12.3:4000/api/movie")
    .then(response => response.json());
  }

  _getMovies = async() => {
    const movies = await this._callApi();
    this.setState({ movies: movies});
  }
  
  _renderMovies = () => {
    const list = this.state.movies.map((data, index) => {
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

  render() {
    console.log('Home Component render');
    return (
      <Layout title={'index'}>
        <ul className={indexCSS.movieList}>
          {this.state.movies.length>0 ? this._renderMovies() : 'nothing to render'}
        </ul>
      </Layout>
    );
  }
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
