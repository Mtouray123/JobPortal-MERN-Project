import { useState, useEffect } from "react";
import axios from "axios";
import JobApplicantForm from "../components/jobApplicantForm"

function OrderHistoryPage() {
  const [jobs, setJobs] = useState([]);
  const [updatedJob, setUpdatedJob] = useState(null);
  const [jobApplicantFormVisible, setJobApplicantFormVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/jobs");
      setJobs(response.data);
    }
    fetchData();
  }, []);

  const handleDeleteJob = async (id) => {
    await axios.delete(`/api/jobs/${id}`);
    setJobs(jobs.filter((job) => job._id !== id));
  };

  const handleUpdateJob = async (id, updatedJobData) => {
    try {
      const response = await axios.put(`/api/jobs/${id}`, updatedJobData);
      const updatedJob = response.data;
      setJobs((prevJobs) => {
        return prevJobs.map((job) => {
          if (job._id === id) {
            return { ...job, ...updatedJob };
          } else {
            return job;
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  const handleShowJobApplicantForm = (job) => {
    setUpdatedJob(job);
    setJobApplicantFormVisible(true);
  };

  const handleHideJobApplicantForm = () => {
    setUpdatedJob(null);
    setJobApplicantFormVisible(false);
  };

  return (
    <div>
      <h1>Job Application Page</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>
                <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
                <button onClick={() => handleShowJobApplicantForm(job)}>Apply</button>
                <button onClick={() => handleUpdateJob(job._id, {title: "New Title", description: "New Description", location: "New Location", salary: "New Salary"})}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {jobApplicantFormVisible && <JobApplicantForm job={updatedJob} onUpdate={handleUpdateJob} onHide={handleHideJobApplicantForm} />}
    </div>
  );
}

export default OrderHistoryPage;
