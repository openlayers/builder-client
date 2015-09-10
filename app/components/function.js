import React from 'react';

const Func = React.createClass({

  render: function() {
    return (
      <div><code>{this.props.symbol.name}</code></div>
    );
  }

});

export default Func;
