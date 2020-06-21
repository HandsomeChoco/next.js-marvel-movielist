import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import index from './index.module.css'
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
    return fetch("http://localhost:4000/api/movie/아이언맨")
    .then(response => response.json());
  
  }

  _getMovies = async() => {
    const movies = await this._callApi();
    this.setState({ movies: movies});
  }
  
  _renderMovies = () => {
    const list = this.state.movies.map((data, index) => {
      return(
        <Movie
          key={index}
          movieTitle={data.title}
          year={data.year}
          mainCasting={data.mainCasting}
          likes={data.like}
          dislikes={data.dislike}
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
        <div className={index.movieList}>
          {this.state.movies.length>0 ? this._renderMovies() : 'nothing to render'}
        </div>
      </Layout>
    );
  }
}

function Movie({ index, movieTitle, year, mainCasting, likes, dislikes, score, runningTime, degree}) {
  return(
    <div key={index}>
      <img src={`/imgs/poster/${movieTitle}.png`} alt={movieTitle} title={movieTitle}/>
      <div>
        <h1>{movieTitle} ({year}) </h1>
      </div>
      <div>
        <p>주연: {mainCasting}</p>
      </div>
      <div>
        <span>좋아요: {likes}</span> <span>싫어요: {dislikes}</span> <span>평점: {score}</span>
        <span>상영시간: {runningTime}분</span> <span>등급: {degree}세 관람가</span>
      </div>
    </div>
  );
}

export default Home;
