import APIService from "./services/ApiService.js";

let $ = document;
let resultContainer = $.getElementById("result");

const apiService = new APIService("http://localhost:5001/api/cmd");
const requestData = {
  cmd: "GetGeneralFrame",
  subject: "GetEMSFrame",
  id: "559",
  type: "Normal",
  datetime: "2025-01-06 12:12:12",
};

$.addEventListener("DOMContentLoaded", async () => {
  const finalObj = await apiService.fetchData(requestData);

  if (finalObj) {
    const groupedSubjects = groupSubjectsByName(finalObj);
    renderGroupedSubjects(groupedSubjects, resultContainer);
  }
});

//Categorize According To Name

function groupSubjectsByName(finalObj) {
  const groupedSubjects = {};

  finalObj.forEach((subject) => {
    if (Array.isArray(subject.SubjectList)) {
      subject.SubjectList.forEach((subjectItem) => {
        const { name, value, type } = subjectItem;
        const parsedValue = JSON.parse(value);

        if (!groupedSubjects[name]) {
          groupedSubjects[name] = createSubjectData(type);
        }

        updateSubjectData(groupedSubjects[name], parsedValue);
      });
    }
  });

  return groupedSubjects;
}
function createSubjectData(type) {
  return {
    type,
    minTotal: 0,
    maxTotal: 0,
    sumTotal: 0,
    countTotal: 0,
    avrageTotal: 0,
  };
}
function updateSubjectData(subjectData, parsedValue) {
  subjectData.minTotal += parsedValue.min ? parseFloat(parsedValue.min) : 0;
  subjectData.maxTotal += parsedValue.max ? parseFloat(parsedValue.max) : 0;
  subjectData.sumTotal += parsedValue.sum ? parseFloat(parsedValue.sum) : 0;
  subjectData.countTotal += parsedValue.count ? parseInt(parsedValue.count) : 0;
  subjectData.avrageTotal = subjectData.countTotal
    ? subjectData.sumTotal / subjectData.countTotal
    : 0;
}
function renderGroupedSubjects(groupedSubjects, resultContainer) {
  resultContainer.innerHTML = "";
  Object.keys(groupedSubjects).forEach((name) => {
    const subjectData = groupedSubjects[name];
    const cardHTML = generateSubjectCard(name, subjectData);
    resultContainer.insertAdjacentHTML("beforeend", cardHTML);

    const card = resultContainer.querySelector(".card:last-child");
    const select = card.querySelector("select");
    const valueDisplay = card.querySelector("p");

    select.addEventListener("change", (event) => {
      const selectedKey = event.target.value;
      valueDisplay.textContent = `Value: ${subjectData[selectedKey].toFixed(
        2
      )}`;
    });
  });
}
function generateSubjectCard(name, subjectData) {
  return `
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
}
