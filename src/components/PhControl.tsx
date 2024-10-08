import { Chart } from "chart.js/auto";
import { ref, onValue, query, limitToLast } from "firebase/database";
import { database } from "../../firebaseConfig";
import * as XLSX from "xlsx";
import {
  Button,
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
import TuneIcon from "@mui/icons-material/Tune";
import "chartjs-adapter-moment";
import moment from "moment";

export default function PhControl() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<{ pH: number[] }>({ pH: [] });
  const [labels, setLabels] = useState<string[]>([]);
  const [pHValue, setpHValue] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    fetchData();
    fetchLatestpH();
  }, []);

  // Fetch data for chart
  const fetchData = async (timeRange: string = "1d") => {
    try {
      const sensorRef = ref(database, "Monitoring");
      onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data); // Tambahkan log ini untuk debugging
        if (data) {
          const pHChart: number[] = [];
          const newLabels: string[] = [];

          Object.keys(data).forEach((time) => {
            newLabels.push(time);
            pHChart.push(parseFloat(data[time].pH));
          });

          const filteredLabels = filterLabels(newLabels, timeRange);
          const newLabelsLimited = filteredLabels.slice(-30); // Ambil 30 data terbaru
          const filteredpH = filterData(pHChart, newLabels, newLabelsLimited);

          setLabels(newLabelsLimited);
          setChartData({ pH: filteredpH });

          const latestTime = newLabelsLimited[newLabelsLimited.length - 1];
          setTimestamp(latestTime);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchLatestpH = () => {
    try {
      const pHRef = ref(database, "Monitoring");
      const latestQuery = query(pHRef, limitToLast(1));
  
      onValue(latestQuery, (latestSnapshot) => {
        latestSnapshot.forEach((latestDataSnapshot) => {
          const latestData = latestDataSnapshot.val();
          if (latestData && latestData.pH) {
            setpHValue(parseFloat(latestData.pH)); 
          }
        });
      });
    } catch (error) {
      console.error("Error fetching latest pH:", error);
    }
  };
  

  const filterLabels = (labels: string[], timeRange: string) => {
    const currentDate = new Date();
    let filterDate = new Date();

    switch (timeRange) {
      case "1d":
        filterDate.setDate(currentDate.getDate() - 1);
        break;
      case "7d":
        filterDate.setDate(currentDate.getDate() - 7);
        break;
      case "1m":
        filterDate.setMonth(currentDate.getMonth() - 1);
        break;
      default:
        break;
    }

    return labels.filter((label) => {
      const [hours, minutes] = label.split(":").map(Number);
      const labelDate = new Date();
      labelDate.setHours(hours);
      labelDate.setMinutes(minutes);
      return labelDate >= filterDate;
    });
  };

  const filterData = (data: number[], originalLabels: string[], filteredLabels: string[]) => {
    return originalLabels.reduce((acc, label, index) => {
      if (filteredLabels.includes(label)) {
        acc.push(data[index]);
      }
      return acc;
    }, [] as number[]);
  };

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
                label: "pH",
                data: chartData.pH,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
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

  const handleDownloadPNG = () => {
    if (chartRef.current) {
      const file = chartRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = file;
      link.download = "phLineChart.png";
      link.click();
    }
  };

  const handleDownloadExcel = () => {
    if (chartRef.current && (chartRef.current as any).chart) {
      const chart = (chartRef.current as any).chart;
      const data = [
        ["Waktu", "pH Hidroponik"],
        ...chart.data.labels.map((label: any, index: string | number) => [
          label,
          chart.data.datasets[0].data[index],
        ]),
      ];
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "SheetpH");
      XLSX.writeFile(workbook, "LineChartpH.xlsx");
    }
  };

  const handleTimeRangeChange = (range: string) => {
    fetchData(range);
  };

  return (
    <>
      <div
        id="pH"
        className="bg-green-200 p-4 rounded-xl text-center flex flex-col justify-center items-center"
      >
        <p className="font-semibold  text-md">Monitoring dan Kontrol pH Air</p>
        <p className="text-sm pb-2">pH Normal: 6 - 7</p>
        <div className="object-fit flex justify-center items-center h-1/2 w-full sm:h-full ">
          <Gauge
            startAngle={-110}
            endAngle={110}
            width={200}
            height={200}
            value={pHValue} 
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
              <ModalHeader className="flex flex-col gap-1">History pH</ModalHeader>
              <ModalBody className="w-full">
                <div style={{ padding: "16px" }} className="flex flex-col">
                  <div className="flex flex-row justify-end items-center">
                    <Dropdown backdrop="transparent" radius="sm" className="p-1 mb-4">
                      <DropdownTrigger>
                        <Button variant="flat" color="success" size="sm" radius="sm">
                          <TuneIcon />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Filter Time Range">
                        <DropdownItem
                          onClick={() => handleTimeRangeChange("1d")}
                          key="1d"
                        >
                          1 Hari yang Lalu
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleTimeRangeChange("7d")}
                          key="7d"
                        >
                          7 Hari yang Lalu
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleTimeRangeChange("1m")}
                          key="1m"
                        >
                          1 Bulan yang Lalu
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div>
                    <canvas ref={chartRef} />
                  </div>
                  <div className="mt-6 flex justify-center items-center w-full">
                    <Dropdown backdrop="opaque" radius="sm" className="p-2">
                      <DropdownTrigger>
                        <Button
                          variant="flat"
                          color="success"
                          size="sm"
                          radius="sm"
                        >
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
