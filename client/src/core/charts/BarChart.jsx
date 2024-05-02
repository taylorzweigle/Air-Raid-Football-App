//Taylor Zweigle, 2023
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useTheme } from "@mui/material/styles";

const BarChart = ({ series, data }) => {
  const theme = useTheme();

  const options = {
    chart: {
      type: "column",
      backgroundColor: "rgba(0, 0, 0, 0.0)",
      height: "195px",
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
      min: 0.0,
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
      column: {
        showInLegend: false,
        dataLabels: {
          enabled: true,
          style: {
            color: theme.palette.text.primary,
          },
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    series: [
      {
        color: theme.palette.primary.main,
        pointWidth: 20,
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
