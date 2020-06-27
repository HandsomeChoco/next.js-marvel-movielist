import Layout from '../components/Layout';

export default function Custom404() {
  return(
    <Layout
      title={'페이지를 찾을 수 없습니다. '}
      childComponent={<NotFound/>}
    />  
  );
}

function NotFound() {
  return(
      <div>
          <h2>이런! 찾으시는 페이지가 존재하지 않거나 삭제되었습니다.</h2>
          <img src="/imgs/etc/404.png" title="404 에러" alt="404 에러"/>
      </div>
  );
}