class Table {
  constructor(config, data) {
    this.data = data
    this.config = config
    this.createTable()
    this.pagination()
  }

  createTable() {
    let table = document.createElement("table");

    if (this.config.showHeader) {
      let tr = document.createElement("tr");
      table.appendChild(tr);


      for (let obj of this.config.columns) {
        let tHeadEl = document.createElement("th");
        if (obj.headerClass) {
          tHeadEl.classList.add(obj.headerClass)
        }
        tHeadEl.textContent = obj.name
        tr.appendChild(tHeadEl);
      }
    }

    for (let i = 0; i < this.config.rows; i++) {
      let tr = document.createElement("tr");
      this.onSelect(tr)
      table.appendChild(tr);

      for (let j = 0; j < this.config.columns.length; j++) {
        let c = this.config.columns[j]
        let td = document.createElement("td");
        if (c.cellClass) {
          td.classList.add(c.cellClass)
        }
        //to do format
        td.textContent = this.data[i] ? this.data[i][c.property] : ''
        tr.appendChild(td);
      }
    }
    document.body.appendChild(table)
  }

  onSelect(node) {
    if (!this.config.canSelect) {
      return
    }

    node.addEventListener('click', () => {
      let selectedEL = document.querySelector(`.${this.config.selectedRowClass}`)
      if (selectedEL) {
        selectedEL.classList.remove(this.config.selectedRowClass);
      }
      if (this.config.selectedRowClass) {
        node.classList.add(this.config.selectedRowClass)
      }
      if (this.config.onselect) {
        this.config.onselect(node)
      }
    })
  }

  pagination() {
    let btnPrev = document.createElement('button')
    let btnNext = document.createElement('button')
    btnPrev.textContent = 'Prev'
    btnNext.textContent = 'Next'
    let start = 1, end = this.config.rows

    btnPrev.addEventListener('click', () => {
      if (start == 1) {
        return
      }

      start -= this.config.rows, end -= this.config.rows
      let tdArr = document.querySelectorAll('tr ~ tr')
      let j = 0
      let i = start
      for (; i < end; i++, j++) {
        let elObj = this.data[i]
        let row = tdArr[j].children
        for (let k = 0; k < row.length; k++) {
          let td = row[k]
          let c = this.config.columns[k]
          td.textContent = elObj[c.property]
        }
      }
      totalRows.textContent = `${start}-${end} of ${this.data.length}`
    })

    btnNext.addEventListener('click', () => {
      if (end >= this.data.length) {
        return
      }

      start += this.config.rows, end += this.config.rows
      if (end > this.data.length) {
        end = this.data.length
      }


      let tdArr = document.querySelectorAll('tr ~ tr')
      let j = 0
      let i = start
      for (; i < end; i++, j++) {
        let elObj = this.data[i]
        let row = tdArr[j].children
        for (let k = 0; k < row.length; k++) {
          let td = row[k]
          let c = this.config.columns[k]
          td.textContent = elObj[c.property]
        }
      }
      totalRows.textContent = `${start}-${end} of ${this.data.length}`
    })

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      if (e.key == 'PageDown') {
        if (start == 1) {
          return
        }
      }
      //make func
      start -= this.config.rows, end -= this.config.rows
      let tdArr = document.querySelectorAll('tr ~ tr')
      let j = 0
      let i = start
      for (; i < end; i++, j++) {
        let elObj = this.data[i]
        let row = tdArr[j].children
        for (let k = 0; k < row.length; k++) {
          let td = row[k]
          let c = this.config.columns[k]
          td.textContent = elObj[c.property]
        }
      }
      totalRows.textContent = `${start}-${end} of ${this.data.length}`
    })

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      if (e.key == 'PageUp') {
        if (end >= this.data.length) {
          return
        }
        //make func
        start += this.config.rows, end += this.config.rows
        if (start > this.data.length - this.config.rows) {
          start = this.data.length - this.config.rows
        }

        let tdArr = document.querySelectorAll('tr ~ tr')
        let j = 0
        let i = start
        for (; i < end; i++, j++) {
          let elObj = this.data[i]
          let row = tdArr[j].children
          for (let k = 0; k < row.length; k++) {
            let td = row[k]
            let c = this.config.columns[k]
            td.textContent = elObj[c.property]
          }
        }
        totalRows.textContent = `${start}-${end} of ${this.data.length}`
      }

    })

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      if (e.key == 'Home') {

        //make func
        start = 1, end = this.config.rows
        let tdArr = document.querySelectorAll('tr ~ tr')
        let j = 0
        let i = start
        for (; i < end; i++, j++) {
          let elObj = this.data[i]
          let row = tdArr[j].children
          for (let k = 0; k < row.length; k++) {
            let td = row[k]
            let c = this.config.columns[k]
            td.textContent = elObj[c.property]
          }
        }
        totalRows.textContent = `${start}-${end} of ${this.data.length}`
      }

    })

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      if (e.key == 'End') {

        //make func
        start = this.data.length - this.config.rows, end = this.data.length
        let tdArr = document.querySelectorAll('tr ~ tr')
        let j = 0
        let i = start
        for (; i < end; i++, j++) {
          let elObj = this.data[i]
          let row = tdArr[j].children
          for (let k = 0; k < row.length; k++) {
            let td = row[k]
            let c = this.config.columns[k]
            td.textContent = elObj[c.property]
          }
        }
        totalRows.textContent = `${start + 1}-${end} of ${this.data.length}`
      }

    })

    let totalRows = document.createElement('span')
    totalRows.textContent = `${start}-${end} of ${this.data.length}`
    document.body.appendChild(btnPrev)
    document.body.appendChild(totalRows)
    document.body.appendChild(btnNext)
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
  },
];

let tableConfig = {
  'columns': describeColumns,
  'showHeader': true,
  'rows': 10,
  'canSelect': true,
  'selectedRowClass': 'selected-row',
  onselect: (data) => console.log(data)
}

fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    let t = new Table(tableConfig, data)
  })
  .catch(e => console.log(e))

























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