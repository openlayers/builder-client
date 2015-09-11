import React from 'react';

const Define = React.createClass({

  propTypes: {
    onDefine: React.PropTypes.func.isRequired,
    symbol: React.PropTypes.object.isRequired,
    value: React.PropTypes.bool.isRequired
  },

  onCheckboxChange: function(event) {
    this.props.onDefine(this.props.symbol.name, event.target.checked);
  },

  render: function() {
    return (
      <div>
        <label style={{cursor: 'pointer'}}>
          <input
              checked={this.props.value}
              onChange={this.onCheckboxChange}
              type="checkbox"/>
          <code>{this.props.symbol.name}</code>
        </label>
      </div>
    );
  }

});

export default Define;
