import React from 'react';

class GoogleAuth extends React.Component{
  state = {
    isSignedIn: null
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '629646774991-a5bn4s1t2oujm6pbuebfmrtkv8po8d3c.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button mini">
          <i className="google icon" /> Sign out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button mini">
          <i className="google icon" /> Sign in with Google
        </button>
      )
    }
  }

  render() {
    return(
      <div>{this.renderAuthButton()}</div>
    )
  }
}

export default GoogleAuth;