import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderError({ error, touched}) {
    if(touched && error) {
      return (
        <div className="ui pointing red basic label">
          {error}
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div className={`field required ${meta.touched && meta.error ? 'error' : ''}`}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  renderTextArea = ({ input, label, meta }) => {
    return (
      <div className={`field required ${meta.touched && meta.error ? 'error' : ''}`}>
        <label>{label}</label>
        <textarea {...input} autoComplete="off" rows="4" />
        {this.renderError(meta)}
      </div>
    )
  }

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
          <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="title" type="text" component={this.renderInput} label="Title" />
            <Field name="description" type="text" component={this.renderTextArea} label="Description" />
            <button className="ui button primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title){
    errors.title = "You must enter a title!"
  }

  if (!formValues.description) {
    errors.description = "You must enter a description!"
  }

  return errors;
}

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);

export default connect(
  null,
  { createStream }
)(formWrapped);