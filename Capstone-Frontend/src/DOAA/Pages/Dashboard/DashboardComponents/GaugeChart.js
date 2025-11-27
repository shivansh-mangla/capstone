import React from "react";
import Chart from "react-apexcharts";
import "./GaugeChart.css";

const GaugeChart = ({ approved, pending, rejected }) => {
  const total = approved + pending + rejected;

  // Prevent division by zero
  const a = total > 0 ? (approved / total) * 100 : 0;
  const b = total > 0 ? (pending / total) * 100 : 0;
  const c = total > 0 ? (rejected / total) * 100 : 0;

  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Approved", "Pending", "Rejected"],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: {
          size: "70%",
        },
      },
    },
    colors: ["#8ef9aeff", "#b69dd4ff", "#a4cbd7ff"], // approved, pending, rejected
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
  };

  const series = [a, b, c];

  return (
    <div className="chart-card">
      <div className="chart-inner">
        <Chart
          options={options}
          series={series}
          type="donut"
          height={300}
          width={400}
        />
        <div className="chart-center-text">
          <h2>{total}</h2>
          <p>Total Count</p>
        </div>
      </div>

      <div className="chart-divider"></div>

      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot approved"></span>
          <span>Approved</span>
          <strong>{approved}</strong>
        </div>
        <div className="legend-item">
          <span className="legend-dot pending"></span>
          <span>Pending</span>
          <strong>{pending}</strong>
        </div>
        <div className="legend-item">
          <span className="legend-dot rejected"></span>
          <span>Rejected</span>
          <strong>{rejected}</strong>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;