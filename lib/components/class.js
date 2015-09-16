import React from 'react';
import Method from './method';

const states = {
  NONE_EXPORTED: 'NONE_EXPORTED',
  SOME_EXPORTED: 'SOME_EXPORTED',
  ALL_EXPORTED: 'ALL_EXPORTED'
};

function getExportedState(methods, symbols) {
  const total = methods.length;
  let count = 0;
  for (let i = 0; i < total; ++i) {
    if (symbols[methods[i].name]) {
      ++count;
    }
  }
  if (count === 0) {
    return states.NONE_EXPORTED;
  } else if (count === total) {
    return states.ALL_EXPORTED;
  } else {
    return states.SOME_EXPORTED;
  }
}

const Class = React.createClass({

  propTypes: {
    collapsed: React.PropTypes.bool.isRequired,
    methods: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    onToggleExpand: React.PropTypes.func.isRequired,
    select: React.PropTypes.string.isRequired,
    setSymbols: React.PropTypes.func.isRequired,
    symbols: React.PropTypes.object.isRequired
  },

  onCheckboxChange: function(event) {
    var exported = event.target.checked;
    var symbols = {};
    this.props.methods.forEach(method => {
      symbols[method.name] = exported;
    });
    this.props.setSymbols(symbols);
  },

  onToggleClick: function(event) {
    this.props.onToggleExpand(this.props.name, this.props.collapsed);
  },

  renderMethods: function(methods) {
    if (this.props.collapsed) {
      return null;
    }
    return methods.map(method => (
      <Method
          exported={!!this.props.symbols[method.name]}
          key={method.name}
          select={this.props.select}
          setSymbols={this.props.setSymbols}
          {...method}/>
    ));
  },

  render: function() {
    const state = getExportedState(this.props.methods, this.props.symbols);
    const checked = state !== states.NONE_EXPORTED;
    const toggle = this.props.collapsed ? '+' : '-';
    return (
      <div>
        <div>
          <label style={{cursor: 'pointer'}}>
            <input
                checked={checked}
                onChange={this.onCheckboxChange}
                type="checkbox"/>
            &nbsp;
            <code>{this.props.name}</code>
          </label>
          &nbsp;&nbsp;
          <span onClick={this.onToggleClick} style={{cursor: 'pointer'}}>
            {toggle}
          </span>
        </div>
        {this.renderMethods(this.props.methods)}
      </div>
    );
  }

});

export default Class;
