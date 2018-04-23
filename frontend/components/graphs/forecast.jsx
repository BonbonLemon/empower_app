import React from 'react';

import { generateForecastData } from './json/forecast';

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 14
    };

    this.updateGraph = this.updateGraph.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const dataRows = [];
    const forecastData = generateForecastData(new Date(2018, 5, 10, 11));
    this.setState({forecastjson: forecastData});

    forecastData.data.forEach(dataPoint => {
      dataRows.push([dataPoint.date, dataPoint.baseline, dataPoint.error]);
    });

    // Above would be replaced with HTTP request and promise calls lines below
    this.initializeChart(dataRows);
  }

  initializeChart(dataRows) {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(() => this.drawChart(dataRows));
  }

  drawChart(dataRows) {
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Day');
    data.addColumn('number', 'Baseline');
    data.addColumn('number', 'Error');

    data.addRows(dataRows);

    const options = {
      chart: {
        title: 'Forecast',
        subtitle: 'in some unit of measure...'
      },
      width: 800,
      height: 450
    };

    const chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  updateGraph(e) {
    e.preventDefault();
    const display = parseInt(e.target.value);

    const dataRows = [];
    const currentDate = new Date(2018, 5, 10, 11); // Assumes today is 5/10/2018
    const endDay = new Date(2018, 5, 10, 11);
    endDay.setDate(endDay.getDate() + display);

    this.state.forecastjson.data.forEach((dataPoint) => {
      if (dataPoint.date >= currentDate && dataPoint.date < endDay) {
        dataRows.push([dataPoint.date, dataPoint.baseline, dataPoint.error]);
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
        <label>Display energy for the </label>
        <select
          value={display}
          onChange={this.updateGraph}
        >
          <option value={1}>Next 24 hours</option>
          <option value={3}>Next 3 days</option>
          <option value={7}>Next 1 week</option>
          <option value={14}>Next 2 weeks</option>
        </select>
      </div>
    )
  }
};

export default Forecast;
