import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {
      }
    }
  }
  componentDidMount() {
    console.log('mount')
    this._getMovies();
  }

  _callApi = () => {
    return fetch("http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=f013d6a4c9843733eb242b86c4968d95&movieNm=%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4")
    .then(response => response.json());
  
  }

  _getMovies = async() => {
    const movies = await this._callApi();
    this.setState({ movies: movies});
  }
  
  _renderMovie = () => {
    return(
      <div>
        {this.state.movies.movieListResult.movieList.map((data, index) => {
          <div key={index}>
            {data}
          </div>
        })}
      </div>
    );
  }
  render() {
    return (
      <Layout title={'index'}>
        {this.state.movies.movieListResult ? this._renderMovie() : 'nothing to render'}
      </Layout>
    );
  }
}

export default Home;
