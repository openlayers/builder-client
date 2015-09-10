import React from 'react';
import Method from './method';

const Class = React.createClass({

  renderMethods: function(methods) {
    if (this.props.collapsed) {
      return null;
    }
    return methods.map(method => (
      <Method key={method.name} symbol={method}/>
    ));
  },

  render: function() {
    return (
      <div>
        <div><code>{this.props.symbol.name}</code></div>
        {this.renderMethods(this.props.symbol.methods)}
      </div>
    );
  }

});

export default Class;
