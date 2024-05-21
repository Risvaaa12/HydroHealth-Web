"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";

export default function LineChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const dataRef = ref(database, 'sensorTDS');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const values = Object.values(data).map((item: any) => item.value);
      const days = Object.values(data).map((item: any) => item.day);
      setChartData(values);
      setLabels(days);
    });
  }, []);

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
            labels: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
            datasets: [
              {
                label: "TDS Sensor (PPM) / Day",
                data: [1333, 1200, 1250, 1400, 1250, 1000, 1290],
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

  function handleDownload() {
    if (chartRef.current) {
      const file = chartRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = file;
      link.download = "NutritionLineChart.png";
      link.click();
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={handleDownload}
        className="rounded-md bg-[#c2efa8] text-sm hover:text-emerald-500 p-2 "
      >
        Download Chart
      </button>
      <canvas ref={chartRef} />
    </div>
  );
}
