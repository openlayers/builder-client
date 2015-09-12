import React from 'react';

function displayName(name) {
  return '.' + name.split('#').pop() + '()';
}

const Method = React.createClass({

  propTypes: {
    exported: React.PropTypes.bool.isRequired,
    setSymbols: React.PropTypes.func.isRequired,
    symbol: React.PropTypes.object.isRequired
  },

  onCheckboxChange: function(event) {
    this.props.setSymbols({
      [this.props.symbol.name]: event.target.checked
    })
  },

  render: function() {
    return (
      <div>
        &nbsp;&nbsp;
        <label style={{cursor: 'pointer'}}>
          <input
              checked={this.props.exported}
              onChange={this.onCheckboxChange}
              type="checkbox"/>
          <code>{displayName(this.props.symbol.name)}</code>
        </label>
      </div>
    );
  }

});

export default Method;
