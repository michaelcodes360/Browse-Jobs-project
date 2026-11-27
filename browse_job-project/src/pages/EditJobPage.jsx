import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { gooeyToast } from "goey-toast";

const EditJobPage = ({ updatetJobSubmit }) => {
  const job = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      type: job.type,
      title: job.title,
      description: job.description,
      salary: job.salary,
      location: job.location,
      companyName: job.company.name,
      companyDescription: job.company.description,
      contactEmail: job.company.contactEmail,
      contactPhone: job.company.contactPhone,
    },
  });

  useEffect(() => {
    reset({
      type: job.type,
      title: job.title,
      description: job.description,
      salary: job.salary,
      location: job.location,
      companyName: job.company.name,
      companyDescription: job.company.description,
      contactEmail: job.company.contactEmail,
      contactPhone: job.company.contactPhone,
    });
  }, [job, reset]);

  const onSubmit = async (data) => {
    const updatedJob = {
      id,
      title: data.title.trim(),
      type: data.type,
      description: data.description.trim(),
      salary: data.salary,
      location: data.location.trim(),
      company: {
        name: data.companyName.trim(),
        description: data.companyDescription.trim(),
        contactEmail: data.contactEmail.trim(),
        contactPhone: data.contactPhone.trim(),
      },
    };

    await updatetJobSubmit(updatedJob);
    gooeyToast.success("Job updated successfully!", {
      description: "Your job has been updated successfully.",
    });
    navigate(`/jobs/${id}`);
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+()\-\s]{7,20}$/;

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h2 className="text-3xl text-center font-semibold mb-6 heroText">
                Edit Job
              </h2>

              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                  Job Type
                </label>
                <select
                  id="type"
                  {...register("type", { required: "Please select a job type" })}
                  className={`border rounded w-full py-2 px-3 ${errors.type ? "border-red-500" : ""}`}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                  Job Listing Name
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", { required: "Job listing name is required" })}
                  className={`border rounded w-full py-2 px-3 mb-2 ${errors.title ? "border-red-500" : ""}`}
                  placeholder="eg. Beautiful Apartment In Miami"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description", { required: "Job description is required" })}
                  className={`border rounded w-full py-2 px-3 resize-none ${errors.description ? "border-red-500" : ""}`}
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="salary" className="block text-gray-700 font-bold mb-2">
                  Salary
                </label>
                <select
                  id="salary"
                  {...register("salary", { required: "Salary is required" })}
                  className={`border rounded w-full py-2 px-3 ${errors.salary ? "border-red-500" : ""}`}
                >
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - 60K">$50K - $60K</option>
                  <option value="$60K - 70K">$60K - $70K</option>
                  <option value="$70K - 80K">$70K - $80K</option>
                  <option value="$80K - 90K">$80K - $90K</option>
                  <option value="$90K - 100K">$90K - $100K</option>
                  <option value="$100K - 125K">$100K - $125K</option>
                  <option value="$125K - 150K">$125K - $150K</option>
                  <option value="$150K - 175K">$150K - $175K</option>
                  <option value="$175K - 200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  {...register("location", { required: "Location is required" })}
                  className={`border rounded w-full py-2 px-3 mb-2 ${errors.location ? "border-red-500" : ""}`}
                  placeholder="Company Location"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>

              <h3 className="text-xl mb-1 heroText">Company Info</h3>
              <div className="w-16 h-1 bg-indigo-400 mb-5 heroText rounded-lg"></div>

              <div className="mb-4">
                <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  {...register("companyName", { required: "Company name is required" })}
                  className={`border rounded w-full py-2 px-3 ${errors.companyName ? "border-red-500" : ""}`}
                  placeholder="Company Name"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="companyDescription" className="block text-gray-700 font-bold mb-2">
                  Company Description
                </label>
                <textarea
                  id="companyDescription"
                  {...register("companyDescription", { required: "Company description is required" })}
                  className={`border rounded w-full py-2 px-3 resize-none ${errors.companyDescription ? "border-red-500" : ""}`}
                  rows="4"
                  placeholder="What does your company do?"
                ></textarea>
                {errors.companyDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyDescription.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="contactEmail" className="block text-gray-700 font-bold mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  {...register("contactEmail", {
                    required: "Contact email is required",
                    pattern: {
                      value: emailPattern,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`border rounded w-full py-2 px-3 ${errors.contactEmail ? "border-red-500" : ""}`}
                  placeholder="Email address for applicants"
                />
                {errors.contactEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="contactPhone" className="block text-gray-700 font-bold mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  {...register("contactPhone", {
                    required: "Contact phone is required",
                    pattern: {
                      value: phonePattern,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  className={`border rounded w-full py-2 px-3 ${errors.contactPhone ? "border-red-500" : ""}`}
                  placeholder="Optional phone for applicants"
                />
                {errors.contactPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>
                )}
              </div>

              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline disabled:opacity-70"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating Job..." : "Update Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditJobPage;
