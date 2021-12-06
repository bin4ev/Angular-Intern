class Table {
  constructor(config, data) {
    this.config = config
    this.data = data
    this.start = 0
    this.end = this.config.rows
    this.totalRows = document.createElement('span')
    this.selected
    this.length = 0
    this.countPage = 1
    this.increaseData = true
    this.valueClass
    this.lastPage = false
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

  createTableRows(table) {
    for (let i = 0; i < this.config.rows; i++) {
      let tr = document.createElement("tr");
      tr.setAttribute('id', `${i}`)
      if (this.config.canSelect) {
        this.InitSelect(tr)
      }
      table.appendChild(tr);

      for (let j = 0; j < this.config.columns.length; j++) {
        let c = this.config.columns[j]
        let td = document.createElement("td");
        if (c.cellClass) {
          td.classList.add(c.cellClass)
        }
        tr.appendChild(td);
      }
    }
  }

  createTable() {
    let wrapTable = document.createElement('div')
    wrapTable.classList.add('wrap-table')
    let table = document.createElement("table");
    this.createHead(table)
    this.createTableRows(table)
    wrapTable.appendChild(table)
    document.body.appendChild(wrapTable)
    this.fillRows()
  }

  removeClass(className) {
    if (this.selected) {
      this.selected.classList.remove(className);
    }
  }

  select(target, className) {
    this.removeClass(className)
    this.selected = target
    if (className) {
      this.selected.classList.add(className)
    }
  }

  initKeyEvent(className) {
    window.addEventListener('keydown', (e) => {
      let parent = this.selected.parentNode
      let prevSel = this.selected.previousSibling
      let nextSel = this.selected.nextSibling

      switch (e.key) {
        case 'ArrowUp':
          if (prevSel != parent.firstChild) {
            this.select(prevSel, className)
          }
          break;
        case 'ArrowDown':
          if (nextSel) {
            this.select(nextSel, className)
          }
          break;
        default:
          break;
      }
    })
  }

  InitSelect(node) {
    let className = this.config.selectedRowClass
    node.addEventListener('click', (e) => {
      this.select(e.target.parentNode, className)
      this.initKeyEvent(className)

      if (this.config.onselect) {
        this.config.onselect(e.target.textContent)
      }
    })
  }

  disableBtn(b) {
    b.classList.add('disable')
    b.disabled = true
  }

  enableBtn(b) {
    b.disabled = false
    b.classList.remove('disable')
  }

  nextPage() {
    let btns = document.querySelectorAll('button')
    if (this.lastPage) {
      return
    }
    if (btns[0].disabled) {
      this.enableBtn(btns[0])
    }

    this.increaseData = true
    this.countPage++
    this.start += this.config.rows
    this.end += this.config.rows
    this.fillRows()
    this.removeClass(this.config.selectedRowClass)
  }

  prevPege() {
    let btns = document.querySelectorAll('button')
    if (this.countPage == 1) {
      return
    }

    if (btns[1].disabled) {
      this.enableBtn(btns[1])
    }
    this.increaseData = false
    this.countPage--
    this.start -= this.config.rows, this.end -= this.config.rows
    this.fillRows()
    this.removeClass(this.config.selectedRowClass)

  }

  formatNum(val) {
    return parseFloat(val)
  }

  int(val) {
    return parseInt(val)
  }

  date(val) {
    let date = new Date(val)
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getDate()

    return [day, month].join(' ')
  }

  formatValue(c, val) {
    let res
    let route = {
      'num': this.formatNum(val),
      'date': this.date(val),
      'int': this.int(val)
    }

    if (c.textFn) {
      res = c.textFn(val)
    }
    if (c.format) {
      res = route[c.format]
    }
    return res || val
  }

  addValueClass(c, td, val) {
    let valueClass = c.valueClass(val)
    if (valueClass) {
      td.classList.add(valueClass)
    } else {
      td.removeAttribute('class')
      td.classList.add(c.cellClass)
    }
  }

  fill(data) {
    let tdArr = document.querySelectorAll('tr ~ tr')
    for (let i = 0; i < tdArr.length; i++) {
      let dataObj = data[i]
      let row = tdArr[i].children
      if (dataObj && this.increaseData) {
        this.length++
      }
      for (let k = 0; k < row.length; k++) {
        let td = row[k]
        if (!dataObj) {
          td.textContent = ''
          this.lastPage = true
          continue
        }

        this.lastPage = false
        let c = this.config.columns[k]
        let value = dataObj[c.property]
        if (c.valueClass) {
          this.addValueClass(c, td, value)
        }
        if (this.config.format[c.format]) {
          let formatFunc = this.config.format[c.format]
          td.textContent = formatFunc(value)
        } else {
          td.textContent = this.formatValue(c, value)
        }
      }
    }

    this.totalRows.textContent = `страница ${this.countPage}`
  }

  fillRows() {
    if (typeof this.data == 'function') {
      let result = this.data(this.start, this.end)
      if (!(result instanceof Promise)) {
        result = Promise.resolve(result)
      }
      let btns = document.querySelectorAll('button')
      result.then((data) => this.fill(data))
        .then(() => {
          if (this.lastPage) {
            this.disableBtn(btns[1])
          }
          if (this.countPage == 1) {
            this.disableBtn(btns[0])
          }
        })
    } else {
      let d = this.data.slice(this.start, this.end)
      this.fill(d)
    }

  }

  pagination() {
    let btnPrev = document.createElement('button')
    this.disableBtn(btnPrev)
    let btnNext = document.createElement('button')
    btnPrev.textContent = '<'
    btnNext.textContent = '>'

    btnPrev.addEventListener('click', this.prevPege.bind(this))
    btnNext.addEventListener('click', () => this.nextPage(this))

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      switch (e.key) {
        case 'PageDown':
          this.prevPege()
          break;
        case 'PageUp':
          this.nextPage()
          break;
        case 'Home':
          this.start = 0
          this.end = this.config.rows
          this.countPage = 1
          this.increaseData = false
          this.disableBtn(btnPrev)
          this.enableBtn(btnNext)
          this.fillRows()
          break;
        case 'End':
          this.end = Math.ceil(this.length / this.config.rows) * this.config.rows
          this.start = this.end - this.config.rows
          this.countPage = Math.ceil(this.length / this.config.rows)
          this.increaseData = false
          this.disableBtn(btnNext)
          this.enableBtn(btnPrev)
          this.fillRows()
          break;
        default:
          break;
      }
    })

    let divWrap = document.querySelector('.wrap-table')
    let btnWrap = document.createElement('div')
    btnWrap.classList.add('btn-wrap')
    btnWrap.appendChild(this.totalRows)
    btnWrap.appendChild(btnPrev)
    btnWrap.appendChild(btnNext)
    divWrap.appendChild(btnWrap)

  }
}

