import React from 'react';

function displayName(name) {
  const parts = name.split('#');
  if (parts.length === 1) {
    // constructor
    return 'new ' + name + '()';
  } else {
    return '.' + name.split('#').pop() + '()';
  }
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
          &nbsp;
          <code>{displayName(this.props.name)}</code>
        </label>
      </div>
    );
  }

});

export default Method;
