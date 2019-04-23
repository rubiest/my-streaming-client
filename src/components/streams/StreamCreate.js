import React from 'react';
import { Field, reduxForm } from 'redux-form';

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
      <div className={`field ${meta.touched && meta.error ? 'error' : ''}`}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit(formValues) {
    console.log(formValues)
  }

  render(){
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" type="text" component={this.renderInput} label="Title" />
        <Field name="description" type="text" component={this.renderInput} label="Description" />
        <button className="ui button primary">Submit</button>
      </form>
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

export default reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);