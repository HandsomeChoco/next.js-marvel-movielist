import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { response } from 'express';

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
