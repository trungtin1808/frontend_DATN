import React from "react";

export default function FeaturedJobs() {
  const jobs = [
    {
      title: "Senior Product Designer",
      company: "Stripe",
      location: "Remote",
      salary: "$120k - $160k",
    },
    {
      title: "Marketing Manager",
      company: "Airbnb",
      location: "New York, US",
      salary: "$150k - $210k",
    },
    {
      title: "Frontend Developer",
      company: "Vercel",
      location: "San Francisco, CA",
      salary: "$130k - $180k",
    },
    {
      title: "Backend Engineer",
      company: "Netflix",
      location: "Los Gatos, CA",
      salary: "$170k - $220k",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Jobs</h2>
          <button className="text-blue-600 hover:underline">View All Jobs</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="border p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500 text-sm mt-2">{job.location}</p>
              <p className="text-blue-600 font-semibold mt-2">{job.salary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
