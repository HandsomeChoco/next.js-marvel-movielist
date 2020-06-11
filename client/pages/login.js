import Head from 'next/head';
import React, { Component} from 'react';

class Login extends Component {
  render() {
    return(
      <div>
        <div>
          <div>
            <div>ID</div>
              <input/>
          </div>
          <div>
            <div>PASSWORD</div>
            <input/>
          </div>
          <div>
            <button>Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;