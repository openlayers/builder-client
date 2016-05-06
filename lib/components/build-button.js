import React from 'react';
import {BUILDER_URL, jobStatus} from '../common';

const className = 'builder-build-button';

const BuildButton = React.createClass({

  propTypes: {
    info: React.PropTypes.object.isRequired,
    job: React.PropTypes.object.isRequired,
    onBuild: React.PropTypes.func.isRequired
  },

  renderBuildButton: function() {
    return (
      <button
          className={className}
          disabled={this.props.job.status === jobStatus.PENDING}
          onClick={this.props.onBuild}>
        Generate Build
      </button>
    );
  },

  renderScriptButton: function() {
    var url = BUILDER_URL + '/builds/' + this.props.info.release.name + '/' +
        this.props.job.id + '/ol.min.js';
    return (
      <button className={className}>
        <a download href={url} target="_blank">Download Build</a>
      </button>
    );
  },

  render: function() {
    var job = this.props.job;
    // TODO: rework this
    if (job.status === jobStatus.COMPLETE) {
      return this.renderScriptButton();
    } else {
      return this.renderBuildButton();
    }

  }

});

export default BuildButton;
