import { emptyView } from "./empty.js";

function createView(thisMonth, nextMonth) {
  const thisMonthMarkup = thisMonth
    .map((activity, i) => {
      return `
    <article style="animation-delay:${i * 100}ms">
      <h3>${activity.title}</h3>
      <p>${activity.date}</p>
      <p class="summary"">${activity.summary}</p>
      <div><img src="${activity.img}" alt=""></div>
    </article>
    `;
    })
    .join("");

  const nextMonthMarkup = nextMonth
    .map((activity, i) => {
      return `
    <article style="animation-delay:${i * 100}ms">
      <h3>${activity.title}</h3>
      <p>${activity.date}</p>
      <p class="summary"">${activity.summary}</p>
      <div><img src="${activity.img}" alt=""></div>
    </article>
    `;
    })
    .join("");
  emptyView();
  document
    .querySelector(".thisMonth")
    .insertAdjacentHTML("afterBegin", thisMonthMarkup);
  document
    .querySelector(".nextMonth")
    .insertAdjacentHTML("afterBegin", nextMonthMarkup);
}

export { createView }
