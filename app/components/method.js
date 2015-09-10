import React from 'react';

function displayName(name) {
  return '.' + name.split('#').pop() + '()';
}

const Method = React.createClass({

  render: function() {
    return (
      <div><code>{displayName(this.props.symbol.name)}</code></div>
    );
  }

});

export default Method;
