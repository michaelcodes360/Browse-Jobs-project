import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarker, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FaUserTie, FaSackDollar } from "react-icons/fa6";
import { gooeyToast } from "goey-toast";

// Defined once at module scope so they aren't rebuilt on every render.
const GLASS_STYLES =
  "group relative overflow-hidden rounded-2xl border border-white/40 bg-white/100 p-3 shadow-xl backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:border-white/60 hover:shadow-2xl";

const SHIMMER_STYLES =
  "pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full";

const DESCRIPTION_PREVIEW_LENGTH = 90;

// Trims to the nearest whole word so the preview never cuts a word in half.
const getPreviewText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  return `${trimmed.slice(0, trimmed.lastIndexOf(" "))}...`;
};

const Joblisting = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);
  const [isSaved, setIsSaved] = useState(() => {
  return localStorage.getItem(`saved-job-${job.id}`) === "true";
});

  // const toggleSaved = () => {
  //   setIsSaved((prev) => !prev);
  //   gooeyToast.success(isSaved ? "Job removed from saved jobs!" : "Job saved successfully!");

  // }

  const toggleSaved = () => {
  setIsSaved((prev) => {
    const newValue = !prev;

    if (newValue) {
      localStorage.setItem(`saved-job-${job.id}`, "true");
    } else {
      localStorage.removeItem(`saved-job-${job.id}`);
    }

    return newValue;
  });

  gooeyToast.success(
    !isSaved
      ? "Job saved successfully!"
      : "Job removed from saved jobs!"
  );
};

  const description = showFullDescription
    ? job.description
    : getPreviewText(job.description, DESCRIPTION_PREVIEW_LENGTH);

  const descriptionId = `job-description-${job.id}`;

  return (
    <div className={`${GLASS_STYLES} cardEffect`}>
      <div className={SHIMMER_STYLES} />

      <button
        type="button"
        title={isSaved ? "Remove from saved jobs" : "Save this job"}
        onClick={toggleSaved}
        aria-pressed={isSaved}
        aria-label={isSaved ? "Remove from saved jobs" : "Save this job"}
        className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-indigo-500"
      >
        {isSaved ? <FaBookmark size={18} className="text-indigo-500" /> : <FaRegBookmark size={18} />}
      </button>

      <div className="p-4">
        <div className="mb-6 pr-6">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-600">
            {/* <FaUserTie className="text-[10px]" /> */}
            {job.type}
          </span>
          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>

        <p id={descriptionId} className="mb-5 text-gray-700 overflow-auto">
          {description}
        </p>
        <button
          type="button"
          aria-expanded={showFullDescription}
          aria-controls={descriptionId}
          className="mb-5 text-indigo-500 hover:text-indigo-700"
          onClick={() => setShowFullDescription((prev) => !prev)}
        >
          {showFullDescription ? "Less" : "More"}
        </button>

        <div className="mb-5 flex items-center gap-2 text-gray-900">
          {/* <FaSackDollar className="text-emerald-600" /> */}
          <span className="font-semibold">{job.salary}</span>
          <span className="text-sm text-gray-500">/ Year</span>
        </div>

        <div className="mb-5 border border-gray-100" />

        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div className="flex items-center text-orange-700">
            <FaMapMarker className="mb-1 mr-1 inline text-lg" />
            {job.location}
          </div>
          <Link
            to={`/jobs/${job.id}`}
            className="buttonEffect inline-flex h-[36px] items-center justify-center rounded-lg bg-indigo-500 px-4 text-center text-sm text-white transition-colors hover:bg-indigo-600"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Joblisting;