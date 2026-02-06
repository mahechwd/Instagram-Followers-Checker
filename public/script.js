const form = document.getElementById("uploadForm");
const output = document.getElementById("output");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch("/api/analyze", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  output.textContent = JSON.stringify(data, null, 2);
});
