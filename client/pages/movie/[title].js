import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import titleCSS from './title.module.css';

import moment from 'moment';
import Axios from 'axios';

import FontAwesome, { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import React, {useState, useEffect} from 'react';

export async function getServerSideProps(context) {
  let data, review;
  try {
    data = await fetch(`http://10.10.12.3:4000/api/movie/${encodeURIComponent(context.params.title)}`)
                .then(response => response.json());

    review = await fetch(`http://10.10.12.3:4000/api/review`)
      .then(response => response.json());
  } catch(err) {
    return err;
  }

  return {
    props: { 
      data: data[0],
    }
  }
}

const Movie = ( data, review ) => {
  const router = useRouter();
  const { title } = router.query;
  const movieData = data.data;
  const reviewData = review[0];

  return (
    <Layout 
      title={`상세 정보: ${title}`}
      childComponent={
        <Container
          _movieData={movieData}
        />
      }
    />
  );
}

const Container = (_movieData) => {
  return (
    <div 
      className={titleCSS.container} 
      style={{backgroundImage:`url('/imgs/poster/${_movieData._movieData.imageFileName}')`}}
    >
      <h1>{_movieData._movieData.title}</h1>
    </div>
  );
}

export default Movie;
