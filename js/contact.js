document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (!form || !status) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.className = "form-status";
    status.textContent = "";

    var formData = new FormData(form);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success) {
          status.className = "form-status is-success";
          status.textContent =
            "Thank you — your message has been sent. Emma will be in touch soon.";
          form.reset();
        } else {
          throw new Error(data.message || "Something went wrong.");
        }
      })
      .catch(function () {
        status.className = "form-status is-error";
        status.textContent =
          "Sorry, something went wrong sending your message. Please try again or email directly.";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      });
  });
});
