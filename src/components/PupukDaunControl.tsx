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

export default function PupukDaunControl () {
    const [isPupukDaun, setPupukDaun] = useState(0);
    const pupukRef = ref(database, "Kontrol_Panel/Misting Pupuk Daun");
    const [pupukValue, setPupukValue] = useState<number>(0);

    useEffect(() => {
        const pupukRef = ref(database, "Sensor/Monitoring/Sisa Pupuk Daun");
        onValue(pupukRef, (snapshot) => {
          const data = snapshot.val();
          const values = [data];
          setPupukValue(values[0]);
        });
      }, []);


    useEffect(() => {
      onValue(pupukRef, (snapshot) => {
        setPupukDaun(snapshot.val()); // update the local state with the database value
      });
    }, [pupukRef]);
  
    const handleManualToggle = () => {
      set(pupukRef, !isPupukDaun); // update the database value when the button is clicked
    };

    return (
        <div className="bg-green-200 m-2 w-50 sm:w-70 py-2 rounded-lg">
            <h1 className="font-bold text-center text-sm sm:text-base">Pupuk Daun</h1>
            <div className="flex flex-row gap-6  bg-green-200 p-2 rounded-lg justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2 text-sm">
                <p className="text-sm text-center">Sisa Pupuk Daun : {pupukValue} Liter</p>
                {/* <p className="text-sm text-center pb-2">Pupuk Dikendalikan otomatis</p> */}
                <div className="flex justify-center">
                    <Button size="sm" variant="faded" color="secondary" onPress={handleManualToggle}>
                    {isPupukDaun ? "Hidup" : "Mati"}
                </Button>
            </div>
            </div>
            </div>
        </div>
    );
}