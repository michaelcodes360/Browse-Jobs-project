import heroBackgound from "../assets/images/hero_background.jpg";

const Hero = ({
  title = "Your Next Gig Awaits",
  subtitle = "Find Work. Hire Fast. Hustle Smarter",
}) => {
  return (
    <>
      <section className="bg-indigo-600  py-20 mb-4 backgroundImage shadow-lg h-96" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* <img src={heroBackgound} alt="Hero Background" /> */}
          <div className="text-center mt-12">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl heroText">
              {title}
            </h1>
            <p className="my-4 text-xl text-white heroText">{subtitle}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
