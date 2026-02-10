import { useEffect, useState } from "react";
import jobs from "../jobs.json";
import Joblisting from "./Joblisting";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  // const joblistings = isHome ? jobs.slice(0, 3) : jobs;

  useEffect(() => {
    const fetchJobs = async () =>
       {
      const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
         setTimeout(() => {
        setLoading(false);
      }, 1500);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "All Jobs"}
          </h2>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <>
                {jobs.map((job) => (
                  <Joblisting key={job.id} job={job} />
                ))}
              </>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default JobListings;
