import * as React from 'react';
import { Group } from '@visx/group';
import { Bin, Bins } from '@visx/mock-data/lib/generators/genBins';
import { scaleLinear } from '@visx/scale';
import { HeatmapRect } from '@visx/heatmap';
import { getSeededRandom } from '@visx/mock-data';
import { FontSizes, FontWeights, Text } from '@fluentui/react';
import {
  useTooltip, useTooltipInPortal, defaultStyles,
} from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { genBins } from './utils';
import './HeatMap.css';

let tooltipTimeout: number;
const cool1 = '#9d4edd';
const cool2 = '#ff6d00';
export const background = '#F5F3F4';

const seededRandom = getSeededRandom(0.67);

const binData = genBins(
  /* length = */ 18,
  /* height = */ 7,
  /** binFunc */ (idx) => 150 * idx,
  /** countFunc */ (i, number) => (25 * (19 - i) * seededRandom()),
);

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

// accessors
const bins = (d: Bins) => d.bins;
const count = (d: Bin) => d.count;

const colorMax = max(binData, (d) => max(bins(d), count));
const bucketSizeMax = max(binData, (d) => bins(d).length - 1);

// scales
const xScale = scaleLinear<number>({
  domain: [0, binData.length],
});
const yScale = scaleLinear<number>({
  domain: [0, bucketSizeMax],
});
const rectColorScale = scaleLinear<string>({
  range: [cool1, cool2],
  domain: [0, colorMax],
});
const opacityScale = scaleLinear<number>({
  range: [0.1, 1],
  domain: [0, colorMax],
});

const defaultMargin = {
  top: 10, left: 20, right: 20, bottom: 40,
};

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
};

type HeatmapProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

type TooltipData = {
  bin: unknown;
  key: string;
  height: number;
  width: number;
  color?: string ;
};

const HeatMap = ({
  margin = defaultMargin,
  height,
  width,
}: HeatmapProps): JSX.Element => {
  const size = width > margin.left
  + margin.right ? width - margin.left - margin.right : width;
  const xMax = size;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = xMax / binData.length;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<TooltipData>();

  // If you don't want to use a Portal, simply replace `TooltipInPortal` below with
  // `Tooltip` or `TooltipWithBounds` and remove `containerRef`
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  });

  return (
    <div>
      <div style={{
        fontSize: FontSizes.size24,
        fontWeight: 600,
        // textAlign: 'left',
      }}
      >
        City Hall Activity
      </div>
      <svg ref={containerRef} width={width} height={height}>
        {/* <rect x={0} y={0} width={width} height={height} rx={14} fill={background} /> */}
        <Group top={margin.top} left={margin.left}>
          <HeatmapRect
            data={binData}
            xScale={(d) => xScale(d) ?? 0}
            yScale={(d) => yScale(d) ?? 0}
            colorScale={rectColorScale}
            opacityScale={opacityScale}
            binWidth={binWidth}
            binHeight={binWidth}
            gap={5}
          >
            {(heatmap) => heatmap.map((heatmapBins) => heatmapBins.map((
              bin,
            ) => (
              <rect
                key={`heatmap-rect-${bin.row}-${bin.column}`}
                className="visx-heatmap-rect"
                width={bin.width}
                height={bin.height}
                x={bin.x}
                y={bin.y}
                fill={bin.color}
                fillOpacity={bin.opacity}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
                onMouseMove={(event) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  // TooltipInPortal expects coordinates to be relative to containerRef
                  // localPoint returns coordinates relative to the nearest SVG, which
                  // is what containerRef is set to in this example.
                  const eventSvgCoords = localPoint(event);
                  const left = bin.x + bin.width / 2;
                  showTooltip({
                    tooltipData: {
                      bin: bin.bin,
                      color: bin.color,
                      key: `heatmap-rect-${bin.row}-${bin.column}`,
                      height: bin.height,
                      width: bin.width,

                    },
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: left,
                  });
                }}
              />
            )))}
          </HeatmapRect>
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div style={{ color: tooltipData.color }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>
            {JSON.stringify(tooltipData.bin)}
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
};

HeatMap.defaultProps = {
  margin: defaultMargin,
};
export default HeatMap;
