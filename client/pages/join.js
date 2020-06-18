import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import Layout from '../components/Layout';

import join from './join.module.css';
import login from './login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readTerms: false,
      isPossibleToAgree: false,
    }
    this._handleTerms = this._handleTerms.bind(this);
  }
  _handleTerms() {
    this.setState((state) => {
      return { readTerms: !this.state.readTerms }
    });
  }
  render() {
    return(
      <Layout title={'Join to our universe'}>
        {this.state.readTerms===false ? <Terms confirm={this._handleTerms}/> : <JoinForm/> }
      </Layout>
    );
  }
}

function JoinForm() {
  return(
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
  );
}

function Terms({ confirm }) {
  return(
    <div>
      <div className={join.readTerms}>
        이용 약관 블라블라 (API로 바꿀 예정)
      </div>
      <div>
        <label>
          <input type={"checkbox"} title={'약관동의'}/>위의 이용약관에 동의합니다.
        </label>
      </div>
      <div className={join.agreement}>
        <div>
          <button
            className={join.joinSubmit} 
            onClick={confirm}
          >확인</button> 
          <Link href={'/'}>
            <button 
              className={join.joinCancel}
            >취소</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Join;