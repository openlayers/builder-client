import React from 'react';

const Func = React.createClass({

  render: function() {
    return (
      <div>
        <label>
          <input type="checkbox"/><code>{this.props.symbol.name}</code>
        </label>
      </div>
    );
  }

});

export default Func;
