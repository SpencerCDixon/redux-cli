import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

export const fields = [];

const validate = (values) => {
  const errors = {};
  return errors;
};

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};

export class <%= name %> extends Component {
  render() {
    const {
      fields: {},
      handleSubmit
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
      </form>
    );
  }
}

<%= name %>.propTypes = propTypes;
<%= name %> = reduxForm({
  form: <%= name %>,
  fields,
  validate
})(<%= name %>);

export default <%= name %>;
