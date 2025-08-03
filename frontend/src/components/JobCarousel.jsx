import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import Content from './Content';

const JobCarousel = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/jobs/browse');
        const jobList = res.data.result;
        const grouped = [];

        for (let i = 0; i < jobList.length; i += 2) {
          grouped.push(jobList.slice(i, i + 2));
        }

        setJobs(grouped);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-4rem)] pr-2 scrollbar-hide">
      <Content>
        {jobs.map((pair, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
            {pair.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ))}
      </Content>
    </div>
  );
};

export default JobCarousel;
