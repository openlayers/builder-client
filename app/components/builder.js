import React from 'react';
import {connect} from 'react-redux';
import Define from './define';
import Group from './group';
import {setExports} from '../actions';

const Builder = React.createClass({

  onExport: function(values) {
    this.props.dispatch(setExports(values));
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
        {defines.map(define => <Define key={define.name} symbol={define}/>)}
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
