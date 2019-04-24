import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link className="ui button tiny primary" to={`/streams/edit/${stream.id}`}>EDIT</Link>
          <Link className="ui button tiny red" to={`/streams/delete/${stream.id}`}>DELETE</Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon video" />
          <div className="content">
            <div className="header">{stream.title}</div>
            <div className="description">
              <p>{stream.description}</p>
            </div>
          </div>
        </div>
      );
    })
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
          <Link
            to="/streams/new"
            className="ui right floated button primary mini"
          >
            Create Stream
          </Link>
      );
    }
  }

  render() {
    return (
      <div className="ui piled segment">
        <div className="ui inverted clearing segment" style={{height: '57px'}}>
          <h3 className="ui left floated header">Stream List</h3>
          {this.renderCreate()}
        </div>
        <div className="ui segment">
          <div className="ui relaxed divided list">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);