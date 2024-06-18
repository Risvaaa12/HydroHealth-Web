import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import * as XLSX from "xlsx";

export default function LineChartSuhuUdara() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [humidityData, setHumidityData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const sensorRef = ref(database, "Sensor/Monitoring");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      const temperatureValues = [data.Suhu];
      const humidityValues = [data.Suhu];
        setTemperatureData(temperatureValues);
        setHumidityData(humidityValues);
        setLabels([
          "12AM", "2AM", "4AM", "6AM", "8AM",
          "10AM", "12PM", "2PM", "4PM",
          "6PM", "8PM", "10PM",
        ]);
    });
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext("2d");

      // Destroy the existing chart instance if it exists
      if ((chartRef.current as any).chart) {
        (chartRef.current as any).chart.destroy();
      }
      
      if (context) {
        const newChart = new Chart(context, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Suhu Udara (°C)",
                data: temperatureData,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                label: "Humidity (%)",
                data: humidityData,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
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

        // Save the chart instance to the canvas element
        (chartRef.current as any).chart = newChart;
      }
    }
  }, [temperatureData, humidityData, labels]);

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
        ["Waktu", "Suhu Udara (°C)", "Humidity (%)"],
        ...chart.data.labels.map((label: any, index: string | number) => [
          label,
          chart.data.datasets[0].data[index],
          chart.data.datasets[1].data[index],
        ]),
      ];
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "SheetSuhuUdara");
      XLSX.writeFile(workbook, "LineChartSuhuUdara.xlsx");
    }
  }

  return (
    <div className="outline p-2 outline-green-200 rounded-lg h-full w-full">
      <canvas ref={chartRef} className="-[45%] h-full" />
      <div className="flex flex-row justify-center items-center pt-1">
        <Dropdown backdrop="opaque" radius="sm" className="p-1">
          <DropdownTrigger>
            <Button variant="faded" color="secondary" size="sm" radius="sm">
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
