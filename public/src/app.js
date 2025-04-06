document.getElementById("suggestBtn").addEventListener("click", async () => {
    const location = document.getElementById("location").value;
    const soil = document.getElementById("soil").value;
    const season = document.getElementById("season").value;
  
    const output = document.getElementById("output");
    output.innerText = "⏳ Getting crop suggestions...";
  
    try {
      const response = await fetch("https://<your-cloud-function-url>", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ location, soil, season })
      });
  
      const data = await response.json();
      output.innerText = "🌱 Suggested Crops:\n\n" + data.suggestion;
    } catch (error) {
      output.innerText = "❌ Failed to get suggestions. Try again.";
      console.error(error);
    }
  });
   
