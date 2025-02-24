let $ = document;
let resultContainer = $.getElementById("result");

$.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:5001/api/cmd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        cmd: "GetGeneralFrame",
        subject: "GetEMSFrame",
        id: "559",
        type: "Normal",
        datetime: "2025-01-06 12:12:12",
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

//Create Card
let card = `<div class="card"><h3>KWH (EMS-Meter)</h3><select>
            <option value="minTotal">Min</option>
            <option value="maxTotal">Max</option>
            <option value="sumTotal">Sum</option>
            <option value="countTotal">Count</option>
            <option value="avrageTotal">Avrage</option>
          </select><p>Value: 3.24</p></div>`;
resultContainer.insertAdjacentHTML("afterbegin", card);