let describeColumns = [
  {
    property: "number",
    name: "№",
    headerClass: "bold",
    cellClass: "left",
    textFn: value => value.toUpperCase()
  },
  {
    property: "date",
    name: "Дата",
    format: 'date',
    headerClass: "bold",
    cellClass: "left",
    textFn: value => value.toUpperCase()
  },
  {
    property: "unit",
    name: "Стока",
    headerClass: "bold",
    cellClass: "left",
    textFn: value => value.toUpperCase()
  },
  {
    property: "code",
    name: 'Код  ',
    headerClass: 'italic',
    cellClass: 'left',
    textFn: value => value.toUpperCase()
  },
  {
    property: "weight",
    name: 'Везна',
    headerClass: 'italic',
    cellClass: 'left',
    valueClass: val => val < 0 ? 'red' : undefined,
    textFn: value => value.toUpperCase()
  },
  {
    property: "time",
    name: 'час',
    headerClass: 'italic',
    cellClass: 'left',
    valueClass: val => val < 0 ? 'red' : undefined,
    textFn: value => value.toUpperCase()
  },
  {
    property: "price",
    name: 'Цена',
    headerClass: 'italic',
    format: 'usd',
    cellClass: 'left',
    valueClass: val => val < 0 ? 'red' : undefined,
    textFn: value => value.toUpperCase()
  },
  {
    property: "warehause",
    name: 'Склад',
    headerClass: 'italic',
    cellClass: 'left',
    valueClass: val => val < 0 ? 'red' : undefined,
    textFn: value => value.toUpperCase()
  }
];

let tableConfig = {
  'columns': describeColumns,
  'showHeader': true,
  'rows': 10,
  'format': {
    num: (n) => n.toFixed(2),
    int: (n) => n.toFixed(0),
    usd: (n) => `$${(Number(n).toFixed(2))}`,
  },
  'canSelect': true,
  'selectedRowClass': 'selected-row',
  onselect: (data) => data.toUpperCase()
}


fetch('./data1.json')
  .then(res => res.json())
  .then(data => {
    function dataFunc(pos, count) {
      let d = data.slice(pos, pos + count)
      /*  return Promise.resolve(d) */
      return d
    }

    let t = new Table(tableConfig, dataFunc)
  })
  .catch(e => console.log(e))













/*     this.totalRows.textContent = `${this.start + 1} - ${this.end} of ${this.length}` */
