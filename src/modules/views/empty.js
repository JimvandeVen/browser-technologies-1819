function emptyView() {
  const markup = ``;
  document.querySelector(".thisMonth").innerHTML = markup;
  document.querySelector(".nextMonth").innerHTML = markup;
}

export { emptyView };
