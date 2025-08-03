import React from 'react'
import Sidebar from '../components/Sidebar';
import JobCarousel from '../components/JobCarousel';

const BrowseJobs = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 h-[46px] rounded-full overflow-hidden max-w-md w-full shadow-sm">
        <div className="pl-4 pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="#6B7280">
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="flex-1 h-full bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm"
        />
        <button
          type="submit"
          className="ml-2 h-full px-4 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar />
        <JobCarousel />
      </div>
    </div>
  );
}

export default BrowseJobs