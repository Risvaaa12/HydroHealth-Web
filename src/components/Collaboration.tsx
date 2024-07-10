import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Card,
  CardFooter,
} from "@nextui-org/react";
import LogoUndiksha from "@/assets/images/logo/LogoUndiksha.png";
import LogoDagoEngineering from "@/assets/images/logo/LogoDagoEng.png";
import LogoCGPDagoEng from "@/assets/images/logo/LogoCGPDagoEng.png";
import LogoDelectra from "@/assets/images/logo/LogoDelectra.png";
import FTKxDago from "@/assets/images/components/FTKxDago.png";

export default function Collaboration() {
  return (
    <div className=" flex flex-col pb-8 gap-8 justify-center items-center  max-w-screen-xl" id="colab">
      <div className="pt-2 sm:pt-8 p-4 grid grid-cols-1 gap-2 sm:grid-cols-2 justify-center items-center max-w-screen-xl">
        <div>
          <div className="flex flex-col sm:flex-col-2 justify-center items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-center lg:text-4xl">Collaboration</h1>
              <p className="text-center">Kerjasama Dengan Industri!</p>
            </div>
        <div className="mt-2 flex flex-row justify-center items-center gap-4">
        <div className="flex flex-row justify-center items-center gap-2">
          <Popover placement="bottom" offset={10} showArrow>
            <PopoverTrigger>
              <div>
                <Image
                  width={80}
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="Undiksha"
                  src={LogoUndiksha.src}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 text-center">
                <div className="text-small font-bold">Undiksha</div>
                <div className="text-tiny">Fakultas Teknik dan Kejuruan</div>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="mt-1"
                >
                  <a target="_blank" href="https://undiksha.ac.id/">
                    Kunjungi
                  </a>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          {/* <Popover placement="bottom" offset={10} showArrow>
            <PopoverTrigger>
              <div>
                <Image
                  width={172}
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="PT. Dago Engineering"
                  src={LogoDagoEngineering.src}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 text-center">
                <div className="text-small font-bold">PT. Dago Engineering</div>
                <div className="text-tiny">Bandung</div>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="mt-1"
                >
                  <a target="_blank" href="https://dagoeng.co.id/">
                    Kunjungi
                  </a>
                </Button>
              </div>
            </PopoverContent>
          </Popover> */}
        </div>
        <div className="flex flex-row justify-center items-center gap-6">
          <Popover placement="bottom" offset={10} showArrow>
            <PopoverTrigger>
              <div>
                <Image
                  width={162}
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="Clean & Green Power"
                  src={LogoCGPDagoEng.src}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 text-center">
                <div className="text-small font-bold">Clean & Green Power</div>
                <div className="text-tiny">Bandung</div>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="mt-1"
                >
                  <a target="_blank" href="https://dagoeng.co.id/">
                    Kunjungi
                  </a>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover placement="bottom" offset={10} showArrow>
            <PopoverTrigger>
              <div>
                <Image
                  width={238}
                  className="transform hover:scale-105 transition-transform-opacity object-cover"
                  alt="Delectra"
                  src={LogoDelectra.src}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 text-center">
                <div className="text-small font-bold">Delectra</div>
                <div className="text-tiny">Bandung</div>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="mt-1"
                >
                  <a target="_blank" href="https://delectra.id/">
                    Kunjungi
                  </a>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

          </div>
          <div>
            <p className="text-center text-sm mt-4 sm:text-base">
            Fakultas Teknik dan Kejuruan Universitas Pendidikan Ganesha (FTK-Undiksha) telah menjalin kemitraan dengan PT. Dago Engineering di Bandung. Kolaborasi ini ditujukan untuk memanfaatkan teknologi dalam program Merdeka Belajar Kampus Merdeka (MBKM) dengan tema Smart Green Garden. Inisiatif ini menitikberatkan pada pengembangan pertanian hidroponik yang didukung oleh teknologi mutakhir seperti Internet of Things (IoT), kecerdasan buatan (AI), dan energi terbarukan yang dihasilkan melalui panel surya. Program ini bertujuan untuk mengintegrasikan teknologi tinggi dalam pertanian, meningkatkan efisiensi, serta mendukung praktik pertanian yang berkelanjutan dan ramah lingkungan.
            </p>
          </div>
        </div>
        <div className="flex flex-col mx-4 px-4 lg:mx-8 py-4 gap-6">
          <Card isFooterBlurred radius="lg" className="border-none">
            <div className="relative overflow-hidden rounded-inherit rounded-large">
              <Image
                className="transform hover:scale-110 transition-transform-opacity object-cover"
                alt="Next-Gen Hydroponics"
                src={FTKxDago.src}
                width={1200}
                height={300}
              />
            </div>
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80 p-2 text-center">
                FTK Undiksha X Dago Engineering
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
