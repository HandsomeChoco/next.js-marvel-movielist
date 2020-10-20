import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
import join from './join.module.css';
import login from './login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

// 클래스로 만들어보고 싶어서 클래스 써봄.
class Join extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAbleToAgree: false,
			renderComponent: 'Terms',
			terms: '',
			inputs : {
				id: '',
				password: '',
				passwordCheck: '',
			}
		};
		this._handleAgree = this._handleAgree.bind(this);
		this._loadTerms = this._loadTerms.bind(this);
		this._handleInput = this._handleInput.bind(this);
		this._handleComponent = this._handleComponent.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);

	}

	componentDidMount() {
		this._loadTerms();
	}
	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps, prevState)
	}
	_callTermAPI() {
		return fetch(
			'http://10.10.12.3:4000/api/policy/join_term'
		).then((response) => response.json());
	}
	_loadTerms = async() => {
		const terms = await this._callTermAPI();
		this.setState({
			terms: terms,
		});
	};
	_handleAgree() {
		this.setState({
			isAbleToAgree: !this.state.isAbleToAgree,
		});
	}
	_handleComponent() {
		if(this.state.renderComponent==='Terms') {
			return this.setState({
				renderComponent: 'JoinForm'
			})
		} else return this.setState({
			renderComponent: 'Terms'
		})
	}
	_handleInput(e) {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			inputs: {
				...this.state.inputs,
				[name]: value
			}
		});
	}
	_handleSubmit = async(e) => {
		e.preventDefault();
		const url = `http://10.10.12.3:4000/api/user`;
		await Axios.post(url,{
			id: this.state.inputs.id,
			password: this.state.inputs.password,
			passwordCheck: this.state.inputs.passwordCheck
		});
	}
	_joinCancel = (e) => {
		e.preventDefault();
		this.setState({
			...this.state, 
			renderComponent: 'Terms'
		})
	}
	render() {
		const { terms, isAbleToAgree, renderComponent } = this.state;
		const { id, password, passwordCheck } = this.state.inputs;
		const title = renderComponent === 'JoinForm' ? '회원 정보 입력' : '이용 약관 확인';
		return (
			<Layout title={title}>
				{renderComponent==='JoinForm' ?
					(<JoinForm
						cancel={this._joinCancel}
						onSubmit={this._handleSubmit}
						onChange={this._handleInput}
						id={id}
						password={password}
						passwordChk={passwordCheck}
						handleSubmit={this._handleSubmit}
					/>) 
				:
					(<Terms
						handleComponent={this._handleComponent}
						getTerms={this.state.terms}
						handleAgree={this._handleAgree}
						agreeProp = {this.state.isAbleToAgree}
					/>)	
				}
			</Layout>
		);
	}
}

function JoinForm({
	onSubmit,
	onChange,
	id,
	cancel,
	password,
	passwordCheck,
}) {
	function PwCheck() {
		let pw;
		console.log(password, passwordCheck)
		if (passwordCheck && password) {
			if (password === passwordCheck) {
				pw = '비밀번호가 일치합니다.';
			} else pw = '비밀번호가 일치하지 않습니다.';
		}
		return pw;
	}

	return (
		<div>
			<div className={login.loginInputBox}>
				<form 
					method='post'
					onSubmit={onSubmit}
				>
					<div className={login.loginEachInput}>
						<input
							className='inputInfo'
							name="id"
							maxLength='20'
							placeholder='계정이름'
							onChange={onChange}
							value={id}
						/>
					</div>

					<div className={login.loginEachInput}>
						<input
							className='inputInfo'
							name="password"
							type='password'
							maxLength='20'
							placeholder='비밀번호'
							onChange={onChange}
						/>
					</div>
					<div className={login.loginEachInput}>
						<input
							className='inputInfo'
							name="passwordCheck"
							type='password'
							maxLength='20'
							placeholder='비밀번호 확인'
							onChange={onChange}
						/>
						{PwCheck()}
					</div>

					<div className={login.loginButton}>
						<button type="submit">회원가입</button>
						<button className={login.returnButton} onClick={cancel}>
							약관으로 돌아가기
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function Terms({ handleComponent, getTerms, handleAgree, agreeProp }) {
	const disabled = <button className={join.joinCancel} onClick={() => alert('이용 약관에 동의해 주세요')}>확인</button>;
	const able = <button className={join.joinSubmit} onClick={handleComponent}>확인</button>
	return (
		<div>
			<div className={join.readTerms}>
				{getTerms ? getTerms : '이용 약관을 불러오는 중입니다.'}
			</div>
			<div style={{ padding: '10px 0px' }}>
				<label> {/*라벨 태그에 이벤트 걸면 두 번 실행되니 조심 */}
					<input type={'checkbox'} title={'약관동의'} onClick={handleAgree} /> 
					위의 이용약관에 동의합니다.
				</label>
			</div>
			<div className={join.agreement}>
				<div>
					{ agreeProp ? able : disabled }
					<button className={join.joinCancel}>취소</button>
				</div>
			</div>
		</div>
	);
}
export default Join;
