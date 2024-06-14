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
import Camera2 from "../../components/Camera2";
import Camera1 from "../../components/Camera1";
import {
  Button,
  useDisclosure,
  Image,
  Card,
  CardFooter,
} from "@nextui-org/react";
import HistoryTanaman from "@/components/HistoryTanaman";

export default function Monitoring() {
  const user = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <main className="flex flex-col justify-center mx-2 items-center gap-3 ">
      {user ? (
        <>
          
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col mt-12 justify-center items-center px-4 max-w-screen-xl">
                <p className="text-x text-center sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold pb-2">
                  Selamat datang di <span className="font-bold text-emerald-500">Monitoring</span> Page, {user ? user.displayName : ""}👋
                </p>
                <p className="text-base pb-4 text-slate-700"> Tetap Jaga Kestabilan Hidroponikmu!</p>  
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4  justify-center items-center w-3/4">
              <Camera1/>
              <Camera2/>
              {/* <HistoryTanaman/> */}
            </div>
            {/* <div>
              <Button onPress={onOpen} variant="faded" color="secondary">
                  Classification
              </Button>
            </div> */}
          </div>
          <div className="grid grid-cols-2 pb-4 sm:grid-cols-4 gap-2 sm:gap-8">
            <NutritionControl />
            <PhControl />
            <div className="col-span-2">
              <SuhuControl />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center items-center pb-6 gap-4">
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
