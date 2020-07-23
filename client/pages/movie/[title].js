import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import titleCSS from './title.module.css';

import moment from 'moment';
import Axios from 'axios';

import FontAwesome, { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import React, {useState} from 'react'

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
      data,
    }
  }
}

const Movie = ( data, review ) => {
  const router = useRouter();
  const { title } = router.query;
  const movieData = data.data[0];
  const reviewData = review[0];
  return (
    <Layout 
      title={`상세 정보: ${title}`}
      childComponent={
        <ChildOfLayout 
          prop={movieData}
          //review={review}
        />
      }
    />
  );
}


function ChildOfLayout({ prop, review }) {
  return(
    <div>
      <div className={titleCSS.movieMetaDataWrapper}>
        <MoviePoster _movieTitle={prop.title} _path={prop.imageFileName} _degreeIcon={prop.degree}/>
        <MovieInfo 
          _id={prop._id}
          _title={prop.title} 
          _enTitle={prop.enTitle}
          _year={prop.year}
          _director={prop.director}
          _likesCount={prop.likes.length}
          _dislikesCount={prop.dislikes.length}
          _score={prop.score}
          _runningTime={prop.runningTime}
          _casting={prop.casting}
        />
      </div>
      <div className={titleCSS.subTitle}/>
      <Review/>
    </div>
  );
}

function MoviePoster({ _path, _movieTitle, _degreeIcon }) {
  function getColor(age) {
    let color;
    if(age==='all') {
      color='#3fa449';
    } else if (age==12) {
      color='#22a2dc';
    } else if (age==15) {
      color='#efa126';
    } else if (age==18) {
      color='#cb2126';
    }
    return color;
  }
  return (
    <div className={titleCSS.moviePoster}>
      <div>
        <span className={titleCSS.degree} style={{backgroundColor:getColor(_degreeIcon)}}>
          <b>{_degreeIcon}</b>
        </span>
        <img src={`/imgs/poster/${_path}`} alt={_movieTitle} title={_movieTitle+' 포스터'} />
      </div>
    </div>
  );
}

function MovieInfo({ _id, _title, _enTitle, _year, _degreeIcon, _director, _likesCount, _dislikesCount, _score, _runningTime, _casting }) {
  return(
    <div className={titleCSS.movieData}>
      {_id ? <input type="hidden" name="movieId" value={_id}/> : ''}
      <MovieTitle
        __degreeIcon={_degreeIcon}
        __title={_title}
        __enTitle={_enTitle}
        __year={_year}
      />
      <MovieMetaData
        __likes={_likesCount}
        __dislikes={_dislikesCount}
        __director={_director}
        __score={_score}
        __runningTime={_runningTime}
        __casting={_casting}
      />
    </div>
  );
}

function MovieTitle({__title, __enTitle, __year }) {
  const year = moment(__year).format('YYYY');
  return(
    <div>
      <h1> 
        {__title}
      </h1>
      <div className={titleCSS.subTitle}>
        {__enTitle}, {year}
      </div>
    </div>
  );
}

function MovieMetaData({ __likes, __dislikes, __director, __score, __runningTime, __casting }) {
  function loopListWithPicOrNot(prop) {
    const list = prop.map((v, index) => {
      return(
        <Link href={`/actor/${v}`} key={index}>
          <a className={titleCSS.casting}>
            <li>
              <div>
                <img 
                  alt={v} 
                  src={`/imgs/actor/${v}.jfif`} 
                  className={titleCSS.profilePic}
                />
                <div className={titleCSS.actorName} title={v}>
                  {v}
                </div>
              </div>
              
            </li>
          </a>
        </Link>
      );
    })
    return list;
  }
  
  return(
    <div className={titleCSS.movieMetaData}>
      <div>감독: <ul className={titleCSS.directorUL}>{loopListWithPicOrNot(__director)}</ul></div>
      <div className={titleCSS.tasty}>
        <FontAwesomeIcon icon={faThumbsUp} className={titleCSS.likes}/> {__likes} 
        <FontAwesomeIcon icon={faThumbsDown} className={titleCSS.dislikes}/> {__dislikes}
      </div>
      
      <div className={titleCSS.movieInfo}>
        <div>평점: {__score}</div>
        <div>상영시간: {__runningTime}분</div>
        <div>출연진: <ul className={titleCSS.castingUL}>{loopListWithPicOrNot(__casting, true)}</ul></div>
      </div>
    </div>
  );
}

function Review({ }) {
  return(
    <div>
      <ul>
        <li>영화리뷰</li>
        <li>영화리뷰</li>
        <li>영화리뷰</li>
        <li>영화리뷰</li>
        <li>영화리뷰</li>
      </ul>
      <WriteReview/>
    </div>
  );
}

function WriteReview() {
  const [review, setReview ] = useState(''); // hook

  return(
    <form 
      action="/api/comment" 
      method="POST"
      onSubmit={(e) => {e.preventDefault();}}
      className={titleCSS.reviewForm}
    > 
      <div className={titleCSS.writeReviewWrapper}>
        <textarea 
          placeholder={'리뷰를 작성해볼까요?'}
          onChange={(e)=> {setReview(e.target.value);}}
        />
        <button type="submit" className={titleCSS.submitBtn}>작성</button>
      </div>
      
      <div>
        {review.length}/300
      </div>
    </form>
  );
}

export default Movie;