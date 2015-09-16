import React from 'react';
import {connect} from 'react-redux';
import Column from './column';
import BuildButton from './build-button';
import SearchBox from './search-box';
import {expandItem, createJob, setDefines, setSymbols, select} from '../actions';
import {getClassName} from '../grouper';

import './builder.less';

const Builder = React.createClass({

  propTypes: {
    build: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    expand: React.PropTypes.object.isRequired,
    groups: React.PropTypes.array.isRequired,
    info: React.PropTypes.object.isRequired,
    job: React.PropTypes.object.isRequired,
    select: React.PropTypes.string.isRequired
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

  onSelect: function(name) {
    this.props.dispatch(select(name));
  },

  renderColumns: function() {
    const groupNames = this.props.groups.map(group => group.name);
    const columns = [(
      <Column
          items={groupNames}
          key="groups-column"
          onSelect={this.onSelect}/>
    )];
    if (this.props.select) {
      const className = getClassName(this.props.select);
      const selectName = className || this.props.select;
      const group = this.props.groups.find(group => {
        if (selectName === group.name) {
          return true;
        } else if (group.items.indexOf(selectName) >= 0) {
          return true;
        }
      });
      columns.push((
        <Column
            items={group.items}
            key="second-column"
            onSelect={this.onSelect}/>
      ));
      if (className) {
        const methods = [];
        this.props.info.symbols.forEach(symbol => {
          if (getClassName(symbol.name) === className) {
            methods.push(symbol.name);
          }
        });
        if (methods.length > 0) {
          methods.unshift(className);
        }
        columns.push((
          <Column
              items={methods}
              key="third-column"
              onSelect={this.onSelect}/>
        ));
      }
    }
    return columns;
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
              onSelect={this.onSelect}/>
          <BuildButton
              info={this.props.info}
              job={this.props.job}
              onBuild={this.onBuild}/>
        </div>
        <div className="builder-content">
          {this.renderColumns()}
        </div>
      </div>
    );
  }

});

export default connect(state => state)(Builder);
