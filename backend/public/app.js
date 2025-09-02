const form = document.getElementById("ftthForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.textContent = "Submitting...";

  const formData = new FormData(form); // important for files

  try {
    const res = await fetch("http://localhost:5000/api/applications", {
      method: "POST",
      body: formData
    });

    const json = await res.json();

    if (!res.ok) {
      message.textContent = json.message || "Server error, please try again";
    } else {
      message.textContent = `Application submitted successfully! ID: ${json.application_id}`;
      form.reset();
    }
  } catch (err) {
    console.error(err);
    message.textContent = "Network error, please try again";
  }
});
