let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = true;
let tmp;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#23d95c";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

//create product

let data;

if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  //count
  if (mood === true) {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        data.push(newPro);
      }
    } else {
      data.push(newPro);
    }
  } else {
    data[tmp] = newPro;
    mood = true;
    submit.innerHTML = "Create";
    count.style.display = "block";
  }
  //save localStorage
  localStorage.setItem("product", JSON.stringify(data));
  cleardata();
  shodata();
};

//clear inputs

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read

function shodata() {
  let table = "";

  for (let i = 0; i < data.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].count}</td>
        <td>${data[i].category}</td>
        <td>
          <button onclick = "updateData(${i})"  id="update"">update</button>
        </td>
        <td>
          <button id="delete" onclick="deleteData(${i})">delete</button>
        </td>
      </tr>`;
    getTotal();
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");

  if (data.length > 0) {
    btnDelete.innerHTML = `
      <button onclick="deleteAllProduct()">Delete All (${data.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}

shodata();

//delete
function deleteData(i) {
  data.pop(i);
  localStorage.product = JSON.stringify(data);
  shodata();
}

function deleteAllProduct() {
  localStorage.clear();
  data.splice(0);
  shodata();
}

// update

function updateData(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  total.innerHTML = data[i].total;
  category.value = data[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = false;
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search

let searchMode = "title";

function gitSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMode = "Category";
    search.placeholder = "Search By Category";
  }

  search.focus();
  search.value = "";
  shodata();
}

function searchData(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i + 1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].count}</td>
        <td>${data[i].category}</td>
        <td>
          <button onclick = "updateData(${i})"  id="update"">update</button>
        </td>
        <td>
          <button id="delete" onclick="deleteData(${i})">delete</button>
        </td>
      </tr>`;
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].category.includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i + 1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].count}</td>
        <td>${data[i].category}</td>
        <td>
          <button onclick = "updateData(${i})"  id="update"">update</button>
        </td>
        <td>
          <button id="delete" onclick="deleteData(${i})">delete</button>
        </td>
      </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
