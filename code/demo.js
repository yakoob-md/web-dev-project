document.addEventListener("DOMContentLoaded", function () {
  // Handle navbar buttons
  const navItems = document.querySelectorAll(".navbar .nav-item[data-page]");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetPage = item.getAttribute("data-page"); // Get the target page
      if (targetPage) {
        window.location.href = targetPage; // Redirect to the target page
      }
    });
  });

  // Handle BMI button
  const bmiButton = document.getElementById("bmi-button");
  if (bmiButton) {
    bmiButton.addEventListener("click", function () {
      // Navigate to bmi.html
      window.location.href = "bmi.html";
    });
  }
});