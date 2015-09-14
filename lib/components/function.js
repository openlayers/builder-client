import React from 'react';

const Func = React.createClass({

  propTypes: {
    exported: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string.isRequired,
    search: React.PropTypes.string.isRequired,
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
        <label style={{cursor: 'pointer'}}>
          <input
              checked={this.props.exported}
              onChange={this.onCheckboxChange}
              type="checkbox"/>
          &nbsp;
          <code>{this.props.name}()</code>
        </label>
      </div>
    );
  }

});

export default Func;
