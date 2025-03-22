"use client"

import type * as React from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts"

// Define chart container component that uses the appropriate chart type
const Chart = ({
  type = "line",
  children,
  className,
  data,
  ...props
}: {
  type?: "line" | "pie" | "area"
  children: React.ReactNode
  className?: string
  data: any[]
  [key: string]: any
}) => {
  const Container = ResponsiveContainer

  return (
    <Container width="100%" height="100%" className={className}>
      {type === "line" && (
        <LineChart data={data} {...props}>
          {children}
        </LineChart>
      )}
      {type === "pie" && (
        <PieChart data={data} {...props}>
          {children}
        </PieChart>
      )}
      {type === "area" && (
        <AreaChart data={data} {...props}>
          {children}
        </AreaChart>
      )}
    </Container>
  )
}

const ChartPie = ({ children, ...props }: React.ComponentProps<typeof Pie>) => {
  return <Pie {...props}>{children}</Pie>
}

const ChartTooltip = (props: React.ComponentProps<typeof Tooltip>) => {
  return <Tooltip {...props} />
}

const ChartTooltipContent = ({ payload, label }: { payload?: any[]; label?: string }) => {
  if (!payload || payload.length === 0) {
    return null
  }

  return (
    <div className="rounded-md border bg-popover p-4 text-popover-foreground shadow-md">
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <span style={{ color: item.color }} className="block h-2 w-2 rounded-full"></span>
          <p className="text-sm">
            {item.name}: {item.value}
          </p>
        </div>
      ))}
      {label && <p className="text-sm opacity-70 mt-2">Date: {label}</p>}
    </div>
  )
}

const ChartLegend = (props: React.ComponentProps<typeof Legend>) => {
  return <Legend {...props} />
}

const ChartLegendItem = ({ name, color }: { name: string; color: string }) => {
  return (
    <div className="flex items-center gap-2">
      <span style={{ backgroundColor: color }} className="block h-2 w-2 rounded-full"></span>
      <span>{name}</span>
    </div>
  )
}

const ChartLine = (props: React.ComponentProps<typeof Line>) => {
  return <Line {...props} />
}

const ChartXAxis = (props: React.ComponentProps<typeof XAxis>) => {
  return <XAxis {...props} />
}

const ChartYAxis = (props: React.ComponentProps<typeof YAxis>) => {
  return <YAxis {...props} />
}

const ChartArea = (props: React.ComponentProps<typeof Area>) => {
  return <Area {...props} />
}

export {
  Chart,
  ChartPie,
  ChartLegendItem,
  ChartLine,
  ChartXAxis,
  ChartYAxis,
  ChartTooltip,
  ChartTooltipContent,
  ChartArea,
  ChartLegend,
  Cell,
}

