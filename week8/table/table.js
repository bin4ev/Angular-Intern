class Table {
  constructor(config, data) {
    this.data = data
    this.config = config
    this.createTable()
    this.pagination()
  }

  createHead(table) {
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
  }

  createBody(table) {
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
  }

  createTable() {
    let table = document.createElement("table");
    this.createHead(table)
    this.createBody(table)
    document.body.appendChild(table)
  }

  removeClass(className) {
    let selectedEL = document.querySelectorAll(`.${className}`)
    if (selectedEL) {
      for (let n of selectedEL)
        n.classList.remove(className);
    }

    return selectedEL
  }

  onSelect(node) {
    if (!this.config.canSelect) {
      return
    }

    node.addEventListener('click', (e) => {
      let className = this.config.selectedRowClass
      this.removeClass(className)

      if (className) {
        node.classList.add(className)
      }
      if (this.config.onselect) {
        this.config.onselect(node)
      }

      window.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowUp') {
          let targetEl = this.removeClass(className)
          targetEl[0].previousSibling.classList.add(className)
        }
      })

      window.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowDown') {
          let targetEl = this.removeClass(className)
          targetEl[0].nextSibling.classList.add(className)
        }
      })
    })
  }

  pagination() {
    let btnPrev = document.createElement('button')
    let btnNext = document.createElement('button')
    btnPrev.textContent = 'Prev'
    btnNext.textContent = 'Next'
    let start = 0, end = this.config.rows
    let data = this.data
    let config = this.config

    btnPrev.addEventListener('click', prevPege)
    btnNext.addEventListener('click', () => { nextPage(start, end) })

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      if (e.key == 'PageDown') {
        prevPege()
      }
    })

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      if (e.key == 'PageUp') {
        nextPage(start, end)
      }
    })

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      if (e.key == 'Home') {
        exactPage(0, config.rows)
      }
    })

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      if (e.key == 'End') {
        let end = Math.round(this.data.length / this.config.rows) * this.config.rows
        let start = end - this.config.rows
        exactPage(start, end)
      }
    })

    function nextPage(begin, ending) {
      if (ending > data.length - 1) {
        return
      }

      begin += config.rows, ending += config.rows
      fillRows(begin, ending)
      if (ending)
        totalRows.textContent = `${begin + 1}-${ending} of ${data.length}`
      start = begin, end = ending
    }

    function prevPege() {
      if (start < 1) {
        return
      }

      start -= config.rows, end -= config.rows
      fillRows(start, end)
      totalRows.textContent = `${start + 1}-${end} of ${data.length}`
    }

    function exactPage(begin, ending) {
      fillRows(begin, ending)
      totalRows.textContent = `${begin + 1}-${ending} of ${data.length}`
      start = begin, end = ending
    }

    function fillRows(start, end) {
      let tdArr = document.querySelectorAll('tr ~ tr')
      let j = 0
      let i = start
      for (; i < end; i++, j++) {
        let dataObj = data[i]
        let row = tdArr[j].children
        for (let k = 0; k < row.length; k++) {
          let td = row[k]
          let c = config.columns[k]

          td.textContent = data[i] ? dataObj[c.property] : ''
        }
      }
    }

    let totalRows = document.createElement('span')
    totalRows.textContent = `${start + 1}-${end} of ${this.data.length}`
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