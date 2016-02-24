import React, { Component, PropTypes } from 'react';

const propTypes = {
};

class <%= name %> extends Component {
  render() {
    return (
      <% if (topType) { %>
        <<%= topType %>>
        </<%= topType %>>
      <% } %>
    )
  }
}

<%= name %>.propTypes = propTypes;
export default <%= name %>;
