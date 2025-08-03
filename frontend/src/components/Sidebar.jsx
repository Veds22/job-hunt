import React, { useState } from 'react';
import {
  FaSearch,
  FaBriefcase,
  FaMoneyBill,
  FaMapMarkerAlt,
  FaFilter,
} from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';

const jobTypes = ['Internship', 'Full-Time', 'Freelance'];
const locations = ['Remote', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];

const Sidebar = () => {
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [domainQuery, setDomainQuery] = useState('');
  const [stipend, setStipend] = useState(10000);

  const toggleSelection = (value, setFn, current) => {
    setFn(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  return (
    <aside className="w-full md:w-[280px] bg-white border rounded-xl shadow-md overflow-hidden">
      <nav className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaSearch className="text-gray-500" />
            <span>Browse Jobs</span>
          </div>
          <button className="p-2 rounded hover:bg-gray-100 transition">
            <FiChevronLeft />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 space-y-6 text-sm text-gray-800">
          {/* Domain/Role */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-1 text-gray-700">
              <FaFilter />
              Domain / Role
            </label>
            <input
              type="text"
              placeholder="Search domains..."
              value={domainQuery}
              onChange={(e) => setDomainQuery(e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-2 text-gray-700">
              <FaBriefcase />
              Type of Job
            </label>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedJobTypes.includes(type)}
                    onChange={() =>
                      toggleSelection(type, setSelectedJobTypes, selectedJobTypes)
                    }
                    className="accent-indigo-600"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Pay/Stipend */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-2 text-gray-700">
              <FaMoneyBill />
              Expected Stipend
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                className="w-full"
              />
              <span className="text-xs text-gray-600">₹{stipend}</span>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-2 text-gray-700">
              <FaMapMarkerAlt />
              Preferred Location
            </label>
            <div className="space-y-2 max-h-[160px] overflow-auto pr-1">
              {locations.map((loc) => (
                <label key={loc} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(loc)}
                    onChange={() =>
                      toggleSelection(loc, setSelectedLocations, selectedLocations)
                    }
                    className="accent-indigo-600"
                  />
                  {loc}
                </label>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
