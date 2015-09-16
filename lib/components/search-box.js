import React from 'react';
import shallowEqual from 'react/lib/shallowEqual';
import Select from 'react-select';

const className = 'builder-search-box';

const SearchBox = React.createClass({

  propTypes: {
    info: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func.isRequired
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps);
  },

  getOptions: function(search, callback) {
    if (search.length < 3) {
      callback(null, {options: []});
      return;
    }

    search = search.toLowerCase();
    var options = [];

    var symbols = this.props.info.symbols;
    for (let i = 0, ii = symbols.length; i < ii; ++i) {
      let name = symbols[i].name;
      if (name.toLowerCase().indexOf(search) >= 0) {
        options.push({
          value: name,
          label: symbols[i].kind === 'function' ? name + '()' : name
        });
      }
    }

    var defines = this.props.info.defines;
    for (let i = 0, ii = defines.length; i < ii; ++i) {
      let name = defines[i].name;
      if (name.toLowerCase().indexOf(search) > 0) {
        options.push({
          value: name,
          label: name
        });
      }
    }

    callback(null, {
      filterOptions: options => options,
      options: options
    });
  },

  renderOption: function(option) {
    return (
      <code>{option.label}</code>
    );
  },

  render: function() {

    return (
      <Select
          asyncOptions={this.getOptions}
          className={className}
          onChange={this.props.onSelect}
          optionRenderer={this.renderOption}
          placeholder="Search ..."
          valueRenderer={this.renderOption}/>
    );
  }

});

export default SearchBox;
