"use client";
import Link from "next/link";
import HeroImage from "../assets/images/components/hero.png";
import LogoUndiksha from "../assets/images/logo/LogoUndiksha.png";
import LogoDagoEngPolos from "../assets/images/logo/LogoDagoEngPolos.png";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import React, { useState, useEffect } from 'react';
import AuthenticationForm from "./AuthenticationForm";

export default function Hero() {
  const [isClick, setClick] = useState(false);
  const isLogin = false;

  const toggleNavbar = () => {
    setClick(!isClick);
  };

  
  return (
    <div className="grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-3 auto-fit">
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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          <Link 
              href="/about"
              rel="noopener" 
              className="p-4 text-xs text-blue-500 underline hover:opacity-60 ">
              Selengkapnya ⇾
          </Link> 
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Image 
            src={HeroImage.src} 
            alt="Hero Image" 
            className="object-cover w-full h-full max-w-xs md:max-w-md lg:max-w-lg lg:hover:scale-110 transition-transform"
        />
      </div>
      <div className="mt-12 ml-6 lg:ml-24 lg:mt-28 ">
        <h1 className="text-4xl font-bold lg:text-5xl">About</h1>
        <h1 className="text-3xl font-bold lg:text-4xl">Us</h1>
        <p className="h-auto pb-6 text-xs text-justify md:text-sm lg:text-base w-80">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  
        <Link 
            href="/about"
            rel="noopener" 
            className="p-4 text-xs text-blue-500 underline hover:opacity-60 ">
            Selengkapnya ⇾
        </Link>
        </p>
          <button className=" bg-[#c2efa8] px-8 py-3 font-bold text-center rounded hover:opacity-70">
          <Link 
            href="/feature"
            rel="noopener" >
          </Link>
              Overview
          </button>
      </div>
    </div>
  );
}
