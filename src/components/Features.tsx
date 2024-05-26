import Topologi from "../assets/images/components/Topologi.jpg";
import {
  Button,
  Card,
  CardFooter,
  Image,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

const Feature1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const Feature2 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const Feature3 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const Feature4 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const Feature5 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const Feature6 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const Feature7 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const Feature8 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const Feature9 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export default function Features() {
  return (
    <div className="mt-12 sm:mt-24 ">
      <div className="flex flex-col justify-center items-center gap-1 ">
        <h1 className="font-bold text-2xl lg:text-4xl">Features</h1>
        <p>Produk Yang Kami Kerjakan!</p>
      </div>
      <div className="pt-2 sm:pt-8 p-4 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1 justify-center items-center max-w-screen-xl">
        <div className="flex flex-col">
          <Card isFooterBlurred radius="lg" className="border-none">
            <div className="relative overflow-hidden rounded-inherit rounded-large">
              <Image
                className="transform hover:scale-110 transition-transform-opacity object-cover"
                alt="Next-Gen Hydroponics"
                src={Topologi.src}
                width={800}
                height={400}
              />
            </div>
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-lg ml-1 z-10">
              <p className="text-tiny text-white p-2 text-center">
                Rancangan Kerangka Hidroponik
              </p>
            </CardFooter>
          </Card>
        </div>
        <div className="p-4 flex flex-col gap-2 justify-center items-center max-w-screen-xl">
          <div>
            <p className="text-center text-sm sm:text-base md:text-base lg:text-base xl:text-base">
              Fitur Utama dan Unggulan dari Kami
            </p>
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
                {Feature6}
              </AccordionItem>
              <AccordionItem
                key="7"
                aria-label="Accordion 7"
                title="Sistem Pengganti Air Otomatis"
              >
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
                title="Penyiraman Pestisida dan Pupuk Daun Otomatis "
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