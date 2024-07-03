import Topologi from "../assets/images/components/Topologi.jpg";
import { Button, Card, CardFooter, Image, Accordion, AccordionItem } from "@nextui-org/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Feature1 = "Monitoring menggunakan kamera bertujuan untuk memantau perkembangan dan pertumbuhan tanaman, kamera juga berfungsi sebagai pendeteksi ada tidaknya hama serta digunakan untuk klasifikasi penyakit tanaman";
const Feature2 = "Fitur ini merupakan fitur utama dengan menggunakan metode Deep Learning Model yang mengahasilkan object Detection untuk Hama dan Classification untuk menentukan penyakit tanaman";
const Feature3 = "Nutrisi tanaman sangat penting untuk diperhatikan oleh petani, oleh karena itu monitoring dan kontrol nutrisi tanaman sangat penting. Monitoring dan Kontrol ini melibatkan perangkat IOT yaitu Senor TDS untuk melihat data PPM dari Air Hidroponik yang nantinya penyesuaian nutrisi disesuaikan dengan kebutuhan tanaman menggunakan dosing pump yang dapat dikontrol melalui perangkat web mobile.";
const Feature4 = "Suhu udara merupakan salah satu part yang berpengaruh dalam bertani, suhu yang tidak sesuai akan membuat tanaman menjadi terhambat pertumbuhannya, maka dari itu monitoring suhu udara sangat penting untuk diperhatikan, menggunakan IOT yang terintegrasi dengan aplikasi kita bisa memonitoring suhu";
const Feature5 = "Monitoring dan Kontrol pH air perlu dilakukan untuk menjaga kestabilan pH, tanaman memerlukan pH air normal untuk pertumbuhanya, menggunakan sensor pH yang terhubung ke aplikasi akan memudahkan kontrol pH";
const Feature7 = "Pengganti air otomatis yang diatur menggunakan mikrokontroler yang terhubung ke relay yang dapat diatur waktu menyalanya.";
const Feature8 = "Pelindung hama bekerja menggunakan servo untuk menutup hidroponik saat malam hari agar terhindar dari hama yang dapat merusak tanaman.";
const Feature9 = "Fitur ini bekerja untuk pemberian pupuk dan pestisida otomatis yang diatur rentang waktunya melalui mikrokontroller.";

const carouselImages = [
  {
    src: Topologi.src,
    alt: "Rancangan Kerangka Hidroponik 1"
  },
  {
    src: Topologi.src,
    alt: "Rancangan Kerangka Hidroponik 2"
  },
  {
    src: Topologi.src,
    alt: "Rancangan Kerangka Hidroponik 3"
  }
];

export default function Features() {
  return (
    <div className="flex flex-col gap-8 justify-center pb-12 pt-4 items-center max-w-screen-xl">
      <div className="pt-2 p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center items-center max-w-screen-xl">
        <div className="flex flex-col">
          <Card isFooterBlurred radius="lg" className="border-none">
            <div className="relative overflow-hidden rounded-inherit rounded-large">
              <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
              >
                {carouselImages.map((image, index) => (
                  <div key={index}>
                    <Image
                      className="transform hover:scale-110 transition-transform-opacity object-cover"
                      alt={image.alt}
                      src={image.src}
                      width={800}
                      height={400}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-lg ml-1 z-10">
              <p className="text-tiny text-white p-2 text-center">
                Rancangan Kerangka Hidroponik
              </p>
            </CardFooter>
          </Card>
        </div>
        <div className="p-4 flex flex-col gap-2 justify-center items-center max-w-screen-xl">
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="font-bold text-2xl lg:text-4xl">Features</h1>
            <p>Produk Yang Kami Kerjakan!</p>
          </div>
          <div className="mt-2 w-full sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-6 text-sm bg-[#e6ffd7] p-2 rounded-lg">
            <Accordion isCompact>
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Monitoring Tanaman Dengan Kamera"
              >
                {Feature1}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="Deteksi Hama dan Penyakit Tanaman Menggunakan AI"
              >
                {Feature2}
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Monitoring & Kontrol Nutrisi Tanaman"
              >
                {Feature3}
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="Accordion 4"
                title="Monitoring Suhu Udara"
              >
                {Feature4}
              </AccordionItem>
              <AccordionItem
                key="5"
                aria-label="Accordion 5"
                title="Monitoring & Kontrol pH Air"
              >
                {Feature5}
              </AccordionItem>
              <AccordionItem
                key="6"
                aria-label="Accordion 6"
                title="Sistem Notifikasi Melalui Mobile Apps"
              >
                {/* {Feature6}
              </AccordionItem>
              <AccordionItem
                key="7"
                aria-label="Accordion 7"
                title="Sistem Pengganti Air Otomatis"
              > */}
                {Feature7}
              </AccordionItem>
              <AccordionItem
                key="8"
                aria-label="Accordion 8"
                title="Sistem Pelindung Hama Otomatis"
              >
                {Feature8}
              </AccordionItem>
              <AccordionItem
                key="9"
                aria-label="Accordion 9"
                title="Penyiraman Pestisida dan Pupuk Daun Otomatis"
              >
                {Feature9}
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
