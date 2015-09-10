import React from 'react';

const Define = React.createClass({

  render: function() {
    return (
      <div>
        <label style={{cursor: 'pointer'}}>
          <input type="checkbox"/><code>{this.props.symbol.name}</code>
        </label>
      </div>
    );
  }

});

export default Define;
