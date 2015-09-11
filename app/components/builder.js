import React from 'react';
import {connect} from 'react-redux';
import Define from './define';
import Group from './group';
import {expandItem, setDefine, setExports} from '../actions';

const Builder = React.createClass({

  onExport: function(values) {
    this.props.dispatch(setExports(values));
  },

  onToggleExpand: function(name, expanded) {
    this.props.dispatch(expandItem(name, expanded));
  },

  onDefine: function(name, value) {
    this.props.dispatch(setDefine(name, value));
  },

  renderGroups: function(groups) {
    if (!groups) {
      return null;
    }
    return groups.map(group => (
      <Group
          expand={this.props.expand}
          exports={this.props.exports}
          onExport={this.onExport}
          onToggleExpand={this.onToggleExpand}
          key={group.name}
          {...group}/>
    ));
  },

  renderDefines: function(defines) {
    if (!defines) {
      return null;
    }
    return (
      <section>
        <h4>Flags</h4>
        {defines.map(define => {
          let value = define.default;
          if (define.name in this.props.defines) {
            value = this.props.defines[define.name];
          }
          return (
            <Define
                key={define.name}
                onDefine={this.onDefine}
                symbol={define}
                value={value}/>
          );
        })}
      </section>
    );
  },

  render: function() {
    console.log(this.props);
    return (
      <div>
        <h3>Choose what to include in your build</h3>
        {this.renderGroups(this.props.info.groups)}
        {this.renderDefines(this.props.info.defines)}
      </div>
    );
  }

});

export default connect(state => state)(Builder);
