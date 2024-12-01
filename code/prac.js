const bmiContent = {
    left: {
      title: "BMI Calculator",
      description:
        "BMI is a measurement of a person's leanness or corpulence based on their height and weight, intended to quantify tissue mass.",
      form: {
        fields: [
          { label: "Enter Weight in Kgs", id: "bmi-weight", placeholder: "e.g., 70" },
          { label: "Enter Height in m", id: "bmi-height", placeholder: "e.g., 1.75" },
          { label: "Enter Age", id: "bmi-age", placeholder: "e.g., 25" },
        ],
        button: { id: "bmi-calculate-btn", text: "Calculate" },
      },
      formulaImage: { src: "/images/formula.jpg", alt: "Formula Image" },
    },
    right: {
      images: [
        { src: "/images/bmi-range.jpg", alt: "BMI range chart" },
        { src: "/images/bmi-chart.jpg", alt: "BMI chart" },
      ],
    },
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    const contentContainer = document.querySelector(".content-parent");
  
    // Create Left Section
    const leftContainer = document.createElement("div");
    leftContainer.className = "content left";
  
    // Title
    const titleElement = document.createElement("h2");
    titleElement.textContent = bmiContent.left.title;
    leftContainer.appendChild(titleElement);
  
    // Description
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = bmiContent.left.description;
    leftContainer.appendChild(descriptionElement);
  
    // Form
    const formElement = document.createElement("form");
    bmiContent.left.form.fields.forEach((field) => {
      const labelElement = document.createElement("label");
      labelElement.setAttribute("for", field.id);
      labelElement.textContent = field.label;
  
      const inputElement = document.createElement("input");
      inputElement.type = "number";
      inputElement.id = field.id;
      inputElement.placeholder = field.placeholder;
  
      formElement.appendChild(labelElement);
      formElement.appendChild(inputElement);
    });
  
    const calculateButton = document.createElement("button");
    calculateButton.id = bmiContent.left.form.button.id;
    calculateButton.textContent = bmiContent.left.form.button.text;
    calculateButton.type = "button"; // Prevent form submission
    formElement.appendChild(calculateButton);
    leftContainer.appendChild(formElement);
  
    // Result Section
    const resultContainer = document.createElement("div");
    resultContainer.className = "result";
    resultContainer.style.display = "none"; // Initially hidden
  
    const resultText = document.createElement("p");
    resultContainer.appendChild(resultText);
    leftContainer.appendChild(resultContainer);
  
    // Formula Image
    const formulaImageElement = document.createElement("img");
    formulaImageElement.src = bmiContent.left.formulaImage.src;
    formulaImageElement.alt = bmiContent.left.formulaImage.alt;
    leftContainer.appendChild(formulaImageElement);
  
    contentContainer.appendChild(leftContainer);
  
    // Right Section
    const rightContainer = document.createElement("div");
    rightContainer.className = "content right";
  
    bmiContent.right.images.forEach((image) => {
      const imageElement = document.createElement("img");
      imageElement.src = image.src;
      imageElement.alt = image.alt;
      rightContainer.appendChild(imageElement);
    });
  
    contentContainer.appendChild(rightContainer);
  
    // BMI History Section
    const historyContainer = document.createElement("div");
    historyContainer.className = "bmi-history";
    leftContainer.appendChild(historyContainer);
  
    // Function to Fetch BMI History
    const fetchBMIHistory = async () => {
      try {
        const response = await fetch("http://localhost:5500/bmi/history");
        if (!response.ok) throw new Error("Failed to fetch BMI history");
  
        const history = await response.json();
        historyContainer.innerHTML = "<h3>BMI History:</h3>";
        history.forEach((record) => {
          const historyItem = document.createElement("p");
          historyItem.textContent = `BMI: ${record.bmi}, Category: ${record.category}, Date: ${new Date(
            record.timestamp
          ).toLocaleString()}`;
          historyContainer.appendChild(historyItem);
        });
      } catch (error) {
        console.error("Error fetching BMI history:", error);
      }
    };
  
    // BMI Calculation Logic
    calculateButton.addEventListener("click", async function () {
      const weightInput = document.querySelector("#bmi-weight");
      const heightInput = document.querySelector("#bmi-height");
  
      const weight = parseFloat(weightInput.value);
      const height = parseFloat(heightInput.value);
  
      if (weight > 0 && height > 0) {
        try {
          const response = await fetch("http://localhost:5500/bmi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ weight, height }),
          });
  
          if (!response.ok) throw new Error("Failed to calculate BMI");
  
          const result = await response.json();
  
          // Display Result
          resultText.textContent = `Your BMI is ${result.bmi}: ${result.category}`;
          resultContainer.style.display = "block";
          resultText.style.cssText = "color: red; font-weight: bold; font-size: 20px;";
  
          // Update BMI History
          await fetchBMIHistory();
        } catch (error) {
          console.error("Error calculating BMI:", error);
        }
      } else {
        resultText.textContent = "Please enter valid weight and height.";
        resultContainer.style.display = "block";
      }
    });
  
    // Fetch BMI History on Page Load
    fetchBMIHistory();
  });
  