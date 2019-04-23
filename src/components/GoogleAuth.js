import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component{

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '629646774991-a5bn4s1t2oujm6pbuebfmrtkv8po8d3c.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button mini">
          <i className="google icon" /> Sign out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button mini">
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

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);