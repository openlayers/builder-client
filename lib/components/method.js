import React from 'react';

function displayName(name) {
  return '.' + name.split('#').pop() + '()';
}

const Method = React.createClass({

  propTypes: {
    exported: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string.isRequired,
    setSymbols: React.PropTypes.func.isRequired
  },

  onCheckboxChange: function(event) {
    this.props.setSymbols({
      [this.props.name]: event.target.checked
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
          <code>{displayName(this.props.name)}</code>
        </label>
      </div>
    );
  }

});

export default Method;
