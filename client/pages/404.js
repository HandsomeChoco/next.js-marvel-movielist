import Layout from '../components/Layout';
import notFound from './404.module.css'
export default function Custom404() {
  return(
    <Layout
      title={'페이지를 찾을 수 없습니다.'}
      childComponent={<NotFound/>}
    />  
  );
}

function NotFound() {
  return(
      <div className={notFound.notFoundWrapper}>
          <h1 className={notFound.statusCode}>404</h1>
          <img className={notFound.wtf} src="/imgs/etc/404.png" title="404 에러" alt="404 에러"/>

          <h1 className={notFound.errorMessage}>페이지가 존재하지 않거나 삭제되었습니다.</h1>
      </div>
  );
}