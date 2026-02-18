import { useEffect, useState } from "react";
import jobs from "../jobs.json";
import Joblisting from "./Joblisting";
import Spinner from "./Spinner";
import { IoMdRefreshCircle } from "react-icons/io";
import { GoSearch } from "react-icons/go";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
    const query = searchQuery.toLowerCase();
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
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
            <span className="flex items-center gap-2 ml-auto">
              <button title="Refresh" onClick={() => window.location.reload()}>
                <IoMdRefreshCircle
                  size={37}
                  color="blue"
                  className="refreshbtn"
                />
              </button>
              {/* <input
                type="search"
                placeholder="Search jobs..."
                className="ml-auto w-80 px-3 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 mb-2"
              /> */}
              <div className="flex w-80 max-w-md">
                <input
                  onKeyDown={handleKeyDown}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="search"
                  placeholder="Search jobs..."
                  className="flex-1 rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-r-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  onClick={handleSearch}
                >
                  {/* <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-4.35-4.35M16.65 10.65A6 6 0 1110.65 4.65a6 6 0 015.999 6z"
                    />
                  </svg> */}
                  <GoSearch size={13}/>
                </button>
              </div>
            </span>
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
