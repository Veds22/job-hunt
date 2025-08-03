import React, { useState } from 'react';
import {
  FaRegBookmark,
  FaBookmark,
  FaBriefcase,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const JobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-all w-full md:max-w-[50%] space-y-3">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <FaBriefcase className="text-gray-400" />
          <span>{job.company}</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
            {job.type}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="text-sm space-y-1 text-gray-600">
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
        >
          Apply Now <FaExternalLinkAlt className="text-xs" />
        </a>
        <div>
          <strong>Stipend:</strong> {job.stipend || 'N/A'}
        </div>
        <div>
          <strong>Category:</strong> {job.category}
        </div>
        <div>
          <strong>Type:</strong> {job.job_type}
        </div>
        <div className="flex items-start flex-wrap gap-2 pt-2">
          {job.location.map((loc, i) => (
            <span
              key={i}
              className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 flex items-center gap-1"
            >
              <FaMapMarkerAlt className="text-gray-400" />
              {loc}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      {job.skills?.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs text-gray-700">
          {job.skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-50 border border-blue-200 text-blue-700 px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      {job.description && (
        <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded">
          {job.description.split('\n').map((line, i) => (
            <p key={i} className="mb-1">
              {line}
            </p>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-2 text-sm text-gray-500">
        <span>Source: Internshala</span>
        <button
          onClick={handleBookmarkToggle}
          aria-label="Toggle Bookmark"
          className="hover:text-blue-600 transition"
        >
          {isBookmarked ? (
            <FaBookmark className="text-blue-600" />
          ) : (
            <FaRegBookmark />
          )}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
