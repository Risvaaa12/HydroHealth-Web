"use client";
import * as React from "react";
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
import HistoryTanaman from "@/components/HistoryTanaman";
import PembuanganAirPipa from "@/components/PembuanganAirPipa";
import SumberAir from "@/components/SumberAirControl";
import PembuanganAirKontainer from "@/components/PembuanganAirKontainer";
import Classify from "@/components/Classify";
import { useEffect, useState } from "react";
import AlertCheckAuth from "@/components/AlertCheckAuth";
import AlertLoginGuest from "@/components/AlertLoginGuest";
import AlertAuthorizedMember from "@/components/AlertAuthorizedMember";
import AddTanaman from "@/components/AddTanaman";

export default function Monitoring() {
  const user = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  if (isCheckingAuth) {
    return <AlertCheckAuth />;
  }

  if (!user) {
    return <AlertLoginGuest />;
  }

  if (!isAuthorized) {
    return <AlertAuthorizedMember />;
  }

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
          <div className="flex p-2 border mt-4 rounded-lg justify-center outline outline-2 mb-8 items-center flex-col">
            <p className="font-semibold text-base sm:text-xl py-4">
              Monitoring Hidroponik
            </p>
            <div className="grid pt-2 grid-cols-1 mb-12 sm:grid-cols-4 gap-4 sm:gap-8 sm:w-[90%] w-full sm:mx-12">
              <NutritionControl />
              <PhControl />
              <div className="col-span-1 sm:col-span-2">
                <SuhuControl />
              </div>
            </div>
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
