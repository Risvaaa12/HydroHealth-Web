"use client";
import * as React from "react";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "@/middleware/AuthenticationProviders";
import {
  Button,
  Input,
  Slider,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {
  ref,
  get,
  getDatabase,
  onValue,
  query,
  limitToLast,
} from "firebase/database";
import { useEffect, useState } from "react";
import AuthenticationForm from "../../components/AuthenticationForm";
import Image from "next/image";
import MemoryIcon from "@mui/icons-material/Memory";
import WifiIcon from "@mui/icons-material/Wifi";
import SpeedIcon from "@mui/icons-material/Speed";
import NutritionChart from "../../components/NutritionCharts";

export default function Dashboard() {
  const user = useAuth();
  const [loadingSuhu, setLoadingSuhu] = React.useState(false);
  const [loadingPH, setLoadingPH] = React.useState(false);
  const [isSelectedNFTDFT, setIsSelectedNFTDFT] = React.useState(true);
  const [isSelectedManualOtomatis, setIsSelectedManualOtomatis] =
    React.useState(true);
  const [isSelectedNutrisi, setIsSelectedNutrisi] = React.useState(true);
  const [isSelectedLampu, setIsSelectedLampu] = React.useState(true);
  const [isSelectedAI, setIsSelectedAI] = React.useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [nutrisiValue, setNutrisiValue] = useState(0);
  const [tempNutrisiValue, setTempNutrisiValue] = useState(0);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTempNutrisiValue(Number(e.target.value));
  }

  function handleUpdateClick() {
    setNutrisiValue(tempNutrisiValue);
  }

  useEffect(() => {
    const db = getDatabase();
    const photosRef = ref(db, "esp32cam");
    const latestPhotoQuery = query(photosRef, limitToLast(1));

    const unsubscribe = onValue(latestPhotoQuery, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const base64String = childSnapshot.val().photo;
        if (base64String) {
          setImageUrl(`data:image/png;base64,${base64String}`);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  function handleSuhu() {
    setLoadingSuhu(true);
  }
  function handlePH() {
    setLoadingPH(true);
  }
  

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <main className="flex flex-col justify-center items-center gap-3 pt-8 pb-8">
      {user ? (
        <>
          <div className="text-center p-4 gap-2">
            <p className="text-x sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold pb-2">
              Selamat datang di <span className="font-bold text-emerald-500">Monitoring</span> Page, {user ? user.displayName : ""}👋
            </p>
            <p>Jaga Kestabilan Hidroponikmu Seperti Kamu Menjaga Kestabilan Hatinya</p>  
          </div>

          <div className="p-4 grid grid-cols-1 grid-rows-6 gap-6 sm:grid-cols-3 sm:grid-rows-2 sm:gap-6 md:grid-cols-3 md:grid-rows-2 md:gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6 xl:grid-cols-3 xl:grid-rows-2 xl:gap-6">
            <div
              id="nutrisi"
              className="bg-green-100 p-6 rounded-xl text-center flex flex-col justify-center items-center"
            >
              <p className="font-semibold text-md">
                Monitoring dan Kontrol Nutrisi
              </p>
              <div>
                <div className="flex flex-row gap-6 mt-4 mb-4 bg-green-200 p-4 rounded-lg justify-center items-center">
                  <div className="flex flex-row justify-center items-center gap-2 text-sm">
                    <Switch
                      size="sm"
                      isSelected={isSelectedNutrisi}
                      onValueChange={setIsSelectedNutrisi}
                      defaultSelected
                      color="success"
                    >
                      {isSelectedNutrisi ? "Otomatis" : "Manual"}
                    </Switch>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-1 text-sm bg-green-300 p-2 rounded-lg">
                    <p>Nutrisi: {nutrisiValue}</p>
                    
                  </div>
                </div>
                {isSelectedNutrisi ? (
                  <div>
                    <p className="text-sm pb-3">
                      Nutrisi dikendalikan secara otomatis
                    </p>
                    <Button
                      onPress={onOpen}
                      size="sm"
                      color="primary"
                      variant="flat"
                    >
                      Lihat History 
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col justify-center items-center text-sm">
                      <p className="text-sm pb-3">
                        Atur Jumlah Nutrisi Yang Dibutuhkan
                      </p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-6 text-sm ">
                      <Input
                        color="default"
                        type="number"
                        label="Jumlah Nutrisi"
                        value={tempNutrisiValue.toString()}
                        onChange={handleInputChange}
                        className="w-1/2"
                      />
                      <Button 
                        variant="flat" 
                        color="default" 
                        onPress={handleUpdateClick}>
                        Update
                      </Button>
                    </div>
                    <div className="pt-4">
                      <Button
                        onPress={onOpen}
                        size="sm"
                        color="primary"
                        variant="flat"
                      >
                        Lihat History
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Modal
              isOpen={isOpen}
              placement="center"
              backdrop="blur"
              onOpenChange={onOpenChange}
              size="xl"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      History Nutrisi
                    </ModalHeader>
                    <ModalBody className="w-full">
                      <NutritionChart/>
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
