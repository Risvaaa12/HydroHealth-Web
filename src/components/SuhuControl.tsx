"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import ImageIcon from "@mui/icons-material/Image";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import * as XLSX from "xlsx";

export default function LineChartSuhuUdara() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    if (chartRef.current) {
      if ((chartRef.current as any).chart) {
        (chartRef.current as any).chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      if (context) {
        const newChart = new Chart(context, {
          type: "line",
          data: {
            labels: [
              "12AM",
              "1AM",
              "2AM",
              "3AM",
              "4AM",
              "5AM",
              "6AM",
              "7AM",
              "8AM",
              "9AM",
              "10AM",
              "11AM",
              "12PM",
              "1PM",
              "2PM",
              "3PM",
              "4PM",
              "5PM",
              "6PM",
              "7PM",
              "8PM",
              "9PM",
              "10PM",
              "11PM",
            ],
            datasets: [
              {
                label: "Suhu Udara (°C)",
                data: [
                  30, 30, 28, 31, 29, 30, 31, 31, 34, 29, 28, 30, 30, 32, 29,
                  31, 34, 29, 30, 29, 30, 30, 30, 28,
                ],
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "category",
              },
              y: {
                beginAtZero: false,
              },
            },
          },
        });
        (chartRef.current as any).chart = newChart;
      }
    }
  }, [chartData, labels]);


  function handleDownloadImagePNG() {
    if (chartRef.current) {
      const file = chartRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = file;
      link.download = "LineChartSuhuUdara.png";
      link.click();
    }
  }

  function handleDownloadExcel() {
    if (chartRef.current && (chartRef.current as any).chart) {
      const chart = (chartRef.current as any).chart;
      const data = [
        ["Waktu", "Suhu Udara (°C)"],
        ...chart.data.labels.map((label: any, index: string | number) => [
          label,
          chart.data.datasets[0].data[index],
        ]),
      ];
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "SheetSuhuUdara");
      XLSX.writeFile(workbook, "LineChartSuhuUdara.xlsx");
    }
  }

  return (
    <div className="outline p-4 outline-green-200 rounded-lg h-full w-full">
      <canvas ref={chartRef} />
      <div className="flex flex-row justify-center items-center pt-1">
        <Dropdown backdrop="opaque" radius="sm" className="p-1">
          <DropdownTrigger>
            <Button  variant="faded" color="secondary" size="sm" radius="sm">
              Download Chart
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions">
            <DropdownItem
              onClick={handleDownloadImagePNG}
              startContent={<ImageOutlinedIcon fontSize="small" />}
              key="png"
              color="default"
              variant="flat"
            >
              Image (.png)
            </DropdownItem>
            <DropdownItem
              onClick={handleDownloadExcel}
              startContent={<InsertDriveFileIcon fontSize="small" />}
              key="excel"
              color="default"
              variant="flat"
            >
              Excel (.xlsx)
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}