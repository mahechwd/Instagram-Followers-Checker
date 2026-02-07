const form = document.getElementById("uploadForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();   // Prevents the default form submission behavior (which would reload the page).

  const formData = new FormData(form);

  try {
    const response = await fetch("/api/analyse", {
      method: "POST",
      body: formData
    });

    // Check if the response is not OK (status code outside the range 200-299)
    if (!response.ok) {
      const errorText = await response.text();
      alert("Server error:\n" + errorText);
      return;
    }

    // If the response is OK, parse the JSON data
    const data = await response.json();

    console.log(data);
    alert("Upload successful! Check console for results.");

  } catch (err) {
    console.error(err);
    alert("Request failed.");
  }
});
