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
			password: '',
			passwordCheck: '',
		};
		// this._handleTerms = this._handleTerms.bind(this);
		this._loadTerms = this._loadTerms.bind(this);
		this._handlePassWord = this._handlePassWord.bind(this);
		this._handlePassWordCheck = this._handlePassWordCheck.bind(this);
	}

	componentDidMount() {
		this._loadTerms();
	}

	_handleTerms = () => {
		this.setState({
			readTerms: !this.state.readTerms,
		});
	};
	_handleAgree(e) {
		this.setState({
			isPossibleToAgree: !this.state.isPossibleToAgree,
		});
	}
	_callTermAPI() {
		return fetch(
			'http://10.10.12.3:4000/api/policy/join_term'
		).then((response) => response.json());
		console.log(response);
	}
	_loadTerms = async () => {
		const terms = await this._callTermAPI();
		this.setState({
			terms: terms,
		});
	};
	_handlePassWord(e) {
		this.setState({
			password: e.target.value,
		});
	}
	_handlePassWordCheck(e) {
		this.setState({
			passwordCheck: e.target.value,
		});
	}
	render() {
		return (
			<Layout
				title={'Join to our universe'}
				childComponent={
					this.state.readTerms === false ? (
						<Terms
							handleState={this._handleTerms}
							getTermsProp={this.state.terms}
						/>
					) : (
						<JoinForm
							_cancel={this._handleTerms}
							handlePassWord={this._handlePassWord}
							handleValidPassWord={this._handlePassWordCheck}
							passwordProp={this.state.password}
							passwordCheckProp={this.state.passwordCheck}
						/>
					)
				}
			/>
		);
	}
}

function JoinForm({
	handleSendReq,
	handlePassWord,
	handleValidPassWord,
	cancel,
	passwordProp,
	passwordCheckProp,
}) {
	function PwCheck() {
		let pw;
		if (passwordCheckProp && passwordProp) {
			if (passwordProp === passwordCheckProp) {
				pw = '비밀번호가 일치합니다.';
			} else pw = '비밀번호가 일치하지 않습니다.';
		}
		return pw;
	}

	return (
		<div>
			<div className={login.loginInputBox}>
				<form method='post'>
					<div className={login.loginEachInput}>
						<input
							className='inputInfo'
							maxLength='20'
							placeholder='계정이름'
						/>
					</div>

					<div className={login.loginEachInput}>
						<input
							className='inputInfo'
							type='password'
							maxLength='20'
							placeholder='비밀번호'
							onChange={handlePassWord}
						/>
					</div>
					<div className={login.loginEachInput}>
						<input
							className='inputInfo'
							type='password'
							maxLength='20'
							placeholder='비밀번호 확인'
							onChange={handleValidPassWord}
						/>
						{PwCheck()}
					</div>

					<div className={login.loginButton}>
						<button onClick={handleSendReq}>회원가입</button>
						<button className={login.returnButton} onClick={cancel}>
							약관으로 돌아가기
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function Terms({ handleState, getTermsProp }) {
	return (
		<div>
			<div className={join.readTerms}>
				{getTermsProp ? getTermsProp : 'loading...'}
			</div>
			<div>
				<label>
					<input type={'checkbox'} title={'약관동의'} />
					위의 이용약관에 동의합니다.
				</label>
			</div>
			<div className={join.agreement}>
				<div>
					<button className={join.joinSubmit} onClick={handleState}>
						확인
					</button>
					<button className={join.joinCancel}>취소</button>
				</div>
			</div>
		</div>
	);
}
export default Join;
