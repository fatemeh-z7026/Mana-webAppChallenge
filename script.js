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

    if (!data || typeof data !== "object" || !data.finalObj) {
      console.error("Invalid response format!");
      return;
    }

    const parsedFinalObj = JSON.parse(data.finalObj);
    console.log(parsedFinalObj);

    if (!Array.isArray(parsedFinalObj) || parsedFinalObj.length === 0) {
      console.error("finalObj is not a valid array!");
      return;
    }

    //Categorize According To Name
    const groupedSubjects = {};

    parsedFinalObj.forEach((subject) => {
      if (Array.isArray(subject.SubjectList)) {
        subject.SubjectList.forEach((subjectItem) => {
          const { name, value, type } = subjectItem;
          const parsedValue = JSON.parse(value);

          if (!groupedSubjects[name]) {
            groupedSubjects[name] = {
              type,
              minTotal: 0,
              maxTotal: 0,
              sumTotal: 0,
              countTotal: 0,
              avrageTotal: 0,
            };
          }

          groupedSubjects[name].minTotal += parsedValue.min
            ? parseFloat(parsedValue.min)
            : 0;
          groupedSubjects[name].maxTotal += parsedValue.max
            ? parseFloat(parsedValue.max)
            : 0;
          groupedSubjects[name].sumTotal += parsedValue.sum
            ? parseFloat(parsedValue.sum)
            : 0;
          groupedSubjects[name].countTotal += parsedValue.count
            ? parseInt(parsedValue.count)
            : 0;
          groupedSubjects[name].avrageTotal = groupedSubjects[
            name
          ].avrageTotal = groupedSubjects[name].countTotal
            ? groupedSubjects[name].sumTotal / groupedSubjects[name].countTotal
            : 0;
        });
      }
    });

    resultContainer.innerHTML = "";
    const keyArray = Object.keys(groupedSubjects);
    keyArray.forEach((name) => {
      const subjectData = groupedSubjects[name];

      let cardHTML = `
    <div class="card">
      <h3>${name} (${subjectData.type})</h3>
      <select>
        <option value="">Select...</option>
        <option value="minTotal">Min</option>
        <option value="maxTotal">Max</option>
        <option value="sumTotal">Sum</option>
        <option value="countTotal">Count</option>
        <option value="avrageTotal">Avrage</option>
      </select>
      <p>Value: 0</p>
    </div>
  `;

      resultContainer.insertAdjacentHTML("beforeend", cardHTML);

      const card = resultContainer.querySelector(`.card:last-child`);
      const select = card.querySelector("select");
      const valueDisplay = card.querySelector("p");

      select.addEventListener("change", (event) => {
        const selectedKey = event.target.value;
        valueDisplay.textContent = `Value: ${subjectData[selectedKey].toFixed(
          2
        )}`;
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
