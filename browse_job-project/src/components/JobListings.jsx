
import { useEffect, useRef, useState } from "react";
import Joblisting from "./Joblisting";
import Spinner from "./Spinner";
import { IoMdRefreshCircle } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { Skeleton } from "boneyard-js/react";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [noJobs, setNoJobs] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const skeletonCount = isHome ? 3 : 6;

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";

      try {
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Keep the original API data separate
        setJobs(data);
        setFilteredJobs(data);

        // Only show "No records found" if the API returns no jobs
        setNoJobs(data.length === 0);
      } catch (error) {
        console.error("Error fetching data:", error);

        setJobs([]);
        setFilteredJobs([]);
        setNoJobs(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchJobs();
  }, [isHome]);

  // Restore all jobs immediately when search is cleared
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredJobs(jobs);
      setNoJobs(jobs.length === 0);
    }
  }, [searchQuery, jobs]);

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();

    // Restore all jobs when search is empty
    if (!query) {
      setFilteredJobs(jobs);
      setNoJobs(jobs.length === 0);
      return;
    }

    // Always search through the original jobs
    const filtered = jobs.filter(
      (job) =>
        String(job.id ?? "")
          .toLowerCase()
          .includes(query) ||
        String(job.type ?? "")
          .toLowerCase()
          .includes(query) ||
        String(job.title ?? "")
          .toLowerCase()
          .includes(query) ||
        String(job.description ?? "")
          .toLowerCase()
          .includes(query) ||
        String(job.salary ?? "")
          .toLowerCase()
          .includes(query) ||
        String(job.location ?? "")
          .toLowerCase()
          .includes(query)
    );

    setFilteredJobs(filtered);
    setNoJobs(filtered.length === 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }

    if (e.key === "Escape") {
      setIsMobileSearchOpen(false);
    }
  };

  const openMobileSearch = () => {
    setIsMobileSearchOpen(true);

    // Focus after the search input becomes visible
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
  };

  // Close the mobile search when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setIsMobileSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <section className="bg-blue-100 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        {/* Responsive Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          {/* Section Title */}
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-indigo-500 mb-1 heroText">
              {isHome ? "Recent Jobs" : "All Jobs"}
            </h2>

            <div className="w-20 h-1 bg-indigo-500 rounded-lg heroText"></div>
          </div>

          {/* Refresh and Search Controls */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Refresh Button */}
            <button
              type="button"
              title="Refresh jobs"
              aria-label="Refresh jobs"
              onClick={() => window.location.reload()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-blue-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <IoMdRefreshCircle
                size={37}
                color="blue"
                className="refreshbtn"
              />
            </button>

            {/* Desktop Search */}
            <div className="hidden sm:flex items-center mb-1">
              <div className="flex w-full max-w-md overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search jobs..."
                  aria-label="Search jobs"
                  className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  title="Search jobs"
                  aria-label="Search jobs"
                  onClick={handleSearch}
                  className="flex w-12 shrink-0 items-center justify-center bg-blue-600 text-white transition-all duration-300 ease-in-out hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <GoSearch size={17} />
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div
              ref={searchRef}
              className="flex items-center sm:hidden"
            >
              <div
                className={`flex items-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out ${
                  isMobileSearchOpen
                    ? "w-[min(65vw,260px)] opacity-100"
                    : "w-0 border-transparent opacity-0"
                }`}
              >
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search jobs..."
                  aria-label="Search jobs"
                  tabIndex={isMobileSearchOpen ? 0 : -1}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  title="Close search"
                  aria-label="Close search"
                  onClick={closeMobileSearch}
                  tabIndex={isMobileSearchOpen ? 0 : -1}
                  className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <IoClose size={18} />
                </button>
              </div>

              {/* Mobile Search Toggle */}
              {!isMobileSearchOpen && (
                <button
                  type="button"
                  title="Open search"
                  aria-label="Open search"
                  aria-expanded={isMobileSearchOpen}
                  onClick={openMobileSearch}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-blue-600 shadow-sm transition-all duration-300 ease-in-out hover:bg-blue-50 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <GoSearch size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Existing Loading and Job Rendering Logic */}
        {loading ? (
          <>
            <Spinner loading={loading} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: skeletonCount }, (_, index) => (
                <Skeleton
                  name="blog-card"
                  loading={loading}
                  key={`skeleton-${index}`}
                  fallback={
                    <div className="bg-white rounded-xl shadow-md p-4 h-72 animate-pulse">
                      <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>

                      <div className="h-6 w-3/4 bg-gray-200 rounded mb-6"></div>

                      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>

                      <div className="h-4 w-5/6 bg-gray-200 rounded mb-8"></div>

                      <div className="h-4 w-1/2 bg-gray-200 rounded mb-6"></div>

                      <div className="h-9 w-28 bg-gray-200 rounded"></div>
                    </div>
                  }
                >
                  <div className="bg-white rounded-xl shadow-md p-4 h-72" />
                </Skeleton>
              ))}
            </div>
          </>
        ) : noJobs ? (
          <div className="text-center">
            <p className="text-slate-500 text-lg mt-10">
              No records found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {filteredJobs.map((job) => (
              <Joblisting key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;