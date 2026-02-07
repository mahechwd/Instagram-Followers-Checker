const form = document.getElementById("uploadForm");
const status = document.getElementById("status");
const dontFollowList = document.getElementById("dontFollowBack");
const notFollowList = document.getElementById("notFollowedBack");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Processing...";
  dontFollowList.innerHTML = "";
  notFollowList.innerHTML = "";

  const formData = new FormData(form);

  try {
    const response = await fetch("/api/analyse", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    data.dontFollowBack.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user;
      dontFollowList.appendChild(li);
    });

    data.notFollowedBack.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user;
      notFollowList.appendChild(li);
    });

    status.textContent = "Done!";

  } catch (err) {
    console.error(err);
    status.textContent = "Upload failed.";
  }
});
