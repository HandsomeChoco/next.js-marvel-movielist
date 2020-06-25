import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import movieName from './movieName.module.css';

const Movie = () => {
  const router = useRouter();
  const { movieName } = router.query;
  
  fetch(`http://10.10.12.3:4000/api/movie/`);
  return (
    <Layout 
      title={`상세 정보: ${movieName}`}
      children={<ChildOfLayout children={movieName}/>}
    />
  );
}

function ChildOfLayout({ children }) {
  return(
    <div id={movieName.contentContainer}>
      <div className={movieName.movieMetaDataWrapper}>
        <img src="/imgs/poster/아이언맨.png" alt={children} title={children+' 포스터'} className={movieName.moviePoster}/>
        <div className={movieName.movieData}>
          <h1>
            {children} year
          </h1>
        </div>
      </div>
      
    </div>
  );
}

export default Movie;