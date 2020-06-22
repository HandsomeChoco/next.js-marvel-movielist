import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
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
    this._sendJoinRequest = this._sendJoinRequest.bind(this);

  }
  _handleTerms() {
    this.setState((state) => {
      return { readTerms: !this.state.readTerms }
    });
  }
  _sendJoinRequest() {
    Axios({
      method: "post",
      url: "http://10.10.12.3:4000/api/user/"
    })
  }
  render() {
    return(
      <Layout title={'Join to our universe'}>
        {this.state.readTerms===false ? <Terms confirm={this._handleTerms}/> : <JoinForm cancel={this._handleTerms}/> }
      </Layout>
    );
  }
}

function JoinForm({ cancel }) {
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
          <button className={login.returnButton}
            onClick={cancel}
          >약관으로 돌아가기</button>
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
          <button 
            className={join.joinCancel}
          >취소</button>
        </div>
      </div>
    </div>
  );
}
export default Join;