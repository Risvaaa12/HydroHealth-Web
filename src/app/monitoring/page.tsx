"use client";
import { Typography } from "@mui/material";
import { useAuth } from "@/middleware/AuthenticationProviders";
import AuthenticationForm from "../../components/AuthenticationForm";
import PompaControl from "../../components/PompaControl";
import NutritionControl from "../../components/NutritionControl";
import PengadukControl from "../../components/PengadukControl";
import PelindungControl from "../../components/PelindungControl";
import PestisidaControl from "../../components/PestisidaControl";
import PupukDaunControl from "../../components/PupukDaunControl";
import PhControl from "../../components/PhControl";
import SuhuControl from "../../components/SuhuControl";
import Camera1 from "../../components/Camera1";
import { Button, useDisclosure, Image, Card, CardFooter } from "@nextui-org/react";
import PembuanganAirPipa from "@/components/PembuanganAirPipa";
import SumberAir from "@/components/SumberAirControl";
import PembuanganAirKontainer from "@/components/PembuanganAirKontainer";
import AlertCheckAuth from "@/components/AlertCheckAuth";
import AlertLoginGuest from "@/components/AlertLoginGuest";
import AlertAuthorizedMember from "@/components/AlertAuthorizedMember";
import AddTanaman from "@/components/AddTanaman";
import { ref, onValue } from "firebase/database";
import { database } from "../../../firebaseConfig";
import React, { useRef, useState, useEffect } from "react";
import LogActivity from "@/components/LogActivity";
import { LinearProgress } from "@mui/material";
import { Opacity, Science, WaterDrop, Nature, LocalFlorist, BugReport, Cloud } from "@mui/icons-material";

// Import Axios for API requests (install axios if not installed yet)
import axios from "axios";

