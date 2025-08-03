import React, { useState } from "react";

const dummyRecommendedJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechNova",
    location: "Remote",
    pay: "₹10,000/month",
    type: "Internship",
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    company: "DataWiz",
    location: "Bangalore",
    pay: "₹20,000/month",
    type: "Internship",
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "StackHive",
    location: "Delhi",
    pay: "₹18,000/month",
    type: "Internship",
  },
];

const dummyFreshJobs = [
  {
    id: 3,
    title: "Junior DevOps Engineer",
    company: "CloudBase",
    location: "Pune",
    pay: "₹15,000/month",
    type: "Internship",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "PixelPoint",
    location: "Chennai",
    pay: "₹12,000/month",
    type: "Internship",
  },
  {
    id: 6,
    title: "React Native Developer",
    company: "AppForge",
    location: "Mumbai",
    pay: "₹14,000/month",
    type: "Internship",
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [visibleRecommended, setVisibleRecommended] = useState(2);
  const [visibleFresh, setVisibleFresh] = useState(2);

  const jobs =
    activeTab === "recommended"
      ? dummyRecommendedJobs.slice(0, visibleRecommended)
      : dummyFreshJobs.slice(0, visibleFresh);

  const handleLoadMore = () => {
    if (activeTab === "recommended") {
      setVisibleRecommended((prev) => prev + 2);
    } else {
      setVisibleFresh((prev) => prev + 2);
    }
  };

  const allLoaded =
    activeTab === "recommended"
      ? visibleRecommended >= dummyRecommendedJobs.length
      : visibleFresh >= dummyFreshJobs.length;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome Back</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("recommended")}
          className={`pb-2 text-sm font-medium border-b-2 transition ${
            activeTab === "recommended"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-indigo-600"
          }`}
        >
          Recommended Jobs
        </button>
        <button
          onClick={() => setActiveTab("fresh")}
          className={`pb-2 text-sm font-medium border-b-2 transition ${
            activeTab === "fresh"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-indigo-600"
          }`}
        >
          Fresh Jobs
        </button>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.company} • {job.location}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {job.type} • {job.pay}
              </p>
            </div>
            <div className="mt-4">
              <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {!allLoaded && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="text-sm bg-gray-100 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
