import {
    Image,
    Card,
    CardFooter,
  } from "@nextui-org/react";
  import TeamPic from "@/assets/images/components/TeamPic.jpg";
  
  export default function AboutUs() {
    return (
      <div className="flex flex-col gap-8 justify-center items-center max-w-screen-xl">
        <div>
            <h1 className="text-2xl font-bold text-center lg:text-4xl">About Us</h1>
            <p>Tentang Kita!</p>
        </div>
        <div className="pt-2 p-4 grid grid-cols-1 sm:grid-cols-2 gap-6  justify-center items-center max-w-screen-xl">
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
                    Iim Smart Green Garden
                </p>
              </CardFooter>
            </Card>
          </div>
          <div>
            <p className="text-sm text-slate-800 p-2 sm:text-base text-center">
            Fakultas Teknik dan Kejuruan Universitas Pendidikan Ganesha (FTK-Undiksha) telah menjalin kerja sama kolaborasi dengan PT. Dago Engineering yang berbasis di Bandung. Kerja sama ini bertujuan untuk mengembangkan penggunaan teknologi dalam program Merdeka Belajar Kampus Merdeka (MBKM). Salah satu inisiatif yang diusung dalam kolaborasi ini adalah tema Smart Green Garden.

            Program Smart Green Garden ini berfokus pada pengembangan sektor pertanian hidroponik yang memanfaatkan teknologi canggih. Teknologi yang diterapkan meliputi Internet of Things (IoT), yang memungkinkan pengawasan dan pengendalian sistem pertanian secara real-time; Artificial Intelligence (AI), yang membantu dalam pengambilan keputusan berbasis data untuk meningkatkan efisiensi dan produktivitas; serta pemanfaatan Energi Terbarukan dari sinar matahari melalui penggunaan panel surya.

            Kerja sama ini tidak hanya bertujuan untuk meningkatkan kualitas pendidikan dan penelitian di FTK-Undiksha, tetapi juga untuk memberikan kontribusi nyata dalam pengembangan teknologi pertanian yang berkelanjutan. Mahasiswa yang terlibat dalam program ini diharapkan dapat memperoleh pengalaman praktis dan pengetahuan yang mendalam tentang teknologi-teknologi terbaru, sehingga mereka siap untuk menghadapi tantangan di dunia kerja.
          
            </p>
        </div>
        </div>
      </div>
    );
  }
  