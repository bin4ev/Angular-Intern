class Table {
  constructor(config, data) {
    this.data = data
    this.config = config
    this.createTable(config.columns, data)
  }

  showHeader(t) {
    let title = 'Title'
    if (this.config.showHeader) {
      let cap = document.createElement("caption");
      cap.textContent = title
      t.appendChild(cap)
    }
  }

  onSelect(node) {
    if (!this.config.canSelect) {
      node.style.display = 'none'
      return
    }

    node.classList.add(this.config.selectedRowClass)
    node.addEventListener('click', () => {
      this.config.onselect(node) //ask node or target
    })
  }

  createTable(col, data) {
    let table = document.createElement("table");
    this.showHeader(table)
    let tr = document.createElement("tr");
    table.appendChild(tr);

    for (let obj of col) {
      let tHeadEl = document.createElement("th");
      tHeadEl.classList.add(obj.headerClass)
      tHeadEl.textContent = obj.name
      tr.appendChild(tHeadEl);
    }

    for (let el of data) {
      let tr = document.createElement("tr");
      this.onSelect(tr)

      for (let c of col) {
        let td = document.createElement("td");
        td.classList.add(c.cellClass)
        td.textContent = c.textFn(el[c.property])
        tr.appendChild(td);
      }

      table.appendChild(tr);
      this.config.rows--
    }

    while (this.config.rows > 0) {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      tr.appendChild(td);
      table.appendChild(tr);
      this.config.rows--
    }
    document.body.appendChild(table);
  }

}

let describeColumns = [
  {
    property: "first-name",
    name: "Име",
    format: "num",
    headerClass: "bold",
    cellClass: "left",
    textFn: value => value.toUpperCase()
  },
  {
    property: "last-name",
    name: 'Фамилия',
    format: 'num',
    headerClass: 'italic',
    cellClass: 'left',
    textFn: value => value.toUpperCase()
  },
  {
    property: "age",
    name: 'Възраст',
    format: 'num',
    headerClass: 'italic',
    cellClass: 'left',
    textFn: value => value.toUpperCase()
  }

];

let tableConfig = {
  'columns': describeColumns,
  'showHeader': true,
  'rows': 16,
  'canSelect': true,
  'selectedRowClass': 'selected-row',
  onselect: (data) => data.style.color = 'red'
}

fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    let t = new Table(tableConfig, data)
  })
  .catch(e=>console.log(e))

























// table1
/* function createTable(arrPeople, colNames, col) {
  let table = document.createElement("table");

  for (let data of col) {
    let tHeadEl = document.createElement("th");
    tHeadEl.textContent = colNames[data]
    table.appendChild(tHeadEl);
  }

  for (let person of arrPeople) {
    let tr = document.createElement("tr");
    for (let c of col) {
      let td = document.createElement("td");
      td.textContent = person[c]
      tr.appendChild(td);
      table.appendChild(tr);
    }
  }
  document.body.appendChild(table);
}

createTable(people, columnNames, col);
 */