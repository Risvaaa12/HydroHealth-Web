import {
    Image,
    Card,
    CardFooter,
  } from "@nextui-org/react";
  import TeamPic from "@/assets/images/components/TeamPic.jpg";
  
  export default function AboutUs() {
    return (
      <div className="p-8 flex flex-col gap-8 justify-center items-center px-12 max-w-screen-xl">
        <div>
            <h1 className="text-2xl font-bold text-center lg:text-4xl">About Us</h1>
        </div>
        <div className="pt-4 p-4 grid grid-cols-1 lg:grid-cols-2 gap-2  justify-center items-center max-w-screen-xl">
            <div className="flex flex-col grid-col-2  gap-2">
                <Card isFooterBlurred radius="lg" className="border-none">
              <div className="relative overflow-hidden rounded-inherit rounded-large">
                <Image
                  className="transform hover:scale-110 transition-transform-opacity object-cover"
                  alt="Next-Gen Hydroponics"
                  src={TeamPic.src}
                  width={700}
                  height={300}
                />
              </div>
              <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white p-2 text-center">
                    FTK Undiksha X Dago Engineering
                </p>
              </CardFooter>
            </Card>
          </div>
          <div>
            <p className="text-sm text-slate-800 p-2 sm:text-base text-center">
                Fakultas Teknik dan Kejuruan Universitas Pendidikan Ganesha melakukan
                kerja sama kolaborasi bersama dengan PT. Dago Engineering, Bandung.
                Sebagai bentuk penggunaan teknologi, MBKM ini mengusung tema Smart
                Green Garden yang berfokus pada sektor pertanian hidroponik dan sektor
                teknologi canggih yaitu Internet of Things (IoT), Artificial
                Intelligence (AI), dan pemanfaatan Energi Terbarukan dari sinar
                matahari menggunakan panel surya. Fakultas Teknik dan Kejuruan Universitas Pendidikan Ganesha melakukan
                kerja sama kolaborasi bersama dengan PT. Dago Engineering, Bandung.
                Sebagai bentuk penggunaan teknologi, MBKM ini mengusung tema Smart
                Green Garden yang berfokus pada sektor pertanian hidroponik dan sektor
                teknologi canggih yaitu Internet of Things (IoT), Artificial
                Intelligence (AI), dan pemanfaatan Energi Terbarukan dari sinar
                matahari menggunakan panel surya.
            </p>
        </div>
        </div>
      </div>
    );
  }
  