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
      terms: '',
    }
    this._handleTerms = this._handleTerms.bind(this);
    this._loadTerms = this._loadTerms.bind(this);
  }
  
  componentDidMount() {
    this._loadTerms();
  }

  _handleTerms() {
    this.setState((state) => {
      return { readTerms: !this.state.readTerms }
    });
  }

  _callTermAPI() {
    return fetch('http://10.10.12.3:4000/api/policy/join_term')
                 .then(response => response.json());
  }

  _loadTerms = async() => {
    const terms = await this._callTermAPI();
    this.setState({
      terms: terms 
    });
  }
  
  render() {
    const joinReq = {
      method: "post",
      url: "http://10.10.12.3:4000/api/login",
      id: 'test',
      password: 'test'
    }
    return(
      <Layout 
        title={'Join to our universe'}
        childComponent={this.state.readTerms===false ? 
          <Terms handleState={this._handleTerms} getTermsProp={this.state.terms}/> : 
          <JoinForm _cancel={this._handleTerms}/> }
      />
    );
  }
}

function JoinForm({ _handleSendReq, _cancel }) {
  return(
    <div>
      <div className={login.loginInputBox}>
        <form method="post">
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
            <button onClick={_handleSendReq}>회원가입</button>
            <button 
              className={login.returnButton}
              onClick={_cancel}
            >약관으로 돌아가기</button>
          </div>
        </form>

      </div>
    </div>
  );
}

function Terms({ handleState, getTermsProp }) {
  return(
    <div>
      <div className={join.readTerms}>
        { getTermsProp ? getTermsProp : 'loading...' }
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
            onClick={handleState}
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