import React from 'react';

const Column = React.createClass({

  propTypes: {
    items: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired
  },

  renderItems: function() {
    return this.props.items.map((item, index) => (
      <div
          className="builder-column-item"
          key={'item-' + index}
          onClick={this.props.onSelect.bind(null, item)}>
        {item}
      </div>
    ));
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
