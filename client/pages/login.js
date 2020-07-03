import React, { Component } from 'react';
import Layout from '../components/Layout'
import login from './login.module.css'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

class Login extends Component {
  render() {
    return(
      <Layout 
        title={'Login to this page'}
        childComponent={<Wrapper/>}
      />
    );
  }
}

class Wrapper extends Component {
  render() {
    return(
      <div className={login.container}>
        <div className={login.wrapper}>
          <LoginInputBox/>
          <LoginOption icons={faGoogle}/>
        </div>
      </div>
    );
  }
}
class LoginInputBox extends Component {
  render () {
    return(
      <div className={login.loginInputBoxWrapper}>
        <div className={login.loginInputBox}>
          <form method="post" action="http://10.10.12.3:4000/api/login">
            <div className={login.loginEachInput}>
                <input className="inputInfo" maxLength="20" placeholder="계정이름"/>
            </div>
            <div className={login.loginEachInput}>
              <input className="inputInfo" type="password" maxLength="20" placeholder="비밀번호"/>
              {/* <FontAwesomeIcon icon={faEye}/> */}
            </div>
            <div className={login.loginButton}> 
              <button>로그인</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function LoginOption() {
  return(
    <div className={login.loginOption}>
      <div>
        <Link href="/join">
          <a><span>회원 가입</span></a>
        </Link>
        <Link href="/find_account">
          <a><span>계정 찾기</span></a>
        </Link>
        <div>
          {/* <FontAwesomeIcon icon={faGoogle}/>
          <FontAwesomeIcon icon={faFacebook}/> */}
        </div> 
      </div>
    </div>
  );
} 

export default Login;