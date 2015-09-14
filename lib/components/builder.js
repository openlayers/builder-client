import React from 'react';
import {connect} from 'react-redux';
import Define from './define';
import Group from './group';
import BuildButton from './build-button';
import SearchBox from './search-box';
import {expandItem, createJob, setDefines, setSymbols, search} from '../actions';

import './builder.less';

const Builder = React.createClass({

  propTypes: {
    build: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    expand: React.PropTypes.object.isRequired,
    info: React.PropTypes.object.isRequired,
    job: React.PropTypes.object.isRequired,
    search: React.PropTypes.string.isRequired
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

  onBuild: function() {
    this.props.dispatch(createJob(this.props.build, this.props.info));
  },

  onSearch: function(name) {
    this.props.dispatch(search(name));
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
          search={this.props.search}
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
                search={this.props.search}
                value={value}
                {...define}/>
          );
        })}
      </section>
    );
  },

  render: function() {
    if (this.props.info.pending) {
      return null;
    }
    return (
      <div className="builder">
        <div className="builder-header">
          <SearchBox
              info={this.props.info}
              onSearch={this.onSearch}/>
          <BuildButton
              info={this.props.info}
              job={this.props.job}
              onBuild={this.onBuild}/>
        </div>
        <div className="builder-content">
          {this.renderGroups(this.props.info.groups)}
          {this.renderDefines(this.props.info.defines)}
        </div>
      </div>
    );
  }

});

export default connect(state => state)(Builder);
