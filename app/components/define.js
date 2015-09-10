import React from 'react';

const Define = React.createClass({

  render: function() {
    return (
      <div><code>{this.props.symbol.name}</code></div>
    );
  }

});

export default Define;
