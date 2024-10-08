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

export default function PestisidaControl () {
    const [isPestisida, setpestisida] = useState(0);
    const pestisidaRef = ref(database, "Kontrol_panel/Misting_pestisida");
    const [pestisidaValue, setPestisidaValue] = useState<number>(0);

    useEffect(() => {
        const pestisidaRef = ref(database, "Sensor/Monitoring/Sisa Pestisida");
        onValue(pestisidaRef, (snapshot) => {
          const data = snapshot.val();
          const values = [data];
          setPestisidaValue(values[0]);
        });
      }, []);


    useEffect(() => {
      onValue(pestisidaRef, (snapshot) => {
        setpestisida(snapshot.val()); // update the local state with the database value
      });
    }, [pestisidaRef]);
  
    const handleManualToggle = () => {
      set(pestisidaRef, !isPestisida); // update the database value when the button is clicked
    };

    return (
        <div className="bg-green-200 m-2 w-50 sm:w-70 py-2 rounded-lg">
            <h1 className="font-bold text-center text-sm sm:text-base">Pestisida</h1>
            <div className="flex flex-row gap-6  bg-green-200 p-2 rounded-lg justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2 text-sm">
                <p className="text-sm text-center">Pestisida dari Misting</p>
                {/* <p className="text-sm text-center pb-2">Pestisida dikendalikan otomatis</p> */}
                <div className="flex justify-center">
                    <Button size="sm" variant="faded" color="secondary" onPress={handleManualToggle}>
                    {isPestisida ? "Hidup" : "Mati"}
                </Button>
            </div>
            </div>
            </div>
        </div>
    );
}