import React from "react";

const SavedJobCard = ({ job, onRemove }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-5 transition hover:shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        {/* Job Info */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {job.company} ・ {job.location} ・ {job.job_type}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Duration: {job.duration} ・ Stipend: {job.stipend}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {job.skills?.map((skill, i) => (
              <span
                key={i}
                className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col gap-2 items-end text-sm text-gray-500 min-w-[140px]">
          <p className="text-xs">Saved on: {job.saved_on}</p>
          <div className="flex gap-2">
            <a
              href={job.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full text-sm bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Apply
            </a>
            <button
              onClick={() => onRemove?.(job.id)}
              className="px-3 py-1 rounded-full text-sm bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobCard;
