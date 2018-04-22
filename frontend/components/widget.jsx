import React from 'react';

import Forecast from './graphs/forecast';
import History from './graphs/history';

class Widget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "forecast"
    };
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(e) {
    let $tabs;
    $tabs = $('.graph-bar-item');
    $tabs.each( (index, tab) => {
      $(tab).removeClass("dark-gray");
    });
    const $target = $(e.target);
    $target.addClass("dark-gray");
    this.setState({
      selectedTab: $target.attr("id")
    });
  }

  graph() {
    switch (this.state.selectedTab) {
      case 'forecast':
        return <Forecast />;
      case 'history':
        return <History />;
      default:
        return "";
    }
  }

  render() {
    return (
      <div className="widget-container">
        <div className="graph-bar">
          <button id="forecast" className="graph-bar-item dark-gray" onClick={this.selectTab}>
            Forecast
          </button>
          <button id="history" className="graph-bar-item" onClick={this.selectTab}>
            History
          </button>
        </div>
        { this.graph() }
      </div>
    )
  }
};

export default Widget;
