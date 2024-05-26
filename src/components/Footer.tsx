import LogoHydroHealth2 from "../assets/images/logo/LogoHydroHealth2.png";
import { Image, Link } from "@nextui-org/react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShopIcon from '@mui/icons-material/Shop';
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function Footer() {
  return (
    <footer className="px-4 divide-y border-emerald-500 shadow shadow-emerald-400 divide-[rgb(128,168,105)] bg-[#e6ffd7]">
      <div className="container flex flex-col justify-center items-center py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <div className="flex justify-center space-x-3 lg:justify-center">
            <div className="flex flex-col gap-3">
              <div className="flex items-center shadow justify-center w-28 h-28 rounded-full bg-white mx-auto">
                <Image
                  className="h-20 w-auto"
                  src={LogoHydroHealth2.src}
                  alt="HydroHealth Logo"
                />
              </div>
              <span className="text-2xl font-semibold uppercase text-emerald-500">
                HydroHealth Project
              </span>
              <p className="text-tiny sm:text-lg text-center md:text-sm lg:text-sm xl:text-sm">
                &quot;Stay Healthy. All day, every day.&quot;
              </p>
              <div className="text-center">
                <ul className="flex justify-center space-x-4">
                  <li key="about">
                    <Link
                      rel="noopener noreferrer"
                      href="/about"
                      className="hover:text-emerald-400 transition-all ease-in-out"
                    >
                      About
                    </Link>
                  </li>
                  <li key="home">
                    <Link
                      rel="noopener noreferrer"
                      href="/#beranda"
                      className="hover:text-emerald-400 transition-all ease-in-out"
                    >
                      Home
                    </Link>
                  </li>
                  <li key="fitur">
                    <Link
                      rel="noopener noreferrer"
                      href="/blog"
                      className="hover:text-emerald-400 transition-all ease-in-out"
                    >
                      Contact
                    </Link>
                  </li>
                  <li key="feature">
                    <Link
                      rel="noopener noreferrer"
                      href="/#overview"
                      className="hover:text-emerald-400 transition-all ease-in-out"
                    >
                      Feature
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 text-sm gap-x-3 pt-4 gap-y-8 lg:w-2/3 sm:grid-cols-3 p-4 sm:p-0">
          <div className="space-y-3">
            <h3 className="tracki font-bold text-emerald-500">Keep In Touch!</h3>
            <div className="flex flex-col gap-1">
              <a
                rel="noopener noreferrer"
                href="/"
                target="_blank"
                title="playStore"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <ShopIcon />
                <p className="pl-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                  hydrohealth.mobile.app
                </p>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://instagram.com/hydrohealth.project"
                target="_blank"
                title="Instagram"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <InstagramIcon />
                <p className="pl-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                  @hydrohealth.project
                </p>
              </a>
              <a
                rel="noopener noreferrer"
                href="mailto:hydrohealth.team@gmail.com"
                target="_blank"
                title="Email"
                className="flex items-center py-0.5 hover:text-emerald-400 transition-all ease-in-out"
              >
                <MailOutlineIcon />
                <p className="pl-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm break-all">
                  hydrohealth.team@gmail.com
                </p>
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="tracki font-bold text-emerald-500 mb-3">
              Project Address
            </h3>
            <a
              className="text-base sm:text-sm md:text-sm lg:text-sm xl:text-sm hover:text-emerald-400 transition-all ease-in-out"
              href="https://maps.app.goo.gl/H2u9DoGydFsw6uu9A"
              target="_blank"
            >
              Universitas Pendidikan Ganesha Jinengdalem, Kecamatan Buleleng,
              Kabupaten Buleleng, Bali 81119
            </a>
          </div>
          <div className="space-y-3">
            <h3 className="tracki font-bold text-emerald-500 mb-3">
              Open in Google Map
            </h3>
            <iframe
              width="100%"
              height="100%"
              title="map"
              className="rounded-lg flex justify-center w-full lg:w-3/4"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.6861692693933!2d115.13055157575472!3d-8.133397481429773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd191df23585063%3A0xb4203c0eda012672!2sUndiksha%20Jinengdalem!5e0!3m2!1sid!2sid!4v1715692412864!5m2!1sid!2sid"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="py-4 text-[11px] text-center text-emerald-500">
        <p rel="noopener noreferrer">
          <a
            href="/"
            className="hover:text-emerald-400 transition-all ease-in-out"
          >
            &copy;2024 HydroHealth Project | All rights reserved
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
