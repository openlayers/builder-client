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

  renderItems: function() {
    return this.props.items.map((item, index) => {
      const names = classNames('builder-column-item', {
        'builder-column-item-selected': item.name === this.props.selected
      });
      return (
        <div
            className={names}
            key={'item-' + index}>
          {this.renderCheckbox(item)}
          &nbsp;
          {this.renderName(item)}
        </div>
      );
    });
  },

  render: function() {
    return (
      <div className="builder-column">
        {this.renderItems()}
      </div>
    );
  }

});

export default Column;
