import React from 'react';

import forecastData from './json/forecast.json';

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 1
    };

    this.setRange = this.setRange.bind(this);
  }

  componentDidMount() {
    this.initializeChart();
  }

  initializeChart() {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(this.setRange);
  }

  drawChart(dataRows) {
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Day');
    data.addColumn('number', 'Baseline');
    data.addColumn('number', 'Error');
    data.addColumn('number', 'Baseline + Error');

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

  setRange(e) {
    let display;
    if (e) {
      e.preventDefault();
      display = parseInt(e.target.value);
    } else {
      display = this.state.display;
    }

    const dataRows = [];
    const currentDate = new Date('Tue Dec 26 2017 13:30:00 GMT-0800 (PST)'); // Assumes today is 5/10/2018
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + display);

    forecastData.data.forEach((dataPoint) => {
      const date = new Date(dataPoint.date);
      if (date >= currentDate && date < endDate) {
        dataRows.push([date, dataPoint.baseline, dataPoint.error, dataPoint.baseline + dataPoint.error]);
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
          onChange={this.setRange}
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
