const urlModels = "https://autoapi.dezinfeksiyatashkent.uz/api/models";
const urlBrands = "https://autoapi.dezinfeksiyatashkent.uz/api/brands";

// Get models MAIN PAGE
const modelsLists = document.querySelector("#models-lists");
fetch(urlModels)
  .then((res) => res.json())
  .then((models) => {
    models.data.forEach((model) => {
      const { brand_title, name } = model;
      modelsLists.innerHTML += `
        <tr>
            <td>${brand_title}</td>
            <td>${name}</td>
        </tr>
        `;
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Get brands MODAL PAGE

const brandsList = document.querySelector("#brandsList");
fetch(urlBrands)
  .then((res) => res.json())
  .then((brands) => {
    brands.data.forEach((brand) => {
      const { title, id } = brand;
      brandsList.innerHTML += `
        <option data-id=${id} value=${id}>${title}</option>
        `;
    });
  });

// POST Brand models

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNDEyNzUwMiwiZXhwIjoxNzQ1NjYzNTAyfQ.vvgAX4qmbf63w6k5JYgDXKTCwuxyJ8Z8ApPcQTCsbOU";
const formModal = document.querySelector("#formModal");
const nameModel = document.querySelector("#nameModel");

formModal.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(`${urlModels}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      brand_id: brandsList.value,
      name: nameModel.value,
    }),
  })
    .then((res) => res.json())
    .then(() => window.location.reload())
    .catch((err) => {
      console.log(err);
    });
});
