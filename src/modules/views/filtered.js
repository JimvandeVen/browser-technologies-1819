import { createView } from "./view.js";

function filterView(e) {
  let selectedFilter = e.srcElement.value;
  let labels = document.querySelectorAll(".label");

  labels.forEach(label => {
    label.classList.remove("selected");
  });

  let selectedLabel = e.srcElement.labels[0];
  selectedLabel.classList.add("selected");

  let thisMonth = JSON.parse(localStorage.getItem("thisMonth"));
  let thisMonthFiltered = thisMonth.filter(
    activity => activity.subject == selectedFilter
  );
  let nextMonth = JSON.parse(localStorage.getItem("nextMonth"));
  let nextMonthFiltered = nextMonth.filter(
    activity => activity.subject == selectedFilter
  );

  if (selectedFilter == "all") {
    createView(thisMonth, nextMonth);
  } else {
    createView(thisMonthFiltered, nextMonthFiltered);
  }
}

export { filterView };
