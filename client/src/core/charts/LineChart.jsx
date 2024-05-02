//Taylor Zweigle, 2024
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useTheme } from "@mui/material/styles";

const LineChart = ({ series, data }) => {
  const theme = useTheme();

  const options = {
    chart: {
      type: "line",
      backgroundColor: "rgba(0, 0, 0, 0.0)",
      height: "188px",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: series,
      gridLineDashStyle: "dash",
      gridLineWidth: 1,
      gridLineColor: theme.palette.background.border,
      labels: {
        autoRotation: [180],
        style: {
          textOverflow: "none",
          color: theme.palette.text.primary,
        },
      },
    },
    yAxis: {
      min: Math.min(...data),
      ceiling: Math.max(...data),
      step: 1,
      gridLineDashStyle: "dash",
      gridLineWidth: 1,
      gridLineColor: theme.palette.background.border,
      title: false,
      labels: {
        style: {
          color: theme.palette.text.primary,
        },
      },
    },
    plotOptions: {
      line: {
        showInLegend: false,
        dataLabels: {
          enabled: true,
          style: {
            color: theme.palette.text.primary,
          },
        },
        enableMouseTracking: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    series: [
      {
        color: theme.palette.primary.main,
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
