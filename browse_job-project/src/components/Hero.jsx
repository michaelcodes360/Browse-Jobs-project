import ImageSlideshow from "./ImageSlideshow";
import guyAndLady from "../assets/images/a guy and a lady.jpg";
import asianLady from "../assets/images/asian lady.jpg";
import blackLady from "../assets/images/black lady.jpg";
import bothHappy from "../assets/images/both happy.jpg";
import groupOfYouths from "../assets/images/group of youths.jpg";
import happyGirl from "../assets/images/happy girl.jpg";
import jobOffer from "../assets/images/job offer.jpg";
import joyousPeople from "../assets/images/joyous people.jpg";
import randomHappyLady from "../assets/images/random happy lady.jpg";
import britiangirl from "../assets/images/happy britian girl.jpg";
import onHisLaptop from "../assets/images/on his laptop.jpg";
import prettyWhiteGirl from "../assets/images/prettyWhiteGirl.jpg";
import tallBuilding from "../assets/images/tall building.jpg";
import tallBuilding2 from "../assets/images/tall building 2.jpg";

import { BlurFade } from "./ui/blur-fade";

const heroSlides = [
  { src: guyAndLady },
  { src: happyGirl },
  { src: bothHappy },
  { src: joyousPeople },
  { src: blackLady },
  { src: asianLady },
  { src: britiangirl },
  { src: prettyWhiteGirl },
  { src: randomHappyLady },
  { src: jobOffer },
  { src: onHisLaptop },
  { src: groupOfYouths },
  { src: tallBuilding },
  { src: tallBuilding2},
];

const Hero = ({
  title = "Your Next Gig Awaits",
  subtitle = "Find Work. Hire Fast. Hustle Smarter",
}) => {
  return (
    <section className="hero-section relative isolate flex h-[40rem] items-center overflow-hidden bg-indigo-950 shadow-2xl md:h-[42rem] lg:h-[46rem]">
      <ImageSlideshow
        images={heroSlides}
        intervalDuration={20000}
        objectFit="cover"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 z-10 bg-slate-950/45" />

      <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-4 p b-20 text-center sm:px-6 lg:px-8 mb-20">
        <BlurFade delay={2}inView>
          <h1 className="heroText text-4xl font-extrabold text-white bg-gradient-to-tr  sm:text-5xl md:text-6xl">
          {title}
        </h1>
        </BlurFade>
         
        <BlurFade delay={2.8}>
        <p className="heroText my-4 text-xl text-white">{subtitle}</p>
        </BlurFade>
      </div>

      <div className="custom-shape-divider-bottom-1789482998" aria-hidden="true">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
