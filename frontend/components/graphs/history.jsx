import React from 'react';

import { HistoryData } from './json/history';

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 5
    };

    this.updateGraph = this.updateGraph.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const dataRows = [];
    HistoryData.data.forEach(dataPoint => {
      dataRows.push([dataPoint.date, dataPoint.baseline, dataPoint.error, dataPoint.actual]);
    });

    // Above would be replaced with HTTP request and promise which calls lines below
    this.initializeChart(dataRows);
  }

  initializeChart(dataRows) {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(() => this.drawChart(dataRows));
  }

  drawChart(dataRows) {
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Baseline');
    data.addColumn('number', 'Error');
    data.addColumn('number', 'Actual');

    data.addRows(dataRows);

    const options = {
      chart: {
        title: 'History',
        subtitle: 'in some unit of measure...'
      },
      width: 800,
      height: 450,
      hAxis: {
        format: 'MMM d, y'
      }
    };

    const chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  updateGraph(e) {
    e.preventDefault();
    const display = parseInt(e.target.value);

    const dataRows = [];
    const startDate = new Date(2018, 5, 10, 11); // Assumes today is 5/10/2018
    startDate.setDate(startDate.getDate() - display - 1);
    const yesterday = new Date(2018, 5, 10, 11);
    yesterday.setDate(yesterday.getDate() - 1);

    HistoryData.data.forEach((dataPoint) => {
      if (dataPoint.date > startDate && dataPoint.date < yesterday) {
        dataRows.push([dataPoint.date, dataPoint.baseline, dataPoint.error, dataPoint.actual]);
      }
    });

    this.drawChart(dataRows);
    this.setState({display: display});
  }

  render() {
    const { display } = this.state;

    return (
      <div>
        <div id="linechart_material" />
        <label>Display: </label>
        <select
          value={display}
          onChange={this.updateGraph}
        >
          <option value={5}>Past 5 days</option>
          <option value={7}>Past week</option>
          <option value={14}>Past 2 weeks</option>
          <option value={30}>Past month</option>
        </select>
      </div>
    )
  }
};

export default Forecast;
