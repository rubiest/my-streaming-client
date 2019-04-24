import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }

  render(){
    return (
      <div className="ui piled segment">
        <div className="ui inverted segment">
          <h4 className="ui header">Create New Stream Video</h4>
        </div>
        <div className="ui segment">
          <StreamForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate);