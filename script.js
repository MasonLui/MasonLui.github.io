document
  .getElementById("interestForm")
  .addEventListener("input", calculateInterest);

let chart; // Declare the chart variable

function calculateInterest() {
  // Get form values
  let principal = parseFloat(document.getElementById("principal").value);
  let rate = parseFloat(document.getElementById("rate").value) / 100;
  let timesCompounded = parseInt(document.getElementById("compounds").value);
  let years = parseInt(document.getElementById("years").value);

  // Calculate compound interest
  let totalAmount =
    principal * Math.pow(1 + rate / timesCompounded, timesCompounded * years);
  let interestEarned = totalAmount - principal;

  // Update output fields
  document.getElementById("earned").innerText = `$${interestEarned.toFixed(2)}`;
  document.getElementById("total").innerText = `$${totalAmount.toFixed(2)}`;

  // Update the progress bar
  document.getElementById("progress").value = years;

  // Generate data for the chart
  let chartLabels = [];
  let chartData = [];
  for (let i = 1; i <= years; i++) {
    let amount =
      principal * Math.pow(1 + rate / timesCompounded, timesCompounded * i);
    chartLabels.push(`Year ${i}`);
    chartData.push(amount.toFixed(2));
  }

  // Update or create the chart
  if (chart) {
    chart.destroy(); // Destroy the previous chart if it exists
  }

  const ctx = document.getElementById("investmentChart").getContext("2d");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: "Investment Growth",
          data: chartData,
          borderColor: "#74ebd5",
          fill: false,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Update rate output display
const rateSlider = document.getElementById("rate");
const rateValue = document.getElementById("rateValue");

rateSlider.addEventListener("input", function () {
  rateValue.textContent = `${rateSlider.value}%`;
});
