import React, { useState } from "react";
import {
  Await,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { gooeyToast } from "goey-toast";
import { Skeleton } from "boneyard-js/react";
import ConfirmModal from "../components/ConfirmModal";
import { Trash2, Trash2Icon } from "lucide-react";

const JobPageSkeleton = () => (
  <Skeleton
    name="job-page"
    loading
    fallback={
      <div className="container m-auto py-10 px-6 animate-pulse">
        <div className="h-5 w-44 bg-gray-200 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-70/30 gap-6">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md h-44 mb-6">
              <div className="h-4 w-24 bg-gray-200 rounded mb-5"></div>
              <div className="h-8 w-2/3 bg-gray-200 rounded mb-5"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-64"></div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-80"></div>
        </div>
      </div>
    }
  />
);

const JobPage = ({ deleteJob }) => {
  const { job } = useLoaderData();

  return (
    <React.Suspense fallback={<JobPageSkeleton />}>
      <Await
        resolve={job}
        errorElement={<p className="p-6 text-red-600">Unable to load this job.</p>}
      >
        {(loadedJob) => <JobPageContent deleteJob={deleteJob} job={loadedJob} />}
      </Await>
    </React.Suspense>
  );
};

const JobPageContent = ({ deleteJob, job }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // const onDeleteClick = (jobId) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this job?",
  //   );
  //   if (!confirmDelete) return;

  //   deleteJob(jobId);
  //   // toast.success("Job deleted successfully!");
  //   gooeyToast.success('Job deleted successfully!', {
  //     description: 'Your job has been deleted successfully.',
  //   })
  //   navigate("/jobs");
  // };

  const handleConfirmDelete = () => {
    deleteJob(job.id);
    gooeyToast.success('Job deleted successfully!', {
      description: 'Your job has been deleted successfully.',
    });
    navigate("/jobs");
  };

  // <......the useEffect method.......>
  //   useEffect(() => {
  //     const fetchJob = async () => {
  //       try {
  //         const res = await fetch(`/api/jobs/${id}`);
  //         const data = await res.json();
  //         setJob(data);
  //         // setLoading(false);
  //         console.log(data);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       } finally {
  //         setTimeout(() => {
  //           setLoading(false);
  //         }, 2000);
  //       }
  //     };
  //     fetchJob();
  //   }, []);

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-1 text-sm font-medium text-indigo-600"
                >{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-lg text-orange-700 mr-2" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4 text-zinc-600">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2 text-zinc-600">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 p-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-500">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 p-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-500">
                  {job.company.contactPhone}
                </p>
              </div>

              {/* <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => setShowDeleteModal(job.id) }
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete this job?"
        message="This will permanently remove the listing. This can't be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
};

const jobLoader = ({ params }) => {
  const job = fetch(`/api/jobs/${params.id}`).then((res) => res.json());
  return { job };
};

export { JobPage as default, jobLoader };
