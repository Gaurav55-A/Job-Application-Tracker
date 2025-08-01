document.addEventListener("DOMContentLoaded", () => {
  const jobForm = document.getElementById("jobForm");
  const jobList = document.getElementById("jobList");

  fetchJobs();

  jobForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newJob = {
      title: document.getElementById("title").value,
      company: document.getElementById("company").value,
      status: document.getElementById("status").value,
      created_at: document.getElementById("date").value || new Date().toISOString().split("T")[0],
    };

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    if (res.ok) {
      jobForm.reset();
      fetchJobs();
    } else {
      alert("Failed to add job.");
    }
  });

  async function fetchJobs() {
    const res = await fetch("/api/jobs");
    const jobs = await res.json();
    console.log("Fetched jobs:", jobs);
    jobList.innerHTML = "";

    jobs.forEach((job) => {
      const li = document.createElement("li");
      li.className = "bg-white p-4 rounded shadow flex justify-between items-center";

      li.innerHTML = `
        <div>
          <p class="font-bold">${job.title}</p>
          <p>${job.company} | ${job.status} | ${new Date(job.created_at).toLocaleDateString()}</p>
        </div>
        <div class="space-x-2">
          <button onclick="editJob(${job.id})" class="text-blue-500 hover:underline">Edit</button>
          <button onclick="deleteJob(${job.id})" class="text-red-500 hover:underline">Delete</button>
        </div>
      `;

      jobList.appendChild(li);
    });
  }

  window.deleteJob = async function (id) {
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) fetchJobs();
    else alert("Failed to delete job.");
  };

  window.editJob = async function (id) {
    const newTitle = prompt("Enter new title:");
    const newCompany = prompt("Enter new company:");
    const newStatus = prompt("Enter new status (Applied/Interview/Offered/Rejected):");

    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, company: newCompany, status: newStatus }),
    });

    if (res.ok) fetchJobs();
    else alert("Failed to edit job.");
  };
});
