import LeaderLine from 'leader-line-new'
import { randint } from './utils/random'
import HMS from './utils/HMS'

export default function exerciceHoraireDebut(app: HTMLElement) {
  // On crée le container et on y place les div
  const container = document.createElement('div')
  container.style.maxWidth = '800px'
  container.style.margin = 'auto'
  container.style.marginTop = '50px'
  app.append(container)
  const divQuestion = document.createElement('div')
  const divEnonce = document.createElement('div')
  divEnonce.style.marginBottom = '50px'
  container.appendChild(divEnonce)
  divQuestion.style.textAlign = 'center'
  container.appendChild(divQuestion)
  const divHour1 = document.createElement('div')
  const divHour2 = document.createElement('div')
  const divHour3 = document.createElement('div')
  const divHour4 = document.createElement('div')
  const divStep1 = document.createElement('div')
  const divStep2 = document.createElement('div')
  const divStep3 = document.createElement('div')
  const divStepTotal = document.createElement('div')
  const button = document.createElement('button')
  const buttonRedo = document.createElement('button')
  buttonRedo.innerText = 'Nouvelle question'
  buttonRedo.style.marginRight = '30px'
  button.innerText = 'Vérifier'
  button.style.margin = 'auto'
  container.appendChild(buttonRedo)
  container.appendChild(button)
  const divFeedback = document.createElement('div')
  divFeedback.style.display = 'inline'
  divFeedback.style.marginLeft = '20px'
  divFeedback.style.fontWeight = 'bolder'
  container.appendChild(divFeedback)
  divQuestion.appendChild(divHour1)
  divQuestion.appendChild(divHour2)
  divQuestion.appendChild(divHour3)
  divQuestion.appendChild(divHour4)
  divQuestion.appendChild(divStep1)
  divQuestion.appendChild(divStep2)
  divQuestion.appendChild(divStep3)
  divQuestion.appendChild(divStepTotal)
  divStepTotal.style.fontWeight = 'bolder'
  divStep1.style.fontWeight = 'bolder'
  divStep2.style.fontWeight = 'bolder'
  divStep3.style.fontWeight = 'bolder'
  divHour4.style.fontWeight = 'bolder'
  divStep1.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  divStep2.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  divStep3.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  divHour2.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  divHour3.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  divQuestion.style.display = 'grid'
  divQuestion.style.gridTemplateColumns = 'repeat(7, 1fr)'
  divQuestion.style.gridTemplateRows = '30px auto 150px'
  divQuestion.style.alignItems = 'center'
  divHour2.contentEditable = 'true'
  divHour2.style.backgroundColor = 'white'
  divHour3.contentEditable = 'true'
  divHour3.style.backgroundColor = 'white'
  divStep1.style.backgroundColor = 'white'
  divStep2.style.backgroundColor = 'white'
  divStep3.style.backgroundColor = 'white'
  divHour4.style.backgroundColor = 'white'
  divHour1.style.gridColumn = '1'
  divHour2.style.gridColumn = '3'
  divHour3.style.gridColumn = '5'
  divHour4.style.gridColumn = '7'
  divStep1.style.gridColumn = '2'
  divStep2.style.gridColumn = '4'
  divStep3.style.gridColumn = '6'
  divStep1.style.gridRow = '1'
  divStep2.style.gridRow = '1'
  divStep3.style.gridRow = '1'
  divHour1.style.gridRow = '2'
  divHour2.style.gridRow = '2'
  divHour3.style.gridRow = '2'
  divHour4.style.gridRow = '2'
  divStep1.contentEditable = 'true'
  divStep2.contentEditable = 'true'
  divStep3.contentEditable = 'true'
  divHour4.contentEditable = 'true'
  divHour1.style.padding = '10px'
  divHour2.style.padding = '10px'
  divHour3.style.padding = '10px'
  divHour4.style.padding = '10px'
  divStep1.style.padding = '10px'
  divStep2.style.padding = '10px'
  divStep3.style.padding = '10px'
  divStepTotal.style.gridRow = '3'
  divStepTotal.style.gridColumn = '4'
  divQuestion.style.columnGap = '20px'

  let startHour: HMS
  let hour2: HMS
  let hour3: HMS
  let endHour: HMS

  function init(): void {
    startHour = new HMS({ hour: randint(1, 23), minute: randint(1, 59) })
    hour2 = new HMS()
    hour3 = new HMS()
    endHour = new HMS({ hour: startHour.hour + randint(1, 3), minute: randint(1, startHour.minute - 1) })
    divEnonce.innerText = `Un évènement se termine à ${endHour.toString()} et a duré ${endHour
      .substract(startHour)
      .toString()}. À quelle heure a-t-il commencé ?`
    divHour1.innerText = endHour.toString()
    divHour4.innerText = ''
    divStep1.innerText = '+/- ?'
    divStep2.innerText = '+/- ?'
    divStep3.innerText = '+/- ?'
    divStepTotal.innerText = endHour.substract(startHour).toString()
    divHour2.innerText = ''
    divHour3.innerText = ''
    divStep1.style.color = 'black'
    divStep2.style.color = 'black'
    divStep3.style.color = 'black'
    divStepTotal.style.color = 'black'
    divFeedback.innerText = ''
  }

  init()

  new LeaderLine(divHour1, divHour2, { dropShadow: true })
  new LeaderLine(divHour2, divHour3, { dropShadow: true })
  new LeaderLine(divHour3, divHour4, { dropShadow: true })
  new LeaderLine(divHour1, divHour4, { path: 'arc', dropShadow: true, startSocket: 'bottom', endSocket: 'bottom', startSocketGravity: 400 })

  button.addEventListener('click', () => {
    if (checkStep1() && checkStep2() && checkStartHour()) {
      divFeedback.innerText = 'Bravo !'
      divFeedback.style.color = 'green'
    } else {
      divFeedback.innerText = 'Non, essaie encore.'
      divFeedback.style.color = 'red'
    }
  })

  buttonRedo.addEventListener('click', init)

  divStep1.addEventListener('focusin', () => removeQuestionMark(divStep1))
  divStep2.addEventListener('focusin', () => removeQuestionMark(divStep2))
  divStep3.addEventListener('focusin', () => removeQuestionMark(divStep3))
  divStepTotal.addEventListener('focusin', () => removeQuestionMark(divStepTotal))

  divStep1.addEventListener('focusout', checkStep1)
  divStep2.addEventListener('focusout', checkStep2)
  divHour4.addEventListener('focusout', () => {
    checkStartHour()
    checkStep3()
  })
  divHour2.addEventListener('focusout', () => {
    updateHour2()
    checkStep1()
    checkStep2()
  })
  divHour3.addEventListener('focusout', () => {
    updateHour3()
    checkStep2()
    checkStep3()
  })

  function removeQuestionMark(element: HTMLDivElement): void {
    element.innerText = element.innerText.replace('+/- ?', '')
    element.innerText = element.innerText.replace('+ ?', '')
    element.style.color = 'black'
  }

  function checkStartHour(): boolean {
    if (startHour.isEquivalentToString(divHour4.innerText)) {
      divHour4.style.color = 'green'
      divStepTotal.style.color = 'green'
      return true
    } else {
      divHour4.style.color = 'red'
      divStepTotal.style.color = 'black'
      return false
    }
  }
  function checkStep1(): boolean {
    if (endHour.substract(hour2).isEquivalentToString(divStep1.innerText) || HMS.fromString(divStep1.innerText).toSeconds() === 0) {
      if (HMS.fromString(divStep1.innerText).toSeconds() !== 0) divStep1.style.color = 'green'
      return true
    } else {
      divStep1.style.color = 'red'
      return false
    }
  }
  function checkStep2(): boolean {
    if (hour2.substract(hour3).isEquivalentToString(divStep2.innerText) || HMS.fromString(divStep2.innerText).toSeconds() === 0) {
      if (HMS.fromString(divStep2.innerText).toSeconds() !== 0) divStep2.style.color = 'green'
      return true
    } else {
      divStep2.style.color = 'red'
      return false
    }
  }
  function checkStep3(): boolean {
    if (startHour.substract(hour3).isEquivalentToString(divStep3.innerText) || HMS.fromString(divStep3.innerText).toSeconds() === 0) {
      if (HMS.fromString(divStep2.innerText).toSeconds() !== 0) divStep3.style.color = 'green'
      return true
    } else {
      divStep3.style.color = 'red'
      return false
    }
  }

  function updateHour2(): void {
    hour2 = HMS.fromString(divHour2.innerText)
  }
  function updateHour3(): void {
    hour3 = HMS.fromString(divHour3.innerText)
  }
}
