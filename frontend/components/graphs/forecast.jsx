import React from 'react';

import { ForecastData } from './json/forecast';

class Forecast extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const dataRows = [];
    ForecastData.data.forEach(dataPoint => {
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
    data.addColumn('number', 'Day');
    data.addColumn('number', 'Baseline');
    data.addColumn('number', 'Error');

    data.addRows(dataRows);

    const options = {
      chart: {
        title: 'Forecast',
        subtitle: 'in some unit of measure...'
      },
      width: 900,
      height: 500,
      padding: 10
    };

    const chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  render() {
    return (
      <div id="linechart_material">

      </div>
    )
  }
};

export default Forecast;
