"use client";
import { Chart } from "chart.js/auto";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";
import * as XLSX from "xlsx";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React, { useRef, useState, useEffect } from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

// Define the structure of your sensor data
interface SensorData {
  Nutrisi: number;
  Timestamp: string;
}

export default function NutritionControl() {
  const [nutrisiValue, setNutrisiValue] = useState<number>(0);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Get the latest data from the sensor
  useEffect(() => {
    const dataRef = ref(database, "Monitoring");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const latestData: SensorData = Object.values(data).pop() as SensorData;
        setNutrisiValue(latestData.Nutrisi);
      }
    });
  }, []);

  // Get the history data for the chart
  useEffect(() => {
    const dataRef = ref(database, "Monitoring");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const historyData: SensorData[] = Object.values(data) as SensorData[];
        const values = historyData.map((entry) => entry.Nutrisi);
        const timestamps = historyData.map((entry) => entry.Timestamp);
        setChartData(values);
        setLabels(timestamps);
      }
    });
  }, []);

  useEffect(() => {
    if (isOpen && chartRef.current) {
      const context = chartRef.current.getContext("2d");

      if (context) {
        new Chart(context, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "TDS Sensor (PPM) / Day",
                data: chartData,
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
      }
    }
  }, [isOpen, chartData, labels]);

  function handleDownloadPNG() {
    if (chartRef.current) {
      const file = chartRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = file;
      link.download = "NutritionLineChart.png";
      link.click();
    }
  }

  function handleDownloadExcel() {
    if (chartRef.current && (chartRef.current as any).chart) {
      const chart = (chartRef.current as any).chart;
      const data = [
        ["Waktu", "Nutrisi Hidroponik (PPM)"],
        ...chart.data.labels.map((label: any, index: string | number) => [
          label,
          chart.data.datasets[0].data[index],
        ]),
      ];
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "SheetSuhuAirHidroponik");
      XLSX.writeFile(workbook, "LineChartSuhuAirHidroponik.xlsx");
    }
  }

  return (
    <>
      <div id="nutrisi" className="bg-green-200 p-4 -pb-8 rounded-xl text-center flex flex-col justify-center items-center">
        <p className="font-semibold text-md">Monitoring dan Kontrol Nutrisi</p>
        <div className="object-fit flex justify-center items-center h-1/2 w-full sm:h-full">
          <Gauge
            startAngle={-110}
            endAngle={110}
            width={200}
            height={200}
            value={nutrisiValue}
            valueMin={0}
            valueMax={2000}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#52b202",
              },
              [`& .${gaugeClasses.valueText}`]: {
                transform: "translate(0px, 0px)",
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
        <div className="">
          <p className="text-sm pb-2">Nutrisi dikendalikan secara otomatis</p>
          <Button onPress={onOpen} size="sm" variant="faded" color="secondary">
            Show Details
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} placement="center" backdrop="blur" onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">History Nutrisi</ModalHeader>
              <ModalBody className="w-full">
                <div style={{ padding: "16px" }} className="flex flex-col">
                  <div>
                    <canvas ref={chartRef} />
                  </div>
                  <div className="mt-6 flex justify-center items-center w-/12">
                    <Dropdown backdrop="opaque" radius="sm" className="p-2">
                      <DropdownTrigger>
                        <Button variant="flat" color="success" size="sm" radius="sm">
                          Download chart
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Actions">
                        <DropdownItem onClick={handleDownloadPNG} startContent={<ImageOutlinedIcon fontSize="small" />} key="png" color="default" variant="flat">
                          Image (.png)
                        </DropdownItem>
                        <DropdownItem onClick={handleDownloadExcel} startContent={<InsertDriveFileIcon fontSize="small" />} key="excel" color="default" variant="flat">
                          Excel (.xlsx)
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>Tutup</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
