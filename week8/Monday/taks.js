let columnNames = {
  "first-name": "Име",
  "last-name": "Фамилия",
  age: "Възраст",
  city: "Град",
  payment: "Заплата",
  "has-certificate": "Сертификат",
};
let columns = [
  "first-name",
  "last-name",
  "age",
  "city",
  "payment",
  "has-certificate",
];
let people = [
  {
    "first-name": "Иван",
    "last-name": "Иванов",
    age: 22,
    city: "Перник",
    wage: 222.0,
    "has-certificate": true,
  },
  {
    "first-name": "Димитър",
    "last-name": "Дамянов",
    age: 28,
    city: "Перник",
    wage: 292.0,
    "has-certificate": true,
  },
  {
    "first-name": "Стамат",
    "last-name": "Петров",
    age: 28,
    city: "Перник",
    wage: 292.0,
    "has-certificate": true,
  },
  {
    "first-name": "Стоян",
    "last-name": "Динев",
    age: 28,
    city: "Перник",
    wage: 292.0,
    "has-certificate": true,
  },
  {
    "first-name": "Петър",
    "last-name": "Петров",
    age: 28,
    city: "Перник",
    wage: 292.0,
    "has-certificate": true,
  },
];

function createTable(arrPeople, colNames, columns) {
  let table = document.createElement("table");

  for (let data of columns) {
    let tHeadEl = document.createElement("th");
    let textNode = document.createTextNode(colNames[data]);
    tHeadEl.textContent = textNode.nodeValue;
    table.appendChild(tHeadEl);
  }

  for (let person of arrPeople) {
    let tRowEl = document.createElement("tr");
    for (let key in person) {
      let tDataEl = document.createElement("td");
      let textNode2 = document.createTextNode(person[key]);
      tDataEl.textContent = textNode2.nodeValue;
      tRowEl.appendChild(tDataEl);
      table.appendChild(tRowEl);
    }
  }
  document.body.appendChild(table);
}

createTable(people, columnNames, columns);
