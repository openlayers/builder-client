import React from 'react';

function displayName(name) {
  return '.' + name.split('#').pop() + '()';
}

const Method = React.createClass({

  render: function() {
    return (
      <div>
        <label>
          <input type="checkbox"/><code>{displayName(this.props.symbol.name)}</code>
        </label>
      </div>
    );
  }

});

export default Method;
