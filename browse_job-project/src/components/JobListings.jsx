import { useEffect, useState } from "react";
import jobs from "../jobs.json";
import Joblisting from "./Joblisting";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  // const joblistings = isHome ? jobs.slice(0, 3) : jobs;

  useEffect(() => {
    const fetchJobs = async () => {
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

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.toLowerCase();
      const filteredJobs = jobs.filter(
        (job) =>
          job.id.toLowerCase().includes(query) ||
          job.type.toLowerCase().includes(query) ||
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.salary.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query),
      );
      setJobs(filteredJobs);
    }
  };

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <div className="flex">
            <span className="flex-row">
              <h2 className="text-2xl font-bold text-indigo-500 mb-1 text-center heroText">
                {isHome ? "Recent Jobs" : "All Jobs"}
              </h2>
              <div className="w-20 h-1 bg-indigo-500 mb-6 heroText rounded-lg"></div>
            </span>

            <input
              value={jobs.id}
              type="search"
              placeholder="Search jobs..."
              className="ml-auto w-60 px-3 py-0 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 mb-2"
              onKeyDown={handleSearch}
            />
          </div>

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
