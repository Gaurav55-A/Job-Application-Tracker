document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('jobForm');
  const jobList = document.getElementById('jobList');
  const submitBtn = document.getElementById('submitBtn');

  let editMode = false;
  let editId = null;

  function fetchJobs() {
    fetch('/fetch')
      .then(res => res.json())
      .then(data => {
        jobList.innerHTML = '';
        data.forEach(job => {
          const li = document.createElement('li');
          li.className = 'border p-4 rounded shadow flex justify-between items-center';
          li.innerHTML = `
            <div>
              <h3 class="font-bold text-lg">${job.title}</h3>
              <p>${job.company} — <span class="italic">${job.status}</span></p>
              <p class="text-sm text-gray-600">Applied on: ${job.created_at}</p>
            </div>
            <div class="flex gap-2">
              <button data-id="${job.id}" class="edit-btn text-blue-500">Edit</button>
              <button data-id="${job.id}" class="delete-btn text-red-500">Delete</button>
            </div>
          `;
          jobList.appendChild(li);
        });
      });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const company = document.getElementById('company').value;
    const status = document.getElementById('status').value;
    const created_at = document.getElementById('created_at').value;

    const endpoint = editMode ? '/edit' : '/add';
    const payload = editMode
      ? { id: editId, title, company, status, created_at }
      : { title, company, status, created_at };

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(() => {
      form.reset();
      editMode = false;
      editId = null;
      submitBtn.textContent = 'Add Job';
      fetchJobs();
    });
  });

  jobList.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');

    if (e.target.classList.contains('delete-btn')) {
      fetch('/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      }).then(() => fetchJobs());
    }

    if (e.target.classList.contains('edit-btn')) {
      fetch('/fetch')
        .then(res => res.json())
        .then(data => {
          const job = data.find(j => j.id == id);
          if (job) {
            document.getElementById('title').value = job.title;
            document.getElementById('company').value = job.company;
            document.getElementById('status').value = job.status;
            document.getElementById('created_at').value = job.created_at;
            editMode = true;
            editId = job.id;
            submitBtn.textContent = 'Update Job';
          }
        });
    }
  });

  fetchJobs();
});
