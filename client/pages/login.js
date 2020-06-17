import Head from 'next/head';
import React, { Component } from 'react';
import Layout from '../components/Layout'
import login from './login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

class Login extends Component {
  render() {
    return(
      <Layout title={'Login to this page'}>
        <div className={login.container}>
          <Wrapper/>
        </div>
      </Layout>
    );
  }
}

class Wrapper extends Component {
  render() {
    return(
      <div className={login.wrapper}>
        <LoginInputBox/>
        <LoginOption/>
      </div>
    );
  }
}
class LoginInputBox extends Component {
  render () {
    return(
      <div className={login.loginInputBoxWrapper}>
        <div className={login.loginInputBox}>
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
          <div>
            <Link href="/join">
              <a><span>회원 가입</span></a>
            </Link>
            <Link href="/find_account">
              <a><span>계정 찾기</span></a>
            </Link>   
          </div>
        </div>
      </div>
    );
  }
}

class LoginOption extends Component {
  render() {
    return(
      <div className={login.loginOption}>
        1234
      </div>
    );
  }
} 

export default Login;