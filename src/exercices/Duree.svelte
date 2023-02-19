<script lang="ts">
  import Hms from './math/Hms'
  import { randint } from './math/random'
  import LeaderLine from 'leader-line-new'
  import { onDestroy, onMount, tick } from 'svelte'
  import Title from '../ui/Title.svelte'
  import Feedback from '../ui/Feedback.svelte'

  let divContainer: HTMLDivElement
  let divEnonce: HTMLDivElement
  let divStart: HTMLDivElement
  let divMiddle: HTMLDivElement
  let divMiddle2: HTMLDivElement
  let divEnd: HTMLDivElement
  let divStep1: HTMLDivElement
  let divStep2: HTMLDivElement
  let divStep3: HTMLDivElement
  let divStepTotal: HTMLDivElement
  let numberOfSteps = 1
  let lineStartMiddle: LeaderLine
  let lineMiddleMiddle2: LeaderLine
  let lineMiddleEnd: LeaderLine
  let lineMiddle2End: LeaderLine
  let lineTotal: LeaderLine
  let typeFeedback: '' | 'success' | 'tryAgain' = ''

  function initValues(): void {
    const startHour = new Hms({ hour: randint(2, 21), minute: randint(1, 59) })
    const endHour = new Hms({
      hour: startHour.hour + randint(1, 3),
      minute: randint(1, startHour.minute - 1),
    })
    divEnonce.innerText = `Un évènement commence à ${startHour.toString()} et se termine à ${endHour.toString()}. Combien de temps a-t-il duré ?`
    divStart.innerText = startHour.toString()
    divEnd.innerText = endHour.toString()
    divStep1.innerText = '+/- ?'
    divStep2.innerText = '+/- ?'
    divStep3.innerText = '+/- ?'
    divMiddle2.innerText = ''
    divStepTotal.innerText = '+ ?'
    divMiddle.innerText = ''
    typeFeedback = ''
  }

  function checkAllStep(): boolean {
    typeFeedback = ''
    if (numberOfSteps === 1) {
      checkStep(divStart, divStep1, divMiddle)
      checkStep(divMiddle, divStep2, divEnd)
      checkStep(divStart, divStepTotal, divEnd)
      return checkStep(divStart, divStep1, divMiddle) && checkStep(divMiddle, divStep2, divEnd) && checkStep(divStart, divStepTotal, divEnd)
    } else {
      checkStep(divStart, divStep1, divMiddle)
      checkStep(divMiddle, divStep2, divMiddle2)
      checkStep(divMiddle2, divStep3, divEnd)
      checkStep(divStart, divStepTotal, divEnd)
      return (
        checkStep(divStart, divStep1, divMiddle) &&
        checkStep(divMiddle, divStep2, divMiddle2) &&
        checkStep(divMiddle2, divStep3, divEnd) &&
        checkStep(divStart, divStepTotal, divEnd)
      )
    }
  }

  function removeQuestionMark(this: HTMLDivElement): void {
    this.innerText = this.innerText.replace('+/- ?', '')
    this.innerText = this.innerText.replace('+ ?', '')
    this.style.color = 'black'
  }

  function checkStep(divStart: HTMLElement, divStep: HTMLElement, divEnd: HTMLElement): boolean {
    const hourStart = Hms.fromString(divStart.innerText)
    const hourStep = Hms.fromString(divStep.innerText)
    const hourEnd = Hms.fromString(divEnd.innerText)
    if (
      hourStart.substract(hourEnd).isEqual(hourStep) &&
      ((hourStep.sign !== '-' && hourEnd.isGreaterThan(hourStart)) || (hourStep.sign === '-' && hourStart.isGreaterThan(hourEnd)))
    ) {
      divStep.style.color = 'green'
      return true
    } else {
      divStep.style.color = 'black'
      return false
    }
  }

  function checkExercice(): void {
    if (
      checkAllStep() ||
      (checkStep(divStart, divStepTotal, divEnd) &&
        Hms.fromString(divStep1.innerText).toSeconds() === 0 &&
        Hms.fromString(divStep2.innerText).toSeconds() === 0)
    ) {
      typeFeedback = 'success'
    } else {
      typeFeedback = 'tryAgain'
    }
  }

  async function switchSteps() {
    eraseLines()
    typeFeedback = ''
    if (numberOfSteps === 1) {
      divContainer.style.gridTemplateColumns = 'repeat(7, 1fr)'
      numberOfSteps = 2
      divStep3.innerText = '+/- ?'
      divStep3.hidden = false
      divMiddle2.hidden = false
      await tick()
      drawLines()
    } else {
      divContainer.style.gridTemplateColumns = 'repeat(5, 1fr)'
      numberOfSteps = 1
      divStep3.hidden = true
      divMiddle2.hidden = true
      await tick()
      drawLines()
    }
  }

  function eraseLines(): void {
    for (const line of [lineStartMiddle, lineMiddleMiddle2, lineMiddle2End, lineMiddleEnd, lineTotal]) {
      try {
        line.remove()
      } catch (error) {}
    }
  }

  function drawLines(): void {
    if (numberOfSteps === 1) {
      lineStartMiddle = new LeaderLine(divStart, divMiddle, { dropShadow: true })
      lineMiddleEnd = new LeaderLine(divMiddle, divEnd, { dropShadow: true })
      lineTotal = new LeaderLine(divStart, divEnd, {
        path: 'arc',
        dropShadow: true,
        startSocket: 'bottom',
        endSocket: 'bottom',
        startSocketGravity: 400,
      })
    } else {
      lineStartMiddle = new LeaderLine(divStart, divMiddle, { dropShadow: true })
      lineMiddleMiddle2 = new LeaderLine(divMiddle, divMiddle2, { dropShadow: true })
      lineMiddle2End = new LeaderLine(divMiddle2, divEnd, { dropShadow: true })
      lineTotal = new LeaderLine(divStart, divEnd, {
        path: 'arc',
        dropShadow: true,
        startSocket: 'bottom',
        endSocket: 'bottom',
        startSocketGravity: 400,
      })
    }
  }

  onMount(async () => {
    initValues()
    divStep3.hidden = true
    divMiddle2.hidden = true
    drawLines()
  })

  onDestroy(() => {
    eraseLines()
  })
