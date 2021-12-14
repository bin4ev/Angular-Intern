import { createElementsWithClass, apend } from './helpers.js';

function createDisplayComp(display) {
    let [hours, min, sec, sep1, sep2] = createElementsWithClass(5, 'span', 'display')
    hours.textContent = defHours
    min.textContent = defMin
    sec.textContent = defSec
    sep1.textContent = ':'
    sep2.textContent = ':'
    apend(display, [hours, sep1, min, sep2, sec])
    return [hours, min, sec]
}

function createBtns(n) {
    let [startBtn, resetBtn,...rest] = createElementsWithClass(n, 'button', 'btn')
    startBtn.textContent = 'Start'
    resetBtn.textContent = 'Reset'
    resetBtn.disabled = true
    return [startBtn, resetBtn,...rest]
}

function createShowTimer() {
    let [editWraper, showTimer, edit] = createElementsWithClass(3, 'div')
    editWraper.classList = 'edit-wraper'
    showTimer.setAttribute('id', 'showTimer')
    edit.setAttribute('id', 'edit')
    edit.textContent = '🖉 Edit'
    apend(editWraper, [showTimer, edit])
    showTimer.textContent = `Timer 1 (${defHours}:${defMin}:${defSec})`
    return [editWraper, showTimer]
}


let defHours = '02', defMin = '00', defSec = '00'

function timer() {
    let timer = document.getElementById('timer')
    let main = document.createElement('div')
    main.classList = 'main'
    let display = document.createElement('section')
    let [hours, min, sec,] = createDisplayComp(display)
    let [startBtn, resetBtn] = createBtns(2)
    let [editWraper, showTimer] = createShowTimer()
    apend(main, [display, startBtn, resetBtn])
    apend(timer, [main, editWraper])

    startBtn.addEventListener('click', getStart)
    resetBtn.addEventListener('click', resetTimer)
    edit.addEventListener('click', startEditDisplay)
    display.addEventListener('keydown', validate)

    function startEditDisplay(e) {
        if (startBtn.textContent != 'Start') {
            return
        }

        e.preventDefault()
        hours.contentEditable = true
        min.contentEditable = true
        sec.contentEditable = true
        sec.focus()
    }

    function stopEditDisplay() {
        hours.contentEditable = false
        min.contentEditable = false
        sec.contentEditable = false
        defHours = hours.textContent
        defMin = min.textContent
        defSec = sec.textContent
        showTimer.textContent = `Timer 1 (${defHours}:${defMin}:${defSec})`

    }

    function validate(e) {
        e.preventDefault()
        if (!isNaN((e.key))) {
            if (e.target.textContent.length >= 2) {
                e.target.textContent = ''
            }
            if (e.target.textContent.length <= 2) {
                e.target.textContent += e.key
            }
            if (Number(e.target.textContent > 59)) {
                e.target.textContent = 59
            }
            e.target.onblur =() => e.target.textContent = e.target.textContent.padStart(2, '0') 
        }
     
    }

    function resetTimer() {
        hours.textContent = defHours
        min.textContent = defMin
        sec.textContent = defSec
        clearInterval(ticking)
        startBtn.textContent = 'Start'
        startBtn.classList.remove('active')
        resetBtn.disabled = true
    }

    function decreaseElValue(el) {
        el.textContent--
        el.textContent = el.textContent.padStart(2, '0')
    }

    let ticking
    function startTicking() {
        ticking = setInterval(() => {   
            if (sec.textContent == 0) {
                sec.textContent = 60
                if (min.textContent > 0) { // arr
                    decreaseElValue(min)
                } else {
                    min.textContent = 59
                    if (hours.textContent > 0) {
                        decreaseElValue(hours)
                    }
                }
            }
            decreaseElValue(sec)

            if (hours.textContent == 0 && min.textContent == 0 && sec.textContent == 0) {
                clearInterval(ticking)
            }
        }, 1000);
    }

    function getStart() {
        if (startBtn.textContent == 'Start') {
            startTimer()
            return
        }

        startBtn.textContent = 'Start'
        startBtn.classList.remove('active')
        clearInterval(ticking)
        resetBtn.disabled = false
    }

    function startTimer() {
        startBtn.textContent = 'Pause'
        startBtn.classList.add('active')
        resetBtn.disabled = true
        stopEditDisplay()
        startTicking()
    }
}

timer()