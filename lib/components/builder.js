import React from 'react';
import {connect} from 'react-redux';
import Column, {checkState} from './column';
import BuildButton from './build-button';
import SearchBox from './search-box';
import {createJob, setDefines, setSymbols, select} from '../actions';

import './builder.less';

const Builder = React.createClass({

  propTypes: {
    build: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    groups: React.PropTypes.array.isRequired,
    index: React.PropTypes.object.isRequired,
    info: React.PropTypes.object.isRequired,
    job: React.PropTypes.object.isRequired,
    selected: React.PropTypes.string.isRequired
  },

  onBuild: function() {
    this.props.dispatch(createJob(this.props.build, this.props.info));
  },

  onSelect: function(item) {
    this.props.dispatch(select(item.name));
  },

  onSearchSelect: function(name) {
    if (name) {
      this.props.dispatch(setSymbols({
        [name]: true
      }));
    }
    this.props.dispatch(select(name));
  },

  onCheck: function(item, checked) {
    const values = {};
    let action;
    if (item.children && item.children.length) {
      item.children.forEach(child => {
        values[child.name] = checked;
      });
      action = setSymbols;
    } else {
      values[item.name] = checked;
      if (item.name in this.props.index.defines) {
        action = setDefines;
      } else {
        action = setSymbols;
      }
    }
    this.props.dispatch(action(values));
    this.props.dispatch(select(item.name));
  },

  getSelectedGroup: function() {
    const selected = this.props.selected;
    let group = null;
    if (selected) {
      if (selected in this.props.index.group) {
        group = this.props.groups[this.props.index.group[selected]];
      } else {
        group = this.props.groups.find(group => group.name === selected);
      }
    }
    return group;
  },

  getSelectedItem: function() {
    const selected = this.props.selected;
    let item = null;
    if (selected in this.props.index.item) {
      const group = this.getSelectedGroup();
      const index = this.props.index.item[selected];
      item = group.children[index];
    }
    return item;
  },

  renderGroupColumn: function() {
    const group = this.getSelectedGroup();
    const selected = group ? group.name : '';
    return (
      <Column
          className="bulider-column-narrow"
          items={this.props.groups}
          onSelect={this.onSelect}
          selected={selected}/>
    );
  },

  renderCFDColumn: function() {
    var group = this.getSelectedGroup();
    let items;
    let displayName;
    let selected = '';
    if (group) {
      items = group.children.map(child => {
        // class, function, or define
        let checked;
        if (child.name in this.props.index.defines) {
          // we have a define
          if (child.name in this.props.build.defines) {
            checked = this.props.build.defines[child.name] ?
                checkState.ALL : checkState.NONE;
          } else {
            const definesIndex = this.props.index.defines[child.name];
            checked = this.props.info.defines[definesIndex].default ?
                checkState.ALL : checkState.NONE;
          }
        } else if (child.children && child.children.length) {
          // we have a class
          const total = child.children.length;
          let exported = 0;
          child.children.forEach(method => {
            if (this.props.build.symbols[method.name]) {
              ++exported;
            }
          });
          if (exported === 0) {
            checked = checkState.NONE;
          } else if (exported < total) {
            checked = checkState.SOME;
          } else {
            checked = checkState.ALL;
          }
        } else {
          // we have a function
          checked = this.props.build.symbols[child.name] ?
              checkState.ALL : checkState.NONE;
          displayName = child.name + '()';
        }
        return {
          checked,
          children: child.children,
          displayName,
          name: child.name
        };
      });
      const item = this.getSelectedItem();
      if (item) {
        selected = item.name;
      }
    } else {
      items = [];
    }
    return (
      <Column
          checkable
          code
          items={items}
          onCheck={this.onCheck}
          onSelect={this.onSelect}
          selected={selected}/>
    );
  },

  renderMethodColumn: function() {
    let items;
    const item = this.getSelectedItem();
    if (item) {
      items = item.children.map(child => {
        const parts = child.name.split('#');
        let displayName;
        if (parts.length === 2) {
          displayName = '.' + parts[1] + '()';
        } else {
          displayName = child.name + '()';
        }
        return {
          displayName,
          name: child.name,
          checked: this.props.build.symbols[child.name] ?
              checkState.ALL : checkState.NONE
        };
      });
    } else {
      items = [];
    }
    return (
      <Column
          checkable
          code
          items={items}
          onCheck={this.onCheck}
          onSelect={this.onSelect}
          selected={''}/>
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
              onSelect={this.onSearchSelect}/>
          <BuildButton
              info={this.props.info}
              job={this.props.job}
              onBuild={this.onBuild}/>
        </div>
        <div className="builder-content">
          {this.renderGroupColumn()}
          {this.renderCFDColumn()}
          {this.renderMethodColumn()}
        </div>
      </div>
    );
  }

});

export default connect(state => state)(Builder);
