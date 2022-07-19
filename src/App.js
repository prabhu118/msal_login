import logo from './logo.svg';
import './App.css';
import { config } from './config';
import { Component } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isAuthenticated: false,
      user: {}
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUrl,
        authority: config.authority
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true
      }
    })
  }


  async login() {
    try {
      await this.publicClientApplication.loginPopup({ scopes: config.scopes, prompt: "select_account" }).then(res => {
        console.log(res)
      });
      this.setState({isAuthenticated: true})
    } catch(err) {
      console.log(err)
    }
  }

  async logout() {
    try {
      await this.publicClientApplication.logoutPopup();
    } catch(err) {
      console.log(err)
    }
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <>
          <button onClick={() => this.login()}>Login</button>
          <button onClick={() => this.logout()}>logout</button>
          </>
        </header>
      </div>
    );
  }
}

export default App;
