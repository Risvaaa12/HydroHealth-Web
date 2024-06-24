"use client";
import Link from "next/link";
import HeroImage from "../assets/images/components/hero2.png";
import LogoUndiksha from "../assets/images/logo/LogoUndiksha.png";
import LogoDagoEngPolos from "../assets/images/logo/LogoDagoEngPolos.png";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import React, { useState, useEffect } from 'react';
import AuthenticationForm from "./AuthenticationForm";
import Lottie from '@lottielab/lottie-player/react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


export default function Hero() {
  const [isClick, setClick] = useState(false);
  const isLogin = false;

  const toggleNavbar = () => {
    setClick(!isClick);
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-16 md:grid-cols-3 lg:grid-cols-3 auto-fit">
      <div className="ml-6 lg:ml-16 ">
        <h1 className="text-3xl lg:-ml-2 font-bold lg:text-5xl">Collaboration</h1>
        <div className="flex p-4 ml-4 pl-0 lg:pl-6">
            <Image
                src={LogoUndiksha.src} 
                alt="Logo Undiksha" 
                className="w-auto h-16 lg:h-24"
            />
            <Image
                src={LogoDagoEngPolos.src} 
                alt="Logo Dago Eng" 
                className="w-auto h-16 lg:h-24"
            />
        </div>
        <p className="h-auto text-xs text-justify md:text-sm lg:text-base w-80">
        Fakultas Teknik dan Kejuruan Universitas Pendidikan Ganesha (FTK-Undiksha) telah menjalin kemitraan dengan PT. Dago Engineering di Bandung. Kolaborasi ini ditujukan untuk memanfaatkan teknologi dalam program Merdeka Belajar Kampus Merdeka (MBKM) dengan tema Smart Green Garden. Inisiatif ini menitikberatkan pada pengembangan pertanian hidroponik.
          <Link 
              href="/about"
              rel="noopener" 
              className="p-4 text-xs text-blue-500 underline hover:opacity-60 ">
              Selengkapnya &#8594;
          </Link> 
        </p>
      </div>
      <div className="flex flex-col ml-0 sm:-ml-16 justify-center w-full sm:w-[130%] h-auto items-center">
        <Image 
            src={HeroImage.src} 
            alt="Hero Image" 
            className="object-cover w-full h-full lg:hover:scale-110 transition-transform"
        />
        {/* <div className="w-full">
          <Lottie src="https://cdn.lottielab.com/l/DgQH6fWfyN7kmq.json" autoplay />
        </div> */}
        <button className=" bg-[#c2efa8] px-8 py-2 font-bold text-center rounded-lg hover:opacity-70">
          <Link 
            href="/#"
            rel="noopener" >
          </Link>
             Download <CloudDownloadIcon/>
          </button>
      </div>
      <div className="mt-12 ml-6 lg:ml-24 lg:mt-28 ">
        <h1 className="text-4xl font-bold lg:text-5xl">About</h1>
        <h1 className="text-3xl font-bold lg:text-4xl">Us</h1>
        <p className="h-auto pb-6 text-xs text-justify md:text-sm lg:text-base w-80">
        Mahasiswa Fakultas Teknik dan Kejuruan Universitas Pendidikan Ganesha (FTK-Undiksha) yang tergabung dalam Program MBKM PT. Dago Engineering, Bandung, dalam program Merdeka Belajar Kampus Merdeka (MBKM). Program ini mengusung tema Smart Green Garden yang berfokus pada sektor pertanian hidroponik dan teknologi canggih seperti Internet of Things (IoT), Artificial Intelligence (AI), dan pemanfaatan energi terbarukan melalui panel surya.
        <Link 
            href="/about"
            rel="noopener" 
            className="p-4 text-xs text-blue-500 underline hover:opacity-60 ">
            Selengkapnya &#8594;
        </Link>
        </p>
      </div>
    </div>
  );
}
