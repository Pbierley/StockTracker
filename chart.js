// chart.js

function showChart(ticker, priceData) {
  const ctx = document.getElementById(`${ticker}-chart`);

  const dates = Object.keys(priceData).sort(); // Ensure chronological order

  const candleData = dates.map((date) => {
    const day = priceData[date];
    return {
      x: date,
      o: parseFloat(day["1. open"]),
      h: parseFloat(day["2. high"]),
      l: parseFloat(day["3. low"]),
      c: parseFloat(day["4. close"]),
    };
  });

  new Chart(ctx, {
    type: "candlestick",
    data: {
      datasets: [
        {
          label: `${ticker} Stock Data`,
          data: candleData,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${ticker} Candlestick Chart`,
        },
      },
      scales: {
        x: {
          type: "timeseries",
          time: {
            unit: "day",
            tooltipFormat: "MMM dd",
          },
          ticks: {
            source: "auto",
          },
        },
        y: {
          title: {
            display: true,
            text: "Price (USD)",
          },
        },
      },
    },
  });
}
