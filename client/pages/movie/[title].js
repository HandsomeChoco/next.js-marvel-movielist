import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import titleCSS from './title.module.css';
import moment from 'moment';

export async function getServerSideProps(context) {
  const data = await fetch(`http://10.10.12.3:4000/api/movie/${encodeURIComponent(context.params.title)}`)
               .then(response => response.json());
  return {
    props: { 
      data,
    }
  }
}

const Movie = ( data ) => {
  const router = useRouter();
  const { title } = router.query;
  const movieData = data.data[0];
  console.log(movieData)
  return (
    <Layout 
      title={`상세 정보: ${title}`}
      childComponent={
        <ChildOfLayout 
          prop={movieData}
        />
      }
    />
  );
}


function ChildOfLayout({ prop }) {
  return(
    <div id={titleCSS.contentContainer}>
      <div className={titleCSS.movieMetaDataWrapper}>
        <MoviePoster _movieTitle={prop.title} _path={prop.imageFileName}/>
        <MovieInfo 
          _title={prop.title} 
          _enTitle={prop.enTitle}
          _year={prop.year}
          _degreeIcon={prop.degree}
          _director={prop.director}
          _likesCount={prop.likes.length}
          _dislikesCount={prop.dislikes.length}
          _score={prop.score}
          _runningTime={prop.runningTime}
          _casting={prop.casting}
        />
      </div>
    </div>
  );
}

function MoviePoster({ _path, _movieTitle }) {
  return (
    <div className={titleCSS.moviePoster}>
      <div>
        <img src={`/imgs/poster/${_path}`} alt={_movieTitle} title={_movieTitle+' 포스터'} />
      </div>
    </div>
  );
}

// degreeIcon 의 css 는 글로벌 스타일에 _12, _15, _18, _all 로 정의되어 있음.
function MovieInfo({ _title, _enTitle, _year, _degreeIcon, _director, _likesCount, _dislikesCount, _score, _runningTime, _casting }) {
  return(
    <div className={titleCSS.movieData}>
      <MovieTitleAndDegree
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

function MovieTitleAndDegree({ __degreeIcon, __title, __enTitle, __year }) {
  const year = moment(__year).format('YYYY');
  return(
    <>
      <h1> 
        <span className={"degree " + "_" + __degreeIcon}>
          {__degreeIcon}
        </span> 
        {__title}
      </h1>
      <div className={titleCSS.subTitle}>
        {__enTitle}, {year}
      </div>
    </>
  );
}

function MovieMetaData({ __likes, __dislikes, __director, __score, __runningTime, __casting }) {
  function loopListWithPicOrNot(prop, renderImage) {
    
    const list = prop.map((data, index) => {
      return(
        <Link href={`/actor/${data}`} key={index}>
          <a className={titleCSS.casting}>
            <li>
              <div>
                {renderImage ? 
                  <img 
                    alt={data} 
                    src={`/imgs/actor/${data}.jfif`} 
                    className={titleCSS.profilePic}
                  /> : null
                }
                
                <div className={titleCSS.actorName} title={data}>
                  {data}
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
      <div>감독: <ul className={titleCSS.directorList}>{loopListWithPicOrNot(__director)}</ul></div>
      <div>좋아요: {__likes} 싫어요: {__dislikes}</div>
      <div></div>
      <div>평점: {__score}</div>
      <div>상영시간: {__runningTime}분</div>
      <div>출연진: <ul className={titleCSS.castingList}>{loopListWithPicOrNot(__casting, true)}</ul></div>
    </div>
  );
}

export default Movie;