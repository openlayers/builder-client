import React from 'react';
import classNames from 'classnames';

export const checkState = {
  ALL: 'ALL',
  SOME: 'SOME',
  NONE: 'NONE'
};

const Column = React.createClass({

  propTypes: {
    checkOnSelect: React.PropTypes.bool,
    checkable: React.PropTypes.bool,
    className: React.PropTypes.string,
    code: React.PropTypes.bool,
    items: React.PropTypes.array.isRequired,
    onCheck: React.PropTypes.func,
    onSelect: React.PropTypes.func.isRequired,
    selected: React.PropTypes.string.isRequired
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
    const displayName = item.displayName || item.name;
    if (this.props.code) {
      return (
        <span onClick={this.props.onSelect.bind(null, item)}>
          <code>{displayName}</code>
        </span>
      );
    } else {
      return (
        <span onClick={this.props.onSelect.bind(null, item)}>
          {displayName}
        </span>
      );
    }
  },

  renderItem: function(item, index) {
    const names = classNames('builder-column-item', {
      'builder-column-item-selected': item.name === this.props.selected
    });
    if (this.props.checkOnSelect) {
      return (
        <div
            className={names}
            key={'item-' + index}>
          <label>
            {this.renderCheckbox(item)}
            &nbsp;
            {this.renderName(item)}
          </label>
        </div>
      );
    } else {
      return (
        <div
            className={names}
            key={'item-' + index}>
          {this.renderCheckbox(item)}
          &nbsp;
          {this.renderName(item)}
        </div>
      );
    }
  },

  render: function() {
    const classes = classNames(this.props.className, 'builder-column');
    return (
      <div className={classes}>
        {this.props.items.map(this.renderItem)}
      </div>
    );
  }

});

export default Column;
