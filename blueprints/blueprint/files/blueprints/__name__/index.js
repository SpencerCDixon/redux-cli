module.exports = {
  <% if (description) { %>
  description: function() {
    return '<%- description %>';
  },
  <% } %>
  <% if (command) { %>
  command: {
    aliases: <%- aliases %>,
    options: {
      opt: {
        alias: 'o',
        description: 'blueprint option',
        type: 'string'
      }
    },
    check: (argv, options) => true,
    examples: [],
    sanitize: argv => argv
  },
  <% } %>
  <% if (locals) { %>
  locals(options) {
    // Return custom template variables here
    return {};
  },
  <% } %>
  <% if (fileMapTokens) { %>
  fileMapTokens: function(options) {
    // Return custom tokens to be replaced in path and file names
    return {
      __token__: function(options) {
        // logic to determine value goes here
        return 'value';
      },
    };
  },
  <% } %>
  <% if (beforeInstall) { %>
  beforeInstall: function(options, locals) {},
  <% } %>
  <% if (afterInstall) { %>
  afterInstall: function(options) {},
  <% } %>
};
