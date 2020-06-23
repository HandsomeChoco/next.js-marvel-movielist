import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import movieName from './movieName.module.css';

const Movie = () => {
  const router = useRouter();
  const { movieName } = router.query;
  
  return (
    <Layout 
      title={`상세 정보: ${movieName}`}
      children={<Test children={movieName}/>}
    />
  );
}

function Test({ children }) {
  return(
    <div id={movieName.content_container}>
        {children}
    </div>
  );
}

export default Movie;