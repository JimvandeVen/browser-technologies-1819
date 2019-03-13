function addLoading() {
  let loading = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];
  const markup = loading
    .map((activity, i) => {
      return `
    <article class="loading" style="animation-delay:${i * 100}ms">
      <h3 class="loading__title"></h3>
      <p class="loading__date"></p>
      <p class="loading__summary"></p>
      <div><img class="loading__img" src="" alt=""></div>
    </article>
    `;
    })
    .join("");

  document.querySelector(".thisMonth").insertAdjacentHTML("afterBegin", markup);
}

export { addLoading };
