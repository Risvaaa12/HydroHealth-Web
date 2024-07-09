"use client";
import * as React from "react";
import {
  Button,
  Input,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig"; // import the database instance
import { ref, onValue, set } from "firebase/database";

export default function PengadukControl () {
    const [isPengadukKontainer, setPengadukKontainer] = useState(0);
    const pengadukRef = ref(database, "Kontrol_Panel/Pengaduk Larutan");
    const [larutanValue, setLarutanValue] = useState<number>(0);

    useEffect(() => {
        const larutanRef = ref(database, "Sensor/Monitoring/Sisa Larutan Kontainer");
        onValue(larutanRef, (snapshot) => {
          const data = snapshot.val();
          const values = [data];
          setLarutanValue(values[0]);
        });
      }, []);


    useEffect(() => {
      onValue(pengadukRef, (snapshot) => {
        setPengadukKontainer(snapshot.val()); // update the local state with the database value
      });
    }, [pengadukRef]);
  
    const handleManualToggle = () => {
      set(pengadukRef, !isPengadukKontainer); // update the database value when the button is clicked
    };

    return (
        <div className="bg-green-200 m-2 w-50 sm:w-70 py-2 rounded-lg">
            <h1 className="font-bold text-center text-sm sm:text-base">Pengaduk Kontainer Larutan</h1>
            <div className="flex flex-row gap-6  bg-green-200 p-2 rounded-lg justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2 text-sm">
                <p className="text-sm text-center">Pengaduk dikendalikan otomatis</p>
                {/* <p className="text-sm text-center pb-2">Pengaduk dikendalikan otomatis</p> */}
                <div className="flex justify-center">
                    <Button size="sm" variant="faded" color="secondary" onPress={handleManualToggle}>
                    {isPengadukKontainer ? "Hidup" : "Mati"}
                </Button>
            </div>
            </div>
            </div>
        </div>
    );
}