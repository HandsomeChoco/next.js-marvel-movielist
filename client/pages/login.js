import Head from 'next/head';
import React, { Component } from 'react';
import Layout from '../components/Layout'
import login from './login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

class Login extends Component {
  render() {
    return(
      <Layout title={'Login to this page'}>
        <div className={login.loginModuleWrapper}>
          <div className={login.loginInputBox}>
            <div className={login.loginEachInput}>
                <input className="inputInfo" maxLength="20" placeHolder="계정이름"/>
            </div>
            <div className={login.loginEachInput}>
              <input className="inputInfo" type="password" maxLength="20" placeHolder="비밀번호"/>
              {/* <FontAwesomeIcon icon={faEye}/> */}
            </div>
            <div className={login.loginButton}> 
              <button>Login</button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Login;