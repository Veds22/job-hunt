import React, { useEffect, useState } from "react";
import SavedJobCard from "../components/SavedJobCard";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const saved_jobs_res = async() =>{
      response = await axios.get('https://localhost:8000/api/users/saved-jobs', 
        {
          
        }
      )
      console.log(resposne.data)
    }
  })

  const handleRemove = (id) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Saved Jobs</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search saved jobs..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 w-full max-w-md"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-full">
          <option>Filter by</option>
          <option>Internship</option>
          <option>Remote</option>
          <option>Recently Saved</option>
        </select>
      </div>

      <div className="space-y-5">
        {savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <SavedJobCard key={job.id} job={job} onRemove={handleRemove} />
          ))
        ) : (
          <p className="text-gray-600 text-sm">No saved jobs yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
