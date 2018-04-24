import React from 'react';

import historyData from './json/history.json';

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 5
    };

    this.setRange = this.setRange.bind(this);
  }

  componentDidMount() {
    this.initializeChart();
  }

  initializeChart(dataRows) {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(this.setRange);
  }

  drawChart(dataRows) {
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Baseline');
    data.addColumn('number', 'Error');
    data.addColumn('number', 'Baseline + Error');
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

  setRange(e) {
    let display;
    if (e) {
      e.preventDefault();
      display = parseInt(e.target.value);
    } else {
      display = this.state.display;
    }

    const dataRows = [];
    const currentDate = new Date('Tue Dec 26 2017 13:30:00 GMT-0800 (PST)');
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - display);

    historyData.data.forEach((dataPoint) => {
      const date = new Date(dataPoint.date)
      if (date > startDate && date < currentDate) {
        dataRows.push([date, dataPoint.baseline, dataPoint.error, dataPoint.baseline + dataPoint.error, dataPoint.actual]);
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
        <label>Display energy from the </label>
        <select
          value={display}
          onChange={this.setRange}
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
