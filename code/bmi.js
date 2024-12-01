// Content Data
const bmiContent = {
  left: {
    title: "BMI Calculator",
    description:
      "BMI is a measurement of a person's leanness or corpulence based on their height and weight, intended to quantify tissue mass.",
    form: {
      fields: [
        { label: "Enter Weight in Kgs", id: "bmi-weight", placeholder: "e.g., 70" },
        { label: "Enter Height in m", id: "bmi-height", placeholder: "e.g., 1.75" },
        { label: "Enter Age", id: "bmi-age", placeholder: "e.g., 25" }
      ],
      button: { id: "bmi-calculate-btn", text: "Calculate" }
    },
    formulaImage: { src: "/images/formula.jpg", alt: "Formula Image" }
  },
  right: {
    images: [
      { src: "/images/bmi-range.jpg", alt: "BMI range chart" },
      { src: "/images/bmi-chart.jpg", alt: "BMI chart" }
    ]
  }
};

// DOM Ready Function
document.addEventListener("DOMContentLoaded", function () {
  const contentContainer = document.querySelector(".content-parent");

  // Left Content
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

  // Append Left Content
  contentContainer.appendChild(leftContainer);

  // Right Content
  const rightContainer = document.createElement("div");
  rightContainer.className = "content right";

  bmiContent.right.images.forEach((image) => {
    const imageElement = document.createElement("img");
    imageElement.src = image.src;
    imageElement.alt = image.alt;
    rightContainer.appendChild(imageElement);
  });

  // Append Right Content
  contentContainer.appendChild(rightContainer);

  // BMI Calculation Logic
  calculateButton.addEventListener("click", function () {
    const weightInput = document.querySelector("#bmi-weight");
    const heightInput = document.querySelector("#bmi-height");

    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    // Clear previous result
    resultText.textContent = "";

    if (weight > 0 && height > 0) {
      const bmi = (weight / (height * height)).toFixed(2);

      // Display BMI with condition
      resultContainer.style.display = "flex";
      resultContainer.style.justifyContent = "center";

      if (bmi < 18.5) {
        resultText.textContent = `Your BMI is ${bmi}: Underweight`;
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        resultText.textContent = `Your BMI is ${bmi}: Normal weight`;
      } else if (bmi >= 25 && bmi <= 29.9) {
        resultText.textContent = `Your BMI is ${bmi}: Overweight`;
      } else {
        resultText.textContent = `Your BMI is ${bmi}: Obese`;
      }

      resultText.style.cssText = "color: red; font-weight: bold; font-size: 20px;";
    } else {
      resultContainer.style.display = "flex";
      resultText.textContent = "Please enter valid weight and height.";
    }
  });
});
