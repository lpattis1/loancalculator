// Listen for submit
const form = document.querySelector("#loan-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const results = document.querySelector("#results");
  const loading = document.querySelector("#loading");

  results.style.display = "none";

  loading.style.display = "block";

  setTimeout(calculateResults, 2000);
});

// Calculate Results
function calculateResults() {
  //   UI Variables
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");
  const results = document.querySelector("#results");
  const loading = document.querySelector("#loading");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //   Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(0);
    totalPayment.value = (monthly * calculatedPayments).toFixed(0);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(0);
    results.style.display = "block";
    loading.style.display = "none";
  } else {
    showError("Please check your numbers");
    results.style.display = "none";
    loading.style.display = "none";
  }
}

function showError(message) {
  // Create a div
  const errorDiv = document.createElement("div");

  //   Get parent elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //   Add class
  errorDiv.className = "alert alert-danger";

  //   Create text
  errorDiv.textContent = message;

  //   Insert error above heading
  card.insertBefore(errorDiv, heading);

  //   Clear error after 3 seconds
  window.setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}
