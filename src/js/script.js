import { API } from "/node_modules/oba-wrapper/js/index.js";
import { addLoading } from "../modules/views/loader.js";
import { createForm } from "../modules/formCreator.js";
import { dataFormatter } from "../modules/dataFormatter.js";
const api = new API({ key: "1e19898c87464e239192c8bfe422f280" });

let data = [];

(async () => {
  addLoading();
  const iterator = await api.createIterator(
    "search/*&facet=Type(Activiteiten){1000}"
  );
  for await (const response of iterator) {
    data.push(...response);
  }

  createForm(data);
  dataFormatter(data);
})();
