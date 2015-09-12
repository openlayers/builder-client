import React from 'react';
import Class from './class';
import Func from './function';

const Group = React.createClass({

  propTypes: {
    classes: React.PropTypes.array.isRequired,
    expand: React.PropTypes.object.isRequired,
    functions: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    onToggleExpand: React.PropTypes.func.isRequired,
    setSymbols: React.PropTypes.func.isRequired,
    symbols: React.PropTypes.object.isRequired
  },

  renderClasses: function(classes) {
    return classes.map(symbol => (
      <Class
          collapsed={!this.props.expand[symbol.name]}
          key={symbol.name}
          onToggleExpand={this.props.onToggleExpand}
          setSymbols={this.props.setSymbols}
          symbol={symbol}
          symbols={this.props.symbols}/>
    ));
  },

  renderFunctions: function(functions) {
    return functions.map(symbol => (
      <Func
          exported={!!this.props.symbols[symbol.name]}
          key={symbol.name}
          setSymbols={this.props.setSymbols}
          symbol={symbol}/>
    ));
  },

  render: function() {
    return (
      <section key={this.props.name}>
        <h4>{this.props.name}</h4>
        {this.renderClasses(this.props.classes)}
        {this.renderFunctions(this.props.functions)}
      </section>
    );
  }

});

export default Group;
