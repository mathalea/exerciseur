import LeaderLine from 'leader-line-new'
import { randint } from './utils/random'
import HMS from './utils/HMS'

export default function exerciceDuree(app: HTMLElement) {
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
  const divStart = document.createElement('div')
  const divMiddle = document.createElement('div')
  const divEnd = document.createElement('div')
  const divStep1 = document.createElement('div')
  const divStep2 = document.createElement('div')
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
  divQuestion.appendChild(divStart)
  divQuestion.appendChild(divMiddle)
  divQuestion.appendChild(divEnd)
  divQuestion.appendChild(divStep1)
  divQuestion.appendChild(divStep2)
  divQuestion.appendChild(divStepTotal)
  divStepTotal.style.fontWeight = 'bolder'
  divStep1.style.fontWeight = 'bolder'
  divStep2.style.fontWeight = 'bolder'
  divStep1.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  divStep2.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  divStepTotal.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  divMiddle.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
  divQuestion.style.display = 'grid'
  divQuestion.style.gridTemplateColumns = 'repeat(5, 1fr)'
  divQuestion.style.gridTemplateRows = '30px auto 150px'
  divQuestion.style.alignItems = 'center'
  divMiddle.contentEditable = 'true'
  divMiddle.style.backgroundColor = 'white'
  divStep1.style.backgroundColor = 'white'
  divStep2.style.backgroundColor = 'white'
  divStepTotal.style.backgroundColor = 'white'
  divStart.style.gridColumn = '1'
  divMiddle.style.gridColumn = '3'
  divEnd.style.gridColumn = '5'
  divStep1.style.gridColumn = '2'
  divStep2.style.gridColumn = '4'
  divStep1.style.gridRow = '1'
  divStep2.style.gridRow = '1'
  divStart.style.gridRow = '2'
  divMiddle.style.gridRow = '2'
  divEnd.style.gridRow = '2'
  divStep1.contentEditable = 'true'
  divStep2.contentEditable = 'true'
  divStepTotal.contentEditable = 'true'
  divStart.style.padding = '10px'
  divMiddle.style.padding = '10px'
  divEnd.style.padding = '10px'
  divStep1.style.padding = '10px'
  divStep2.style.padding = '10px'
  divStepTotal.style.gridRow = '3'
  divStepTotal.style.gridColumn = '3'
  divQuestion.style.columnGap = '30px'

  let startHour: HMS
  let middleHour: HMS
  let endHour: HMS
  let stepTotalHour: HMS

  function init (): void {
      startHour = new HMS({ hour: randint(1, 23), minute: randint(1, 59) })
      middleHour = new HMS()
      endHour = new HMS({ hour: startHour.hour + randint(1, 3), minute: randint(1, startHour.minute - 1) })
      stepTotalHour = endHour.substract(startHour)
      divEnonce.innerText = `Un évènement commence à ${startHour.toString2()} et se termine à ${endHour.toString2()}. Combien de temps a-t-il duré ?`
      divStart.innerText = startHour.toString()
      divEnd.innerText = endHour.toString()
      divStep1.innerText = '+/- ?'
      divStep2.innerText = '+/- ?'
      divStepTotal.innerText = '+ ?'
      divMiddle.innerText = ''
      divStep1.style.color = 'black'
      divStep2.style.color = 'black'
      divStepTotal.style.color = 'black'
  }

  init()

  

  new LeaderLine(divStart, divMiddle, { dropShadow: true })
  new LeaderLine(divMiddle, divEnd, { dropShadow: true })
  new LeaderLine(divStart, divEnd, { path: 'arc', dropShadow: true, startSocket: 'bottom', endSocket: 'bottom', startSocketGravity: 400 })

  button.addEventListener('click', () => {
    if (checkStep1() && checkStep2() && checkStepTotal()) {
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
  divStepTotal.addEventListener('focusin', () => removeQuestionMark(divStepTotal))

  divStep1.addEventListener('focusout', checkStep1)
  divStep2.addEventListener('focusout', checkStep2)
  divStepTotal.addEventListener('focusout', checkStepTotal)
  divMiddle.addEventListener('focusout', () => {
    updateMiddleHour()
    checkStep1()
    checkStep2()
  })

  function removeQuestionMark(element: HTMLDivElement): void {
    element.innerText = element.innerText.replace('+/- ?', '')
    element.innerText = element.innerText.replace('+ ?', '')
    element.style.color = 'black'
  }

  function checkStepTotal(): boolean {
    if (stepTotalHour.isEquivalentToString(divStepTotal.innerText)) {
      divStepTotal.style.color = 'green'
      return true
    } else {
      divStepTotal.style.color = 'red'
      return false
    }
  }
  function checkStep1(): boolean {
    if (middleHour.substract(startHour).isEquivalentToString(divStep1.innerText) || HMS.fromString(divStep1.innerText).toSeconds() === 0) {
      if (HMS.fromString(divStep1.innerText).toSeconds() !== 0) divStep1.style.color = 'green'
      return true
    } else {
      divStep1.style.color = 'red'
      return false
    }
  }
  function checkStep2(): boolean {
    if (endHour.substract(middleHour).isEquivalentToString(divStep2.innerText) || HMS.fromString(divStep2.innerText).toSeconds() === 0) {
      if (HMS.fromString(divStep2.innerText).toSeconds() !== 0) divStep2.style.color = 'green'
      return true
    } else {
      divStep2.style.color = 'red'
      return false
    }
  }

  function updateMiddleHour(): void {
    middleHour = HMS.fromString(divMiddle.innerText)
  }
}
