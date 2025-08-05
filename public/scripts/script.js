// public/scripts/script.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('jobForm');
  const jobList = document.getElementById('jobList');

  // ✅ Fetch and display jobs on load
  fetch('/fetch')
    .then(res => res.json())
    .then(data => {
      jobList.innerHTML = '';
      data.forEach(addJobToDOM);
    });

  // ✅ Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const company = document.getElementById('company').value;
    const status = document.getElementById('status').value;
    const created_at = document.getElementById('created_at').value;

    fetch('/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, company, status, created_at })
    })
      .then(res => {
        if (res.ok) {
          return fetch('/fetch');
        } else {
          throw new Error('Add job failed');
        }
      })
      .then(res => res.json())
      .then(data => {
        jobList.innerHTML = '';
        data.forEach(addJobToDOM);
        form.reset();
      })
      .catch(err => {
        console.error('Error:', err);
      });
  });

  // ✅ DOM helper to display a job
  function addJobToDOM(job) {
    const li = document.createElement('li');
    li.className = 'border p-4 rounded bg-white';
    li.innerHTML = `
      <div class="font-bold text-xl">${job.title}</div>
      <div class="text-sm text-gray-600">${job.company}</div>
      <div class="text-sm text-blue-600">${job.status}</div>
      <div class="text-sm text-gray-400">${job.created_at}</div>
    `;
    jobList.appendChild(li);
  }
});
// public/scripts/script.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('jobForm');
  const jobList = document.getElementById('jobList');

  // ✅ Fetch and display jobs on load
  fetch('/fetch')
    .then(res => res.json())
    .then(data => {
      jobList.innerHTML = '';
      data.forEach(addJobToDOM);
    });

  // ✅ Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const company = document.getElementById('company').value;
    const status = document.getElementById('status').value;
    const created_at = document.getElementById('created_at').value;

    fetch('/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, company, status, created_at })
    })
      .then(res => {
        if (res.ok) {
          return fetch('/fetch');
        } else {
          throw new Error('Add job failed');
        }
      })
      .then(res => res.json())
      .then(data => {
        jobList.innerHTML = '';
        data.forEach(addJobToDOM);
        form.reset();
      })
      .catch(err => {
        console.error('Error:', err);
      });
  });

  // ✅ DOM helper to display a job
  function addJobToDOM(job) {
    const li = document.createElement('li');
    li.className = 'border p-4 rounded bg-white';
    li.innerHTML = `
      <div class="font-bold text-xl">${job.title}</div>
      <div class="text-sm text-gray-600">${job.company}</div>
      <div class="text-sm text-blue-600">${job.status}</div>
      <div class="text-sm text-gray-400">${job.created_at}</div>
    `;
    jobList.appendChild(li);
  }
});
