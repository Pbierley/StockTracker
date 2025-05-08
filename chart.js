const chartInstances = {}; // Global object to store chart instances

function showChart(ticker, tradingData) {
  // Convert object to array and sort by date
  const entries = Object.entries(tradingData).sort(
    ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
  );

  const labels = entries.map(([date]) => date);
  const closePrices = entries.map(([_, data]) => parseFloat(data["4. close"]));

  // Create new Chart instance if it doesn't exist
  if (!chartInstances[ticker]) {
    chartInstances[ticker] = new Chart(
      document.getElementById(`${ticker}-chart`).getContext("2d"),
      {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: `${ticker} Closing Price`,
              data: closePrices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.2,
              fill: true,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Price (USD)",
              },
              beginAtZero: false,
            },
          },
        },
      }
    );
  } else {
    console.log(`Chart for ${ticker} already exists`);
  }
}
