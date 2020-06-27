import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import movieName from './movieName.module.css';

// export async function getServerSideProps(context) {
//   const movieName = '아이언맨';
//   const data = await fetch(`http://10.10.12.3:4000/api/movie/${encodeURIComponent(movieName)}`)
//                .then(response => response.json());
//   return {
//     props: { 
//       data,
//     }
//   }
// }

const Movie = () => {
  const router = useRouter();
  const { movieName } = router.query;
  const [ movieTitle ] = useState(movieName);
 
  return (
    <Layout 
      title={`상세 정보: ${movieName}`}
      childComponent={<ChildOfLayout children={movieName} />}
    />
  );
}

function ChildOfLayout({ children }) {
  return(
    <div id={movieName.contentContainer}>
      <div className={movieName.movieMetaDataWrapper}>
        <MoviePoster children={children}/>
        <MovieMetaData children={children}/>
      </div>
    </div>
  );
}

function MoviePoster({ children }) {
  return (
    <div className={movieName.moviePoster}>
      <div>
        <img src={`/imgs/poster/${children}.png`} alt={children} title={children+' 포스터'} />
      </div>
    </div>
  );
}

function MovieMetaData({ children }) {
  return(
    <div className={movieName.movieData}>
      <div>
        <h1>
          {children}
        </h1>
        <div>좋아요</div>
        <div>싫어요</div>
        <div>평점</div>
        <div>출연진</div>
      </div>
    </div>
  );
}

export default Movie;