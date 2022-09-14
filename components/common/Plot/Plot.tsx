import React from "react";
import dynamic from "next/dynamic";
import { PlotParams } from "react-plotly.js";

const Plot: React.ComponentType<PlotParams> = dynamic(
  () => import("react-plotly.js").then((cmp) => cmp.default),
  { ssr: false }
);

export default Plot;