export default function Monitoring() {
  const user = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [sisaNutrisiAB, setSisaNutrisiAB] = useState<number>(0);
  const [pHDown, setPHDown] = useState<number>(0);
  const [pHUp, setPHUp] = useState<number>(0);
  const [sisaKontainer, setSisaKontainer] = useState<number>(0);
  const [sisaPupukDaun, setSisaPupukDaun] = useState<number>(0);
  const [sisaPestisida, setSisaPestisida] = useState<number>(0);
  const [weatherInfo, setWeatherInfo] = useState<any>(null); // State untuk menyimpan data cuaca

  useEffect(() => {
    const dataRef = ref(database, "Monitoring/Sisa Nutrisi AB");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setSisaNutrisiAB(data);
    });
  }, []);


  useEffect(() => {
    const pHRef = ref(database, 'Monitoring/Sisa pH Up');
    onValue(pHRef, (snapshot) => {
      const data = snapshot.val();
      setPHUp(data);
    });
  },[]);

  useEffect(() => {
    const pHRef = ref(database, 'Monitoring/Sisa pH Down');
    onValue(pHRef, (snapshot) => {
      const data = snapshot.val();
      setPHDown(data);
    });
  },[]);

  useEffect(() => {
    const kontainerRef = ref(database, "Monitoring/Sisa Kontainer");
    onValue(kontainerRef, (snapshot) => {
      const data = snapshot.val();
      setSisaKontainer(data);
    });
  }, []);

  useEffect(() => {
    const pupukDaunRef = ref(database, "Monitoring/Sisa Pupuk Daun");
    onValue(pupukDaunRef, (snapshot) => {
      const data = snapshot.val();
      setSisaPupukDaun(data);
    });
  }, []);

  useEffect(() => {
    const pestisidaRef = ref(database, "Monitoring/Sisa Pestisida");
    onValue(pestisidaRef, (snapshot) => {
      const data = snapshot.val();
      setSisaPestisida(data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === "admin" || user.role === "member") {
        setIsAuthorized(true);
      }
      setIsCheckingAuth(false);
    } else {
      setIsCheckingAuth(false);
    }
  }, [user]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=Jakarta,id&appid=${process.env.NEXT_PUBLIC_VERCEL_WEATHER}&units=metric`
        );
        setWeatherInfo(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  
    fetchWeatherData();
  }, []);
  
  

  if (isCheckingAuth) {
    return <AlertCheckAuth />;
  }

  if (!user) {
    return <AlertLoginGuest />;
  }

  if (!isAuthorized) {
    return <AlertAuthorizedMember />;
  }

  const renderProgressBar = (label: string, value: number, IconComponent: any) => (
    <div className="flex flex-col items-center bg-green-200 p-3 rounded-xl">
      <div className="flex items-center">
        <IconComponent className="text-green-600 mr-2" />
        <p className="text-sm font-semibold">{label}</p>
      </div>
      <LinearProgress variant="determinate" value={(value / 100) * 100} className="w-full mt-2" />
      <p className="text-xs mt-1">{value} Liter</p>
    </div>
  );

  return (
    <main className="flex flex-col justify-center min-h-screen mx-2 items-center gap-3">
      {user ? (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 p-4 mb-4 justify-center items-center max-w-screen-xl">
              <p className="text-xl sm:text-3xl font-bold pb-2">
                Selamat datang di halaman{" "}
                <span className="font-bold text-emerald-500">
                  Kontrol dan Monitoring
                </span>
                , {user ? user.displayName : ""}👋
              </p>
              <Camera1 />
            </div>
            <div className="flex border mt-4 p-2 rounded-lg flex-col outline outline-2 justify-center items-center gap-4">
              <p className="font-semibold text-base sm:text-xl pt-4">
                Kontrol Hidroponik
              </p>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-2 justify-center">
                <PelindungControl />
                <PengadukControl />
                <PupukDaunControl />
                <PestisidaControl />
                <PompaControl />
                <SumberAir />
                <PembuanganAirKontainer />
                <PembuanganAirPipa />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 w-full sm:w-10/12 mx-auto text-sm outline outline-2 rounded-lg mt-4">
            <p className="font-semibold text-base sm:text-xl  pt-4">
              Manajemen Tanaman
            </p>
            <AddTanaman />
          </div>
          <div className="flex p-2 border mt-4 rounded-lg justify-center outline outline-2 items-center flex-col">
            <p className="font-semibold text-base sm:text-xl py-4">
              Monitoring Hidroponik
            </p>
            <div className="grid grid-cols-1 mb-2 sm:grid-cols-2 gap-4 w-full sm:w-[70%] items-center sm:mx-12">
              {renderProgressBar("Sisa Larutan Pupuk Daun", sisaPupukDaun, LocalFlorist)}
              {renderProgressBar("Sisa Larutan Pestisida", sisaPestisida, BugReport)}
            </div>
            <div className="grid grid-cols-1 mb-2 sm:grid-cols-4 gap-4  sm:w-[90%] w-full sm:mx-12">
              {renderProgressBar("Sisa Larutan Nutrisi AB", sisaNutrisiAB, Nature)}
              {renderProgressBar("Sisa Larutan pH Up", pHUp, Opacity)}
              {renderProgressBar("Sisa Larutan pH Down", pHDown, Opacity)}
              {renderProgressBar("Sisa Larutan Kontainer", sisaKontainer, WaterDrop)}
              {/* <div>
              {weatherInfo && (
                <Card className="flex flex-col items-center justify-center p-4 mt-4  w-full sm:mx-12 rounded-lg outline outline-2">
                  <p className="font-semibold text-md">Monitoring dan Kontrol Nutrisi</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <Image
                        src={`http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`}
                        alt={weatherInfo.weather[0].description}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <Typography variant="subtitle1">{weatherInfo.weather[0].description}</Typography>
                      <Typography variant="body2">{`Suhu: ${weatherInfo.main.temp} °C`}</Typography>
                      <Typography variant="body2">{`Kelembaban: ${weatherInfo.main.humidity}%`}</Typography>
                    </div>
                  </div>
                </Card>
              )}
              </div> */}
              <NutritionControl />
              <PhControl />
              <div className="col-span-1 sm:col-span-2">
                <SuhuControl />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 w-full sm:w-10/12 mx-auto text-sm mb-8 outline outline-2 rounded-lg mt-4">
            <p className="font-semibold text-base sm:text-xl  pt-4">
              Log Aktivitas
            </p>
            <LogActivity />
          </div>
        </>
      ) : (
        <div className="flex flex-col min-h-screen -mt-16 p-4 justify-center items-center gap-2">
          <Typography className="text-center">
            Anda tidak memiliki akses, silahkan{" "}
            <span className="font-bold text-emerald-500">Login</span>{" "}
            terlebih dahulu!
          </Typography>
          <AuthenticationForm />
        </div>
      )}
    </main>
  );
}
