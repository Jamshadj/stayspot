import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class BookingCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['Total Bookings', 'Completed Bookings', 'Pending Bookings'],
        tooltip: {
          y: {
            formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
              return value; // Display the label (series name) instead of the value
            }
          }
        },
        chart: {
          width: 500, // Adjust the width of the chart
          height: 350 // Adjust the height of the chart
        }
      },
      series: [this.props.totalBookingCount, this.props.completedBookingCount, this.props.pendingBookingCount]
    };
  }

  render() {
    return (
      <div className="donut mt-16">
        <Chart options={this.state.options} series={this.state.series} type="donut" />
      </div>
    );
  }
}

export default BookingCharts;
