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
      if (nextSel == parent.lastChild) {

      }
      switch (e.key) {
        case 'ArrowUp':
          if (prevSel != parent.firstChild) {
            this.select(prevSel, className)
          }
          break;
        case 'ArrowDown': //do for last node
          this.select(nextSel, className)
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

  nextPage() {
    let btns = document.querySelectorAll('button')
    if (this.end > this.length) {
      let btn = btns[1]
      btn.classList.add('disable')
      btn.disabled = true
      return
    }                               //do func
    let btn = btns[0]
    if (btn.disabled) {
      btn.disabled = false
      btn.classList.remove('disable')
    }
    this.increaseData = true
    this.countPage++
    this.start += this.config.rows
    this.end += this.config.rows
    this.fillRows()
  }

  prevPege() {
    let btns = document.querySelectorAll('button')
    if (this.start <= 1) {
      let btn = btns[0]
      btn.classList.add('disable')
      btn.disabled = true
      return
    }                                   //do func

    if (btns[1].disabled) {
      btns[1].disabled = false
      btns[1].classList.remove('disable')
    }
    this.increaseData = false
    this.countPage--
    this.start -= this.config.rows, this.end -= this.config.rows
    this.fillRows()
  }

  formarNum(val) {

  }

  formatValue(c, val) {
    if (c.textFn) {
      return c.textFn(val)
    }

    if (c.format && c.format == 'num') {
      return this.formatNum(val)
    }

    return val || ''
  }

  addValueClass(c, td, dataObj) {
    let val = dataObj[c.property]
    let valueClass = c.valueClass(val)
    if (valueClass) {
      td.classList.add(valueClass)
    } else {
      td.classList.remove(this.valueClass) //clear all  add default
    }
  }

  fill(data) {
    let tdArr = document.querySelectorAll('tr ~ tr')

    for (let i = 0; i < tdArr.length; i++) {
      let dataObj = data[i]
      if(dataObj){
        //fillEmpty
      }
      if (dataObj && this.increaseData) {
        this.length++
      }
      let row = tdArr[i].children

      for (let k = 0; k < row.length; k++) {
        let td = row[k]
        let c = this.config.columns[k]
        if (c.valueClass) {
          this.addValueClass(c, td, dataObj)
        }
        let value = dataObj[c.property]
        td.textContent = this.formatValue(c, value)
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
      result.then((data) => this.fill(data))
    } else {
      let d = this.data.slice(this.start, this.end)
      this.fill(d)
    }
  }

  pagination() {
    let btnPrev = document.createElement('button')
    let btnNext = document.createElement('button')
    btnPrev.textContent = '<'
    btnNext.textContent = '>'
    
    btnPrev.addEventListener('click', ()=>this.prevPege(this))
    btnNext.addEventListener('click', ()=> this.nextPage(this))

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
          this.fillRows()
          break;
        case 'End':
          this.end = Math.ceil(this.length / this.config.rows) * this.config.rows
          this.start = this.end - this.config.rows
          this.countPage = Math.ceil(this.length / this.config.rows)
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
    format: 'num',
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
