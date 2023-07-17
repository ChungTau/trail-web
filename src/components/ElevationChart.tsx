import { Feature, LineString, Position, Properties, Units } from '@turf/helpers';
import { along } from '@turf/turf';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface ElevationChartProps{
    data: {
        elevation: number;
        distance: number;
    }[];
    setMarkerPosition: React.Dispatch<React.SetStateAction<Position | undefined>>;
    route: Feature<LineString, Properties>;
}


  

const ElevationChart = ({data, setMarkerPosition, route}:ElevationChartProps) => {
    const CustomTooltip = ({
        active,
        payload,
        label,
      }: TooltipProps<ValueType, NameType>) => {
        if (active) {
          if(payload){
            const payl = payload[0].payload;
            const options = { units: "kilometers" as Units};
            const point = along(route, payl.distance, options);
            setMarkerPosition(point.geometry.coordinates);
          }
        }
      
        return null;
      };
  return (
    <ResponsiveContainer width='100%' >
    <AreaChart
      
      data={data}
      margin={{
        top: 10, right: 30, left: 0, bottom: 0,
      }}
    >
      
      <XAxis dataKey="distance" type="number" tickFormatter={(value) => value.toFixed(0)} domain={[0, data[data.length-1]?.distance]}>
        <Label value="Distance (km)" offset={-10} position="insideBottom" />
      </XAxis>
      <YAxis dataKey="elevation" type="number" domain={[0,'auto']}>
        <Label value="Elevation (m)" angle={-90} position='insideLeft' offset={-5} />
      </YAxis>
      <Tooltip content={<CustomTooltip/>}/>
      <Area animationDuration={750} type="monotone" dataKey="elevation" stroke="white" fill="rgba(255,255,255,0.5)" />
    </AreaChart>
    </ResponsiveContainer>
  );
}

export default ElevationChart;
