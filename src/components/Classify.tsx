"use client";
import React, { useState } from "react";
import {
  Image,
  Card,
  CardFooter,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import TeamPic from "@/assets/images/components/TeamPic.jpg";
import axios from 'axios';

export default function Classify() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageSrc, setImageSrc] = useState<string>(TeamPic.src);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [classificationResult, setClassificationResult] = useState<string>('');

  const handleChooseImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://hydrohealth.dev.smartgreenovation.com/upload/classify', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json',
          },
        });

        if (response.status === 200) {
          const { predicted_class, probability } = response.data;
          // Convert probability to percentage
          const probabilityPercentage = (probability * 100).toFixed(2);
          setClassificationResult(`${predicted_class}(${probabilityPercentage}%)`);
        } else {
          alert(`Failed to classify image. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error('Error classifying image:', error);
        alert('Failed to classify image.');
      }
    }
  };

  const handleClearImage = () => {
    setImageSrc(TeamPic.src);
    setSelectedFile(null);
    setClassificationResult('');
  };

  return (
    <>
      <div className="flex flex-col justify-center w-full h-full sm:h-3/4">
        <Button onPress={onOpen} variant="faded" color="secondary">
          Classification
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        onClose={onClose}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Klasifikasi Penyakit Tanaman
          </ModalHeader>
          <ModalBody className="w-full">
            <div className="flex flex-col justify-center items-center ">
              <Card
                isFooterBlurred
                radius="lg"
                className="border-none flex w-3/4 h-full justify-center items-center"
              >
                <div className="relative overflow-hidden rounded-inherit rounded-large">
                  <Image
                    className="transform transition-transform-opacity object-cover"
                    alt="Selected Image"
                    src={imageSrc}
                    width={700}
                    height={300}
                  />
                </div>
                <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-lg ml-1 z-10">
                  {classificationResult && (
                    <div className="text-base text-white p-2 text-center">
                      <p className="font-bold">Hasil Klasifikasi: {classificationResult}</p>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleChooseImage}
              style={{ display: "none" }}
              id="file-input"
            />
            <label htmlFor="file-input" className="w-full">
              <Button as="span" variant="faded" color="secondary" className="w-full">
                Choose Image
              </Button>
            </label>
            <Button onPress={handleClearImage} variant="faded" color="secondary" className="w-full">
              Clear Image
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
