import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import indexCSS from './index.module.css'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          like={data.like.length}
          dislike={data.dislike.length}
          score={data.score}
          runningTime={data.runningTime}
          degree={data.degree}
        />
      );
    })
    return list;
  }

  render() {
    return (
      <Layout title={'index'}>
        <div className={indexCSS.movieList}>
          {this.state.movies.length>0 ? this._renderMovies() : 'nothing to render'}
        </div>
      </Layout>
    );
  }
}

function MovieList({ index, imageFileName, movieTitle, year, mainCasting, like, dislike, score, runningTime, degree}) {
  return(
    <div className={indexCSS.movieListItem} key={index}>
      <img src={`/imgs/poster/${imageFileName}`} alt={movieTitle} title={movieTitle}/>
      <div>
        <h1>{movieTitle} ({year}) </h1>
      </div>
      <MovieMainCasting
        mainCasting={ mainCasting }
      />
      <MovieTags
        like={like}
        dislike={dislike}
        score={score}
        runningTime={runningTime}
        degree={degree}
      />
    </div>
  );
}

function MovieMainCasting({ mainCasting }) {
  return(
    <div>
        {mainCasting.map((data, index) => {
          return(
            <span key={index}>
              {data}
            </span>
          );
        })}
    </div>
  );
}
function MovieTags({ like, dislike, score, runningTime, degree}) {
  return (
    <div>
      <span>좋아요: {like}</span> <span>싫어요: {dislike}</span> <span>평점: {score}</span>
      <span>상영시간: {runningTime}분</span> <span>등급: {degree}세 관람가</span>
    </div>
  );
}

export default Home;
