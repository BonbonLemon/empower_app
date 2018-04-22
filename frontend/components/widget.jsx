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

  componentDidMount() {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'Day');
    data.addColumn('number', 'Guardians of the Galaxy');
    data.addColumn('number', 'The Avengers');
    data.addColumn('number', 'Transformers: Age of Extinction');

    data.addRows([
      [1,  37.8, 80.8, 41.8],
      [2,  30.9, 69.5, 32.4],
      [3,  25.4,   57, 25.7],
      [4,  11.7, 18.8, 10.5],
      [5,  11.9, 17.6, 10.4],
      [6,   8.8, 13.6,  7.7],
      [7,   7.6, 12.3,  9.6],
      [8,  12.3, 29.2, 10.6],
      [9,  16.9, 42.9, 14.8],
      [10, 12.8, 30.9, 11.6],
      [11,  5.3,  7.9,  4.7],
      [12,  6.6,  8.4,  5.2],
      [13,  4.8,  6.3,  3.6],
      [14,  4.2,  6.2,  3.4]
    ]);

    const options = {
      chart: {
        title: 'Box Office Earnings in First Two Weeks of Opening',
        subtitle: 'in millions of dollars (USD)'
      },
      width: 900,
      height: 500
    };

    const chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, google.charts.Line.convertOptions(options));
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