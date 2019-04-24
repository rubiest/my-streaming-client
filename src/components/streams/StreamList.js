import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <button className="ui button tiny primary">EDIT</button>
          <button className="ui button tiny red">DELETE</button>
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

  render() {
    return (
      <div className="ui piled segment">
        <div className="ui inverted segment">
          <h4 className="ui header">Stream List</h4>
        </div>
        <div className="ui segment">
          <div className="ui relaxed divided list">
            {this.renderList()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId
  }
}

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);