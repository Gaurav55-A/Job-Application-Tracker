document.addEventListener("DOMContentLoaded", function () {
  fetchJobs();

  const form = document.querySelector("form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const job = {
      title: document.getElementById("title").value,
      company: document.getElementById("company").value,
      status: document.getElementById("status").value,
      created_at: document.getElementById("created_at").value,
    };

    await fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });

    form.reset();
    fetchJobs();
  });
});

async function fetchJobs() {
  const res = await fetch("/fetch");
  const jobs = await res.json();

  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  jobs.forEach((job) => {
    const div = document.createElement("div");
    div.className = "p-4 border rounded mb-2 bg-white dark:bg-gray-800 dark:text-white shadow";

    div.innerHTML = `
      <h3 class="font-bold text-lg">${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Status:</strong> ${job.status}</p>
      <p><strong>Date:</strong> ${job.created_at}</p>
      <div class="mt-2">
        <button onclick="deleteJob(${job.id})" class="bg-red-500 text-white px-3 py-1 rounded mr-2">Delete</button>
        <button onclick='editJob(${JSON.stringify(job)})' class="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
      </div>
    `;

    jobList.appendChild(div);
  });
}

async function deleteJob(id) {
  await fetch("/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  fetchJobs();
}

function editJob(job) {
  document.getElementById("editId").value = job.id;
  document.getElementById("editTitle").value = job.title;
  document.getElementById("editCompany").value = job.company;
  document.getElementById("editStatus").value = job.status;
  document.getElementById("editDate").value = job.created_at;

  document.getElementById("editForm").classList.remove("hidden");
}

document.getElementById("editForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const editedJob = {
    id: document.getElementById("editId").value,
    title: document.getElementById("editTitle").value,
    company: document.getElementById("editCompany").value,
    status: document.getElementById("editStatus").value,
    created_at: document.getElementById("editDate").value,
  };

  await fetch("/edit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedJob),
  });

  document.getElementById("editForm").reset();
  document.getElementById("editForm").classList.add("hidden");
  fetchJobs();
});
