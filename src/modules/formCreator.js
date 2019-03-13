import { filterView } from "./views/filtered.js";

function createForm(data) {
  let allSubjects = [];

  data.forEach(activity => {
    allSubjects.push(
      activity.subjects["topical-subject"]._attributes["search-term"]
    );
  });

  let uniqueSubjects = [...new Set(allSubjects)];

  const formMarkup = `
  <input checked type="radio" class="input" id="all"
   name="subject" value="all">
  <label class="label selected" for="all">Alle activiteiten</label>
  ${uniqueSubjects
    .map(subject => {
      return `
    <input class="input" type="radio" id="${subject}"
     name="subject" value="${subject}">
    <label class="label" for="${subject}" id="${subject}">${subject}</label>
    `;
    })
    .join("")}
  `;
  document
    .querySelector(".filterForm")
    .insertAdjacentHTML("afterBegin", formMarkup);
  const radios = document.querySelectorAll('input[type=radio][name="subject"]');

  radios.forEach(radio => {
    radio.addEventListener("change", filterView);
  });
}

export { createForm };
