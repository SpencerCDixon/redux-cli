import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const propTypes = {
};

class <%= name %> extends Component {
  render() {
    return (

    )
  }
}

const mapStateToProps = (state) => {
  return {};
}
const mapDispatchToProps = (dispatch) => {
  return {};
}

<%= name %>.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= name %>);

