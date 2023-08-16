import React, { Component } from "react";
import Chart from "react-apexcharts";

class RevenueCharts extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    const months = Array.from({ length: 12 }, (_, index) => {
      const month = new Date(currentDate.getFullYear(), index);
      return month.toLocaleString('default', { month: 'long' });
    });

    const monthlyRevenueData = new Array(12).fill(0);
    this.props.bookings.forEach((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      const monthIndex = bookingDate.getMonth();
      monthlyRevenueData[monthIndex] += booking.totalAmount;
    });

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: months
        }
      },
      series: [
        {
          name: "Revenue",
          data: monthlyRevenueData
        }
      ]
    };
  }

  render() {
    return (
      <div className="app mt-6">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="700"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RevenueCharts;