</script>

<svelte:head>
  <title>Déterminer une durée</title>
  <meta name="description" content="Exercice - Déterminer la durée d'un évènement" />
</svelte:head>

<Title>Déterminer une durée</Title>
<div style="max-width: 800px; margin: 50px auto auto;">
  <div bind:this={divEnonce} style="margin-bottom: 50px;" />
  <div id="container" bind:this={divContainer}>
    <div bind:this={divStart} class="donnee" style="grid-column: 1; grid-row: 2;" />
    <div bind:this={divMiddle} on:keyup={checkAllStep} class="reponse" contenteditable="true" style="grid-column: 3; grid-row: 2;" />
    <div bind:this={divMiddle2} on:keyup={checkAllStep} class="reponse" contenteditable="true" style="grid-column: 5; grid-row: 2;" />
    <div bind:this={divEnd} class="donnee" style="grid-row: 2; grid-column: {numberOfSteps === 1 ? 5 : 7};" />
    <div
      bind:this={divStep1}
      on:click={removeQuestionMark}
      on:keyup={checkAllStep}
      class="reponse"
      contenteditable="true"
      style="grid-column: 2; grid-row: 1;"
    />
    <div
      bind:this={divStep2}
      on:click={removeQuestionMark}
      on:keyup={checkAllStep}
      class="reponse"
      contenteditable="true"
      style="grid-column: 4; grid-row: 1;"
    />
    <div
      bind:this={divStep3}
      on:click={removeQuestionMark}
      on:keyup={checkAllStep}
      class="reponse"
      contenteditable="true"
      style="grid-column: 6; grid-row: 1;"
    />
    <div
      bind:this={divStepTotal}
      on:click={removeQuestionMark}
      on:keyup={checkAllStep}
      class="reponse"
      contenteditable="true"
      style="grid-row: 3; grid-column: {numberOfSteps === 1 ? 3 : 4}"
    />
  </div>

  <div id="footerExercice">
    <button on:click={switchSteps}>{numberOfSteps === 1 ? 'Ajouter une étape' : 'Supprimer une étape'} </button>
    <button on:click={initValues}>Nouvelle Question</button>
    <button on:click={checkExercice}>Vérifier</button>
    <Feedback type={typeFeedback} />
  </div>
</div>

<style>
  #container {
    margin-bottom: 30px;
    text-align: center;
    display: grid;
    grid-template-rows: 30px auto 150px;
    align-items: center;
    column-gap: 30px;
    grid-template-columns: repeat(5, 1fr);
  }
  .reponse {
    font-weight: bolder;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
    background-color: white;
    padding: 10px;
  }
  .donnee {
    font-weight: bolder;
    padding: 10px;
  }

  #footerExercice {
    display: flex;
	align-items: baseline;
    gap: 10px;
  }
</style>
