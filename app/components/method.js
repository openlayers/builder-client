import React from 'react';

function displayName(name) {
  return '.' + name.split('#').pop() + '()';
}

const Method = React.createClass({

  onCheckboxChange: function(event) {
    this.props.onExport({
      [this.props.symbol.name]: event.target.checked
    })
  },

  render: function() {
    return (
      <div>
        <label>
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
