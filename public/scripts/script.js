document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('jobForm');
  const jobList = document.getElementById('jobList');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const company = document.getElementById('company').value.trim();
    const status = document.getElementById('status').value;

    if (!title || !company || !status) return;

    const li = document.createElement('li');
    li.textContent = `${title} at ${company} - ${status}`;
    jobList.appendChild(li);

    form.reset();
  });
});
