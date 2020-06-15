import Head from 'next/head';
import React, { Component } from 'react';
import Layout from '../components/Layout'
import login from './login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

class Join extends Component {
  render() {
    return(
      <Layout title={'Join to our universe'}>
        <div>
          <div className={login.loginInputBox}>
            <div className={login.loginEachInput}>
                <input className="inputInfo" maxLength="20" placeholder="계정이름"/>
            </div>

            <div className={login.loginEachInput}>
              <input className="inputInfo" type="password" maxLength="20" placeholder="비밀번호"/>
            </div>
            <div className={login.loginEachInput}>
              <input className="inputInfo" type="password" maxLength="20" placeholder="비밀번호 확인"/>
            </div>

            <div className={login.loginButton}> 
              <button>회원가입</button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Join;