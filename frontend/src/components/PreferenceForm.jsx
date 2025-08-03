import React, { useState } from "react";

const PreferenceForm = () => {
  const [formData, setFormData] = useState({
    jobType: "internship",
    payRange: "",
    skills: [],
    locations: [],
    domains: [],
    newsletterFrequency: "no",
  });

  const payOptions = [
    "Unpaid",
    "₹0 - ₹5,000",
    "₹5,000 - ₹10,000",
    "₹10,000 - ₹20,000",
    "₹20,000+",
  ];

  const newsletterOptions = [
    { label: "No", value: "no" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
  ];

  const skillsOptions = [
    "JavaScript",
    "Python",
    "React",
    "Django",
    "C++",
    "SQL",
    "Machine Learning",
    "Data Analysis",
    "AWS",
    "Docker",
  ];

  const locationOptions = [
    "Remote",
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
  ];

  const domainOptions = [
    "Web Development",
    "Machine Learning",
    "Artificial Intelligence",
    "DevOps",
    "Data Science",
    "Cybersecurity",
    "UI/UX Design",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => {
      const current = prev[name];
      return {
        ...prev,
        [name]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Preferences:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Set Your Preferences
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        {/* Job Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="internship">Internship</option>
            <option value="job">Full-time Job</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        {/* Pay Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Expected Pay Range
          </label>
          <select
            name="payRange"
            value={formData.payRange}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select Range</option>
            {payOptions.map((range, idx) => (
              <option key={idx} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {skillsOptions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleMultiSelect("skills", skill)}
                className={`px-4 py-1.5 text-sm rounded-full border transition ${
                  formData.skills.includes(skill)
                    ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Locations
          </label>
          <div className="flex flex-wrap gap-2">
            {locationOptions.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleMultiSelect("locations", loc)}
                className={`px-4 py-1.5 text-sm rounded-full border transition ${
                  formData.locations.includes(loc)
                    ? "bg-green-100 text-green-700 border-green-300"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domains
          </label>
          <div className="flex flex-wrap gap-2">
            {domainOptions.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => handleMultiSelect("domains", domain)}
                className={`px-4 py-1.5 text-sm rounded-full border transition ${
                  formData.domains.includes(domain)
                    ? "bg-purple-100 text-purple-700 border-purple-300"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletter Frequency */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Newsletter Frequency
          </label>
          <select
            name="newsletterFrequency"
            value={formData.newsletterFrequency}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {newsletterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferenceForm;
