// const exercises = {
//     "bodyweight": "chest.html",
//     "cardio": "abs.html",
//     "dumbbells": "bicep.html",
//     "barbells": "shoulder.html"
//   };

//   function updateUrlForSelectedCategory() {
//     const checkboxes = document.querySelectorAll('.category');
//     checkboxes.forEach(checkbox => {
//       if (checkbox.checked) {
//         const category = checkbox.value;
//         if (exercises[category]) {
//           window.location.href = exercises[category];
//         }
//       }
//     });
//   }

//   document.querySelectorAll('.category').forEach((checkbox) => {
//     checkbox.addEventListener('change', updateUrlForSelectedCategory);
//   });

//   let pageData;

//   async function jsonFetch() {
//       let response = await fetch("links.json");
//       pageData = await response.json();
//       console.log("Page data loaded:", pageData);
//   }
//   jsonFetch();
  
//   let bmi = document.getElementById("bmi");
//   bmi.addEventListener("click", () => {
//       window.location.href = "bmi.html";
//   });
  
//   let navItems = document.querySelectorAll(".nav-item");
  
//   navItems.forEach(navItem => {
//       navItem.addEventListener("click", function () {
//           const key = this.getAttribute("id"); // Get the ID of the clicked item
//           loadPageContent(key); // Load content based on the ID
//       });
//   });
  
//   function loadPageContent(key) {
//       const content = pageData[key];
  
//       if (content) {
//           window.location.href = content.url;
//       } else {
//           console.error("Page not found for key:", key); // Fix variable from pageKey to key
//       }
//   }
  
document.addEventListener("DOMContentLoaded", function () {
  // Select all nav-item elements with a data-page attribute
  const navItems = document.querySelectorAll(".navbar .nav-item[data-page]");

  // Add a click event listener to each nav-item
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetPage = item.getAttribute("data-page"); // Get the target page
      if (targetPage) {
        window.location.href = targetPage; // Redirect to the target page
      }
    });
  });
});