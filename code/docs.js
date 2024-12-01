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
  
    // Generate Article List
    const articles = [
      {
        title: "10 Best Cardio Exercises for Weight Loss",
        link: "https://www.acko.com/health-insurance/health-guides/cardio-exercises-for-weight-loss/",
        image: "/images/docs_images/cardio.jpeg"
      },
      {
        title: "How to Build a Beginner Workout Routine",
        link: "https://www.planetfitness.com/community/articles/beginner-workout-plan-your-first-week-gym",
        image: "/images/docs_images/beginner.jpeg"
      },
      {
        title: "Benefits of Strength Training for Women",
        link: "https://www.womenshealthmag.com/fitness/strength-training-benefits",
        image: "/images/docs_images/strength.jpeg"
      },
      {
        title: "Top 5 Yoga Poses for Stress Relief",
        link: "https://www.yogajournal.com/poses/yoga-by-benefit/stress/",
        image: "/images/docs_images/yoga.jpg"
      },
      {
        title: "The Science of Recovery After Workouts",
        link: "https://blog.nasm.org/the-science-of-recovery",
        image: "/images/docs_images/recovery.jpeg"
      },
      {
        title: "How Dangerous are Steroids",
        link: "https://www.webmd.com/men/anabolic-steroids",
        image: "/images/docs_images/steriod.jpeg"
      },
      {
        title: "Bulking vs Cutting",
        link: "https://www.healthline.com/nutrition/bulking-vs-cutting",
        image: "/images/docs_images/bulking.jpeg"
      },
      {
        title: "Home Workouts",
        link: "https://www.everydayhealth.com/fitness/everything-you-need-to-know-about-working-out-at-home/",
        image: "/images/docs_images/home.jpeg"
      }
    ];
  
    const articleList = document.getElementById("article-list");
    if (articleList) {
      articles.forEach((article) => {
        const articleItem = document.createElement("div");
        articleItem.classList.add("article-item");
  
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        imageElement.alt = article.title;
        imageElement.classList.add("article-image");
  
        const linkElement = document.createElement("a");
        linkElement.href = article.link;
        linkElement.target = "_blank";
        linkElement.classList.add("article-link");
        linkElement.textContent = article.title;
  
        articleItem.appendChild(imageElement);
        articleItem.appendChild(linkElement);
        articleList.appendChild(articleItem);
      });
    }
  });