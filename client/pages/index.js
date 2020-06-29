import Link from 'next/link';
import Layout from '../components/Layout';
import indexCSS from './index.module.css'


//정적생성
export async function getStaticProps(context) {
  const movieList = await fetch("http://10.10.12.3:4000/api/movie")
                .then(response => response.json());
  
  return {
    props: {
      movieList,
    },
  }
}

function Home({ movieList }) {

  function _renderMovie () {
    const list = movieList.map((data, index) => {
      return(
        <MovieList
          key={index}
          imageFileName={data.imageFileName}
          movieTitle={data.title}
          year={data.year}
          score={data.score}
          runningTime={data.runningTime}
          degree={data.degree}
        />
      );
    })
    return list;
  }

  function _renderMovieComponent() {
    const component = (
      <ul className={indexCSS.movieList}>
        {_renderMovie ? _renderMovie() : 'loading...'}
      </ul>
    )
    return component;
  }

  console.log('Home Component render');
  return (
    <Layout 
      title={'index'} 
      childComponent={ _renderMovieComponent() }
    />
      
  );
}

function MovieList({ index, imageFileName, movieTitle, score, runningTime, degree}) {
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
      <h1>{movieTitle}</h1>
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
