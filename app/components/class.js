import React from 'react';
import Method from './method';

const states = {
  NONE_EXPORTED: 'NONE_EXPORTED',
  SOME_EXPORTED: 'SOME_EXPORTED',
  ALL_EXPORTED: 'ALL_EXPORTED'
};

function getExportedState(symbol, exports) {
  const total = symbol.methods.length + 1;
  let count = exports[symbol.name] ? 1 : 0;
  for (let i = 0, ii = total - 1; i < ii; ++i) {
    if (exports[symbol.methods[i].name]) {
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

  onCheckboxChange: function(event) {
    var exported = event.target.checked;
    var values = {};
    this.props.symbol.methods.forEach(method => {
      values[method.name] = exported;
    });
    values[this.props.symbol.name] = exported;
    this.props.onExport(values);
  },

  onToggleClick: function(event) {
    this.props.onToggleExpand(this.props.symbol.name, this.props.collapsed);
  },

  renderMethods: function(methods) {
    if (this.props.collapsed) {
      return null;
    }
    return methods.map(method => (
      <Method
          exported={!!this.props.exports[method.name]}
          key={method.name}
          onExport={this.props.onExport}
          symbol={method}/>
    ));
  },

  render: function() {
    const state = getExportedState(this.props.symbol, this.props.exports);
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
            <code>{this.props.symbol.name}</code>
          </label>
          &nbsp;&nbsp;
          <span onClick={this.onToggleClick} style={{cursor: 'pointer'}}>
            {toggle}
          </span>
        </div>
        {this.renderMethods(this.props.symbol.methods)}
      </div>
    );
  }

});

export default Class;
