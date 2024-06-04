"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Divider } from "@mui/material";

export default function PelindungControl() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pelindungValueHidup, setPelindungValueHidup] = useState("");
  const [tempPelindungValueHidup, setTempPelindungValueHidup] = useState("");
  const [pelindungValueMati, setPelindungValueMati] = useState("");
  const [tempPelindungValueMati, setTempPelindungValueMati] = useState("");
  const [isPelindungOpen, setIsPelindungOpen] = useState(false); 

  const handleInputChangeHidup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempPelindungValueHidup(e.target.value);
  };

  const handleInputChangeMati = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempPelindungValueMati(e.target.value);
  };

  const handleUpdateClick = () => {
    setPelindungValueHidup(tempPelindungValueHidup);
    setPelindungValueMati(tempPelindungValueMati);
  };

  const handleManualToggle = () => {
    setIsPelindungOpen(!isPelindungOpen);
  };

  return (
    <div className="bg-green-200 m-2 w-60 py-2 rounded-lg">
      <h1 className="font-bold text-center">Pelindung Hama</h1>
      <div className="flex flex-row gap-6 bg-green-200 p-2 rounded-lg justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2 text-sm">
          <p className="text-sm text-center pb-2">Pelindung dikendalikan secara otomatis</p>
          <Button onPress={onOpen} size="sm"  variant="faded" color="secondary">
            Atur Manual
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} placement="center" backdrop="blur" onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Kontrol Pelindung</ModalHeader>
              <ModalBody className="w-full flex flex-col items-center">
                <div className="flex flex-col justify-center items-center text-sm">
                  <p className="text-sm font-bold pb-2">Buka atau Tutup Pelindung Manual</p>
                </div>
                <div className="flex justify-center">
                  <Button variant="flat" color="primary" onPress={handleManualToggle}>
                    {isPelindungOpen ? "Tutup Pelindung" : "Buka Pelindung"}
                  </Button>
                </div>
                <Divider className="text-xs bg-slate-500"></Divider>
                <div className="flex justify-center items-center text-sm">
                  <p className="text-sm font-bold">Atur Waktu Menyala dan Mati Pelindung</p>
                </div>
                <div className="flex justify-center  items-center">
                  <p className="text-sm px-2">Jam Terbuka: {pelindungValueHidup}</p>
                  <p className="text-sm px-2">Jam Tertutup: {pelindungValueMati}</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-6 text-sm">
                  <Input
                    color="default"
                    type="number"
                    label="Buka"
                    value={tempPelindungValueHidup}
                    onChange={handleInputChangeHidup}
                    className="w-1/2"
                  />
                  <Input
                    color="default"
                    type="number"
                    label="Tutup"
                    value={tempPelindungValueMati}
                    onChange={handleInputChangeMati}
                    className="w-1/2"
                  />
                </div>
                <div className="flex justify-center">
                  <Button variant="flat" color="primary" onPress={handleUpdateClick}>
                    Atur Waktu
                  </Button>
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
    </div>
  );
}
