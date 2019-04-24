import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      );
    }

    const { title, description } = this.props.stream;

    return (
      <div className="ui piled segment">
        <video
          ref={this.videoRef}
          style={{ width: "100%" }}
          controls={true}
        />
        <div className="ui relaxed divided list">
          <div className="item">
            <Link to="/" className="ui right floated content button">
              Back to list
            </Link>
            <div class="content">
              <div className="ui large header">
                <h1>{title}</h1>
              </div>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);