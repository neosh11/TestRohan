import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { IPoint } from '.'

const useD3 = (renderChartFn: (svg: any) => void, dependencies: React.DependencyList | undefined) => {
  const ref = useRef(null)

  useEffect(() => {
    renderChartFn(d3.select(ref.current))
    return () => {
      return
    }
  }, [renderChartFn, dependencies])
  return ref
}

interface Props {
  data: IPoint[]
}

const DrawChart = ({ data }: Props) => {
  interface IPoint {
    x: number
    y: number
  }
  type TData = IPoint[]

  const yAccessor = (d: IPoint) => d.y
  const xAccessor = (d: IPoint) => d.x

  //   const wrapper = d3.select('#wrapper')
  //   const svg = wrapper.append('svg')

  const dimensions = {
    margin: {
      top: 20,
      right: 20,
      bottom: 50,
      left: 50
    }
  }

  const ref = useD3(
    (svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) => {
      const width = svg.node()?.getBoundingClientRect().width
      const height = svg.node()?.getBoundingClientRect().height
      if (!width || !height) return

      const boundedWidth = width - dimensions.margin.left - dimensions.margin.right
      const boundedHeight = height - dimensions.margin.top - dimensions.margin.bottom

      svg.attr('width', width).attr('height', height)

      // @ts-expect-error
      const yScale = d3.scaleLinear().domain(d3.extent(data, yAccessor)).range([boundedHeight, 0]).nice()
      // @ts-expect-error
      const xScale = d3.scaleLinear().domain(d3.extent(data, xAccessor)).range([0, boundedWidth]).nice()

      const lineGenerator = d3
        .line<IPoint>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))

      const line = svg
        .select('.bounds')
        .append('path')
        // @ts-expect-error
        .attr('d', lineGenerator(data))
        .attr('fill', 'none')
        .attr('stroke', '#af9358')
        .attr('stroke-width', 2)

      const yAxisGenerator = d3.axisLeft(yScale)
      const yAxis = svg.select('.bounds').append('g').call(yAxisGenerator)

      const xAxisGenerator = d3.axisBottom(xScale)
      const xAxis = svg.select('.bounds').append('g').call(xAxisGenerator)
    },
    [data.length, dimensions]
  )

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: '100%',
        marginRight: '0px',
        marginLeft: '0px'
      }}
    >
      <g
        className='bounds'
        style={{
          transform: `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
        }}
      />
    </svg>
  )
}

const LineChart = ({ data }: Props) => {
  return (
    <>
      <h2>Line Chart</h2>
      <DrawChart data={data} />
    </>
  )
}

export default LineChart
