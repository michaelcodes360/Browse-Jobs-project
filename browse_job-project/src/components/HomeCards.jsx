import { useEffect, useRef, useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import Card from "./Cards";
import { Link } from "react-router-dom";
import { BsBuildingsFill } from "react-icons/bs";
import { BlurFade } from "./ui/blur-fade";

const HomeCards = () => {
  const cardsRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(false);

  useEffect(() => {
    const cardsSection = cardsRef.current;
    if (!cardsSection) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setVisibleCards(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCards(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(cardsSection);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="home-cards-section py-16 sm:py-20">
        <div className="home-cards-intro mx-auto mb-10 max-w-3xl px-5 text-center sm:mb-12 ">
          {/* <p className="home-cards-eyebrow mb-3 text-xs font-bold uppercase">
            Your next move starts here
          </p> */}
          <BlurFade delay={0.5} inView>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Connect Talent.{" "}
              <span className="text-blue-500">Create Opportunities.</span>
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.9} inView>
            <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Your one-stop platform for job seekers and recruiters. Explore a
            wide range of job opportunities or post your own listings to find
            the perfect talent. Start your journey with Gigs Hub today!
          </p>
          </BlurFade>
          
        </div>

        <div className="container-xl lg:container m-auto bg-zinc-950/5 rounded-lg p-12 sm:p-6 md:p-14">
          <div
            ref={cardsRef}
            className={`home-cards-grid grid grid-cols-1 gap-5 rounded-lg p-4 md:grid-cols-2 ${visibleCards ? "cards-visible" : ""}`}
          >
            <div className="home-card-reveal" style={{ "--card-delay": "0ms" }}>
              <Card bg={"home-card home-card-jobs bg-gray-100"}>
                <h3 className="flex items-center gap-4 text-2xl font-bold text-slate-900">
                  {/* <FaUsers color="blue" /> */}
                  <span className=" bg-blue-200 p-2 circleBorder">
                    <BsBuildingsFill size={23} color="blue" />
                  </span>
                  Jobs
                </h3>
                <p className="mt-4 mb-7 max-w-md leading-7 text-slate-600">
                  Browse our jobs and start your career today
                </p>
                <Link
                  to="/jobs"
                  className="home-card-action inline-flex items-center justify-center bg-slate-950 text-white"
                >
                  Browse Jobs
                </Link>
              </Card>
            </div>
            <div
              className="home-card-reveal"
              style={{ "--card-delay": "120ms" }}
            >
              <Card bg={"home-card home-card-recruiter bg-indigo-100"}>
                <h3 className="flex items-center gap-4 text-2xl font-bold text-slate-900">
                  <span className=" bg-indigo-300 p-2 circleBorder">
                    <FaUserTie size={21} className="text-indigo-800" />
                  </span>
                  Recruiter
                </h3>
                <p className="mt-4 mb-7 max-w-md leading-7 text-slate-600">
                  List your job to find the perfect talent for the role
                </p>
                <Link
                  to="/add-job"
                  className="home-card-action inline-flex items-center justify-center bg-indigo-600 text-white"
                >
                  Add Job
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCards;
