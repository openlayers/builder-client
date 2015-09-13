import React from 'react';
import {connect} from 'react-redux';
import util from 'openlayers-builder-util';
import Define from './define';
import Group from './group';
import {expandItem, createJob, setDefines, setSymbols} from '../actions';

const Builder = React.createClass({

  propTypes: {
    build: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    expand: React.PropTypes.object.isRequired,
    info: React.PropTypes.object.isRequired,
    job: React.PropTypes.object.isRequired
  },

  setSymbols: function(symbols) {
    this.props.dispatch(setSymbols(symbols));
  },

  onToggleExpand: function(name, expanded) {
    this.props.dispatch(expandItem(name, expanded));
  },

  onDefine: function(defines) {
    this.props.dispatch(setDefines(defines));
  },

  createJobJob: function() {
    this.props.dispatch(createJob(this.props.build, this.props.info));
  },

  renderBuildButton: function() {
    var job = this.props.job;
    if (!job.id) {
      return (
        <span
            onClick={this.createJobJob}
            style={{cursor: 'pointer', float: 'right'}}>
          build
        </span>
      );
    } else if (job.pending) {
      return (
        <span style={{float: 'right'}}>...</span>
      );
    } else {
      return (
        <span style={{float: 'right'}}>
          <a href={job.script} target="_blank">ol.min.js</a>
        </span>
      );
    }
  },

  renderGroups: function(groups) {
    if (!groups) {
      return null;
    }
    return groups.map(group => (
      <Group
          expand={this.props.expand}
          key={group.name}
          onToggleExpand={this.onToggleExpand}
          setSymbols={this.setSymbols}
          symbols={this.props.build.symbols}
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
          if (define.name in this.props.build.defines) {
            value = this.props.build.defines[define.name];
          }
          return (
            <Define
                key={define.name}
                onDefine={this.onDefine}
                value={value}
                {...define}/>
          );
        })}
      </section>
    );
  },

  render: function() {
    if (!this.props.info.pending) {
      location.hash = '#' +  util.getLongId(this.props.build, this.props.info);
    }
    return (
      <div>
        <h3>Choose what to include in your build</h3>
        {this.renderBuildButton()}
        {this.renderGroups(this.props.info.groups)}
        {this.renderDefines(this.props.info.defines)}
      </div>
    );
  }

});

export default connect(state => state)(Builder);
