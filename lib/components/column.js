import React from 'react';
import classNames from 'classnames';

export const checkState = {
  ALL: 'ALL',
  SOME: 'SOME',
  NONE: 'NONE'
};

const Column = React.createClass({

  propTypes: {
    checkable: React.PropTypes.bool,
    className: React.PropTypes.string,
    items: React.PropTypes.array.isRequired,
    onCheck: React.PropTypes.func,
    onSelect: React.PropTypes.func.isRequired,
    search: React.PropTypes.string,
    selected: React.PropTypes.string.isRequired
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      newSearch: nextProps.search && this.props.search !== nextProps.search
    });
  },

  componentDidUpdate: function() {
    if (this.state.newSearch && this.props.search in this.refs) {
      this.refs[this.props.search].scrollIntoView(true);
    }
  },

  onCheck: function(item, event) {
    this.props.onCheck(item, event.target.checked);
  },

  renderCheckbox: function(item) {
    if (!this.props.checkable) {
      return null;
    }
    const names = classNames({
      'partial-check': item.checked === checkState.SOME
    });
    return (
      <input
          checked={item.checked !== checkState.NONE}
          className={names}
          onChange={this.onCheck.bind(this, item)}
          type="checkbox"/>
    );
  },

  renderName: function(item) {
    const displayName = item.render ? item.render() : item.name;
    return (
      <span>
        {displayName}
      </span>
    );
  },

  onItemClick: function(item) {
    const expandable = item.children && item.children.length > 0;
    if (expandable) {
      this.props.onSelect(item);
    } else {
      this.props.onCheck(item, item.checked === checkState.NONE);
    }
  },

  renderItem: function(item, index) {
    const expandable = item.children && item.children.length > 0;
    const highlightSelected = item.name === this.props.selected && expandable;
    const names = classNames('builder-column-item', {
      'builder-column-item-expandable': expandable,
      'builder-column-item-selected': highlightSelected
    });
    return (
      <div className={names}
          key={'item-' + index}
          onClick={this.onItemClick.bind(this, item)}
          ref={item.name}>
        {this.renderCheckbox(item)}
        &nbsp;
        {this.renderName(item)}
      </div>
    );
  },

  render: function() {
    const classes = classNames(this.props.className, 'builder-column', {
      'builder-column-empty': this.props.items.length === 0
    });
    return (
      <div className={classes}>
        {this.props.items.map(this.renderItem)}
      </div>
    );
  }

});

export default Column;
