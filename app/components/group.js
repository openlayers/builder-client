import React from 'react';
import Class from './class';
import Func from './function';

const Group = React.createClass({

  renderClasses: function(classes) {
    return classes.map(symbol => (
      <Class
          collapsed={!this.props.expand[symbol.name]}
          exports={this.props.exports}
          onExport={this.props.onExport}
          key={symbol.name}
          symbol={symbol}/>
    ));
  },

  renderFunctions: function(functions) {
    return functions.map(symbol => <Func key={symbol.name} symbol={symbol}/>);
  },

  render: function() {
    return (
      <section key={this.props.name}>
        <h4>{this.props.name}</h4>
        <p>{this.props.description}</p>
        {this.renderClasses(this.props.classes)}
        {this.renderFunctions(this.props.functions)}
      </section>
    );
  }

});

export default Group;
