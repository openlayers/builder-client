import React from 'react';

const Func = React.createClass({

  propTypes: {
    exported: React.PropTypes.bool.isRequired,
    onExport: React.PropTypes.func.isRequired,
    symbol: React.PropTypes.object.isRequired
  },

  onCheckboxChange: function(event) {
    this.props.onExport({
      [this.props.symbol.name]: event.target.checked
    })
  },

  render: function() {
    return (
      <div>
        <label style={{cursor: 'pointer'}}>
          <input
              checked={this.props.exported}
              onChange={this.onCheckboxChange}
              type="checkbox"/>
          <code>{this.props.symbol.name}()</code>
        </label>
      </div>
    );
  }

});

export default Func;
