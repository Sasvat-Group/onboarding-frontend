import { Skeleton } from 'antd';
import { Legend } from 'plotly.js';
import React from 'react';
import { PlotParams } from 'react-plotly.js';
import Plot from '../Plot/Plot';
import classes from './PlotlyPlot.module.css';

interface Props extends PlotParams {
  layout: PlotlyLayoutProps;
  loading: boolean;
}

interface PlotlyLayoutProps extends Partial<Plotly.Layout> {
  legend?: LegendProps;
}

interface LegendProps extends Partial<Legend> {
  title?: string | any;
}

const PlotlyPlot = (props: Props) => {
  const { loading, ...rest } = props;

  return loading ? (
    <Skeleton.Image className={classes.skeleton} />
  ) : (
    <Plot {...rest} className="w-full" />
  );
};

export default PlotlyPlot;
