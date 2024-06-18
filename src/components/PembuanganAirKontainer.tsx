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

export default function PembuanganAirKontainer() {
  const [isSelenoidValve, setIsSelenoidValve] = useState(false); 

  const handleManualToggle = () => {
    setIsSelenoidValve(!isSelenoidValve);
  };

  return (
    <div className="bg-green-200 m-2 w-50 sm:w-60 py-2 rounded-lg">
      <h1 className="font-bold text-center">Pengurasan Air Kontainer</h1>
      <div className="flex flex-row gap-6 bg-green-200 p-2 rounded-lg justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2 text-sm">
            <div className="flex flex-col justify-center items-center text-sm">
                <p className="text-sm text-center pb-2">Kontrol Air Kontainer</p>
                </div>
                <div className="flex justify-center">
                <Button size="sm"  variant="faded" color="secondary" onPress={handleManualToggle}>
                    {isSelenoidValve ? "Hidup" : "Mati"}
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
