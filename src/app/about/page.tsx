import GalleryInstagram from "../../components/GalleryInstagram";
import Collaboration from "@/components/Collaboration";
import AboutUs from "@/components/AboutUs";

export default function Blog() {
  return (
    <div className="flex flex-col justify-center items-center text-center pt-8 pb-8">
      <AboutUs/>
      <Collaboration/>
      <div className="flex flex-col gap-1 pt-8 pb-8">
        <h1 className="font-bold text-2xl lg:text-4xl">Publikasi Kegiatan</h1>
        <p>Ikuti Keseruan Kegiatan Kami</p>
      </div>
      <GalleryInstagram />
    </div>
  );
}
