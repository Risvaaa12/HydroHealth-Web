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

export default function PupukDaunControl () {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [pupukDaunValue, setPupukDaunValue] = useState(0);
    const [tempPupukDaunValue, setTempPupukDaunValue] = useState(0);
    const [isOtomatis, setOtomatis] = useState(true);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTempPupukDaunValue(Number(e.target.value));
    }

    function handleUpdateClick() {
    setPupukDaunValue(tempPupukDaunValue);
    }

    return (
        <div className="bg-green-200 m-2 w-50 sm:w-60 py-2 rounded-lg">
            <h1 className="font-bold text-center">Pupuk Daun</h1>
            <div className="flex flex-row gap-6  bg-green-200 p-2 rounded-lg justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2 text-sm">
                <p className="text-sm text-center pb-2">Pupuk Daun dikendalikan secara otomatis</p>
                <Button onPress={onOpen} size="sm"  variant="faded" color="secondary">
                    Atur Manual
                </Button>
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
                        Kontrol Pupuk Daun
                    </ModalHeader>
                    <ModalBody className="w-full">
                        <div className="flex flex-col justify-center items-center text-sm">
                        <p className="text-sm font-bold pb-2">
                            Atur Waktu Menyala Pupuk Daun
                        </p>
                        <p className="text-sm pb-2">
                            Durasi Menyala : {pupukDaunValue}
                        </p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-6 text-sm">
                        <Input
                            color="primary"
                            type="number"
                            label="Durasi Menyala (menit)"
                            value={tempPupukDaunValue.toString()}
                            onChange={handleInputChange}
                            className="w-1/2"
                        />
                        <Button variant="flat" color="primary" onPress={handleUpdateClick}>
                            Hidupkan
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