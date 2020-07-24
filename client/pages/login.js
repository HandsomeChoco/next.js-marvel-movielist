import React, { Component } from 'react';
import Layout from '../components/Layout'
import login from './login.module.css'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

export default class Login extends Component {
  render() {
    return(
      <Layout
        title={'login'}
        childComponent={<Test/>}
      />
    )
  }
}

function Test({}) {
  return(
    <div>test</div>
  );
}