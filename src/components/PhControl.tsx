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
import ImageIcon from "@mui/icons-material/Image";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export default function PhControl() {
  const [temppHValue, setTemppHValue] = useState<number>(0);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [pHValue, setpHValue] = useState(0);
  const [phAirValue, setPhAirValue] = useState(0);
  const [pHDown, setPHDown] = useState(0);
  const [pHUp, setPHUp] = useState(0);

  useEffect(() => {
    const dbRef = ref(database, 'sensors/pH');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setpHValue(data.current);
      setPhAirValue(data.current);
      setPHDown(data.pHDown);
      setPHUp(data.pHUp);
      setChartData(Object.values(data.history));
      setLabels(Object.keys(data.history));
    });
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                label: "AVG pH / Day",
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
      link.download = "phLineChart.png";
      link.click();
    }
  }

  function handleDownloadExcel() {
    if (chartRef.current && (chartRef.current as any).chart) {
      const chart = (chartRef.current as any).chart;
      const data = [
        ["Waktu", "pH Hidroponik (PPM)"],
        ...chart.data.labels.map((label: any, index: string | number) => [
          label,
          chart.data.datasets[0].data[index],
        ]),
      ];
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "SheetSuhuAirHidroponik"
      );
      XLSX.writeFile(workbook, "LineChartSuhuAirHidroponik.xlsx");
    }
  }

  return (
    <>
      <div
        id="pH"
        className="bg-green-200 p-4 rounded-xl text-center flex flex-col justify-center items-center"
      >
        <p className="font-semibold  text-md">Monitoring dan Kontrol pH Air</p>
        <div className="object-fit flex justify-center items-center h-1/2 w-full sm:h-full ">
          <Gauge
            startAngle={-110}
            endAngle={110}
            width={200}
            height={200}
            value={phAirValue}
            valueMin={0}
            valueMax={14}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                transform: "translate(0px, 0px)",
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
        <div>
          <p className="text-sm pb-2">pH Dikendalikan Secara Otomatis</p>
          <Button onPress={onOpen} size="sm" variant="faded" color="secondary">
            Show Details
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                History pH
              </ModalHeader>
              <ModalBody className="w-full">
                <div className="flex flex-col justify-center items-center text-sm">
                  <p className="text-base font-bold pb-2">
                    Jumlah pH up dan Down pada Kontainer
                  </p>
                  <p className="text-base pb-2">
                    Sisa Larutan pH Up : {pHUp} Liter
                  </p>
                  <p className="text-base pb-2">
                    Sisa Larutan pH Down : {pHDown} Liter
                  </p>
                </div>
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
                        <DropdownItem
                          onClick={handleDownloadPNG}
                          startContent={<ImageOutlinedIcon fontSize="small" />}
                          key="png"
                          color="default"
                          variant="flat"
                        >
                          Image(.png)
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Tutup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}