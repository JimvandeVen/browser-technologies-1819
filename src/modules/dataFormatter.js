import { createObject } from "./objectCreator.js";
import { createView } from "./views/view.js";

function dataFormatter(activities) {
  console.log(activities);
  let thisMonth = [];
  let nextMonth = [];

  activities.map(activity => {
    let activityObject = createObject(activity);

    if (
      activity.titles.title._text &&
      activityObject.date.includes("maart") &&
      activityObject.date.substring(0, activityObject.date.indexOf(" ")) !==
        "maart" &&
      activityObject.date.substring(0, activityObject.date.indexOf(" ")) !== ""
    ) {
      thisMonth.push(activityObject);
    } else if (
      activity.titles.title._text &&
      activityObject.date.includes("april") &&
      activityObject.date.substring(0, activityObject.date.indexOf(" ")) !==
        "april" &&
      activityObject.date.substring(0, activityObject.date.indexOf(" ")) !== ""
    ) {
      nextMonth.push(activityObject);
    }
  });

  let thisMonthSorted = thisMonth.sort(function(a, b) {
    return (
      a.date.substring(0, a.date.indexOf(" ")) -
      b.date.substring(0, b.date.indexOf(" "))
    );
  });
  let nextMonthSorted = nextMonth.sort(function(a, b) {
    return (
      a.date.substring(0, a.date.indexOf(" ")) -
      b.date.substring(0, b.date.indexOf(" "))
    );
  });
  localStorage.clear();
  localStorage.setItem("thisMonth", JSON.stringify(thisMonthSorted));
  localStorage.setItem("nextMonth", JSON.stringify(nextMonthSorted));
  createView(thisMonthSorted, nextMonthSorted);
}

export { dataFormatter };
