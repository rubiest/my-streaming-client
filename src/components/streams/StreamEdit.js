import _ from 'lodash';
import React from 'react';
import { connect } from "react-redux";
import { fetchStream, editStream } from '../../actions';
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      );
    }

    return (
      <div className="ui piled segment">
        <div className="ui inverted segment">
          <h4 className="ui header">Edit Stream Video</h4>
        </div>
        <div className="ui segment">
          <StreamForm
            initialValues={_.pick(this.props.stream, 'title', 'description')}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);