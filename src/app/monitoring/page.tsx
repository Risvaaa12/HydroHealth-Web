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
import SmartCameraControl from "../../components/SmartCamera";
import {
  Image,
  Card,
  CardFooter,
} from "@nextui-org/react";

export default function Monitoring() {
  const user = useAuth();

  return (
    <main className="flex flex-col justify-center mx-2 items-center gap-3 pb-6">
      {user ? (
        <>
          <div className="flex flex-col pb-4 gap-8 justify-center items-center px-4 max-w-screen-xl">
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6  justify-center items-center max-w-screen-xl">
              <SmartCameraControl/>
              <div>
              <p className="text-x sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold pb-2">
                Selamat datang di <span className="font-bold text-emerald-500">Monitoring</span> Page, {user ? user.displayName : ""}👋
              </p>
              <p className="text-base text-slate-700"> Tetap Jaga Kestabilan Hidroponikmu!</p>
              </div>  
            </div>
          </div>
          <div className="grid grid-cols-2 pb-4 sm:grid-cols-4 gap-2 sm:gap-8">
            <NutritionControl />
            <PhControl />
            <div className="col-span-2">
              <SuhuControl />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-4">
            <div className="grid grid-cols-2 gap-1 sm:grid sm:grid-cols-4 sm:grid-rows-1 sm:gap-2 justify-center">
              <PompaControl />
              <PengadukControl />
              <PelindungControl />
              <PestisidaControl />
            </div>
            <div className="flex flex-col justify-center">
              <PupukDaunControl />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col min-h-screen -mt-16 p-4 justify-center items-center gap-2">
          <Typography className="text-center">
            Anda tidak memiliki akses, silahkan <span className="font-bold text-emerald-500">Login</span> terlebih dahulu!
          </Typography>
          <AuthenticationForm />
        </div>
      )}
    </main>
  );
}
