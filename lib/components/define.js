import React from 'react';

const Define = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    onDefine: React.PropTypes.func.isRequired,
    value: React.PropTypes.bool.isRequired
  },

  onCheckboxChange: function(event) {
    this.props.onDefine({
      [this.props.name]: event.target.checked
    });
  },

  render: function() {
    return (
      <div>
        <label style={{cursor: 'pointer'}}>
          <input
              checked={this.props.value}
              onChange={this.onCheckboxChange}
              type="checkbox"/>
          &nbsp;
          <code>{this.props.name}</code>
        </label>
      </div>
    );
  }

});

export default Define;
