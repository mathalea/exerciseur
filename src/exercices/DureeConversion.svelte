<script lang="ts">
  import Feedback from '../ui/Feedback.svelte'
  import Operation from './math/operations'
  import { randint } from './math/random'
  import Title from '../ui/Title.svelte'
  
  /** Division par 60 étape 1*/
  let spanMinutes1: HTMLSpanElement
  let spanSeconds1: HTMLSpanElement
  let isMinutes1 = false
  let isSeconds1 = false
  let typeFeedbackDivisionPar60Etape1: '' | 'tryAgain'
  /** Division par 60 étape 2*/
  let spanHours2: HTMLSpanElement
  let spanMinutes2: HTMLSpanElement
  let spanSeconds2: HTMLSpanElement
  let isSeconds2 = false
  let isMinutes2 = false
  let isHours2 = false
  /** Division par 3600 étape 1*/
  let spanHours36001: HTMLSpanElement
  let spanMinutes36001: HTMLSpanElement
  let spanSeconds36001: HTMLSpanElement
  let timeInSeconds = randint(3800, 9000)
  let isHours36001 = false
  let isMinutes36001 = false
  let isSeconds36001 = false
  let typeFeedbackDivisionPar3600Etape1: '' | 'tryAgain'
  let typeFeedbackFinal: '' | 'success' | 'tryAgain' = ''

  let operation1Selected: string
  let operation2Selected: string

  function initChecksPartie1 (): void {
    isMinutes1 = false
    isSeconds1 = false
    isHours36001 = false
    isMinutes36001 = false
    isSeconds36001 = false
    isHours2 = false
    isMinutes2 = false
    isSeconds2 = false
    typeFeedbackDivisionPar60Etape1 = ''
    typeFeedbackDivisionPar3600Etape1 = ''
    typeFeedbackFinal =''
  }


  /** On vérifie que le nombre saisi est bien le nombre attendu */
  function check(span: HTMLSpanElement, n: number): boolean {
    if (span !== undefined && span.textContent === n.toString()) {
      span.style.color = 'green'
      return true
    } else {
      if (span !== undefined) span.style.color = 'black'
      return false
    }
  }

  function checkMinutes1(): void {
    isMinutes1 = check(spanMinutes1, Math.floor(timeInSeconds / 60))
    checkStep1()
  }

  function checkSeconds1(): void {
    isSeconds1 = check(spanSeconds1, timeInSeconds % 60)
    checkStep1()
  }
  
  function checkSeconds36001(): void {
    isSeconds36001 = check(spanSeconds36001, timeInSeconds % 3600)
    checkStep36001()
  }
  
  function checkMinutes36001(): void {
    isMinutes36001 = check(spanMinutes36001, 0)
    checkStep36001()
  }
  
  function checkHours36001(): void {
    isHours36001 = check(spanHours36001, Math.floor(timeInSeconds / 3600))
    checkStep36001()
  }

  function checkStep36001(): void {
    if (spanHours36001.innerText.length === 0 || spanSeconds36001.innerText.length === 0) typeFeedbackDivisionPar3600Etape1 = ''
    else if (!isHours36001 || (!isMinutes36001 && spanMinutes36001.innerText.length > 0) || !isSeconds36001) typeFeedbackDivisionPar3600Etape1 = 'tryAgain'
    else typeFeedbackDivisionPar3600Etape1 = ''
  }

  function checkHours2(): void {
    isHours2 = check(spanHours2, Math.floor(timeInSeconds / 3600))
    checkExercice()
  }

  function checkMinutes2(): void {
    isMinutes2 = check(spanMinutes2, Math.floor((timeInSeconds % 3600) / 60))
    checkExercice()
  }

  function checkSeconds2(): void {
    isSeconds2 = check(spanSeconds2, timeInSeconds % 60)
    checkExercice()
  }

  function checkStep1(): void {
    if (spanMinutes1.innerText.length === 0 || spanSeconds1.innerText.length === 0) typeFeedbackDivisionPar60Etape1 = ''
    else if (!isMinutes1 || !isSeconds1) typeFeedbackDivisionPar60Etape1 = 'tryAgain'
    else typeFeedbackDivisionPar60Etape1 = ''
  }
  function checkExercice(): void {
    if (spanHours2.innerText.length === 0 || spanMinutes2.innerText.length === 0 || spanSeconds2.innerText.length === 0) typeFeedbackFinal = ''
    else if (!isHours2 || !isMinutes2 || !isSeconds2) typeFeedbackFinal = 'tryAgain'
    else typeFeedbackFinal = 'success'
  }
</script>

<svelte:head>
	<title>Convertir au format HMS</title>
	<meta name="description" content="Exercice - Écrire au format HMS une heure donnée en secondes" />
</svelte:head>

<section>
  <Title>Conversion de durées</Title>
  <p>Écrire {timeInSeconds} s au format HMS.</p>

  <p>Quel calcul souhaites-tu faire ?</p>

  <select name="listeOperations" bind:value={operation1Selected} on:change={initChecksPartie1}>
    <option value="" />
    <option value="Multiplication">Multiplier {timeInSeconds} par 60</option>
    <option value="Multiplication">Multiplier {timeInSeconds} par 3 600</option>
    <option value="Division">Diviser {timeInSeconds} par 60</option>
    <option value="Division3600">Diviser {timeInSeconds} par 3 600</option>
  </select>

  {#if operation1Selected === 'Multiplication'}
    <div>
      Ce n'est pas la bonne opération. Les secondes sont plus petites que les minutes et les heures. Il faut 60 secondes pour faire une
      minute et 3 600 s pour faire une heure.<br />
      Choisis une autre opération.
    </div>
  {/if}
  {#if operation1Selected === 'Division'}
    <div>
      <div>
        Il y a 60 secondes dans une minute donc on cherche combien de fois il y a 60 s dans {timeInSeconds} s pour trouver le nombre de minutes.
      </div>

      <div class="operationPosee" />
      {@html Operation({ operande1: timeInSeconds, operande2: 60, type: 'division' })}
      <div>
        Donc {timeInSeconds} s = <span contenteditable="true" class="reponse" bind:this={spanMinutes1} on:keyup={checkMinutes1} /> min
        <span contenteditable="true" bind:this={spanSeconds1} class="reponse" on:keyup={checkSeconds1} /> s.
      </div>
      <Feedback type={typeFeedbackDivisionPar60Etape1} />
    </div>
    {#if isMinutes1 && isSeconds1}
    <div id="calcul2">
      <div style="margin-top: 30px">
        Le nombre de minutes dépasse 60, donc on va chercher le nombre d'heures.
        <br />Il y a 60 minutes dans une heure donc on cherche combien de fois il y a 60 min dans {Math.floor(timeInSeconds / 60)} min.
      </div>
      <div class="operationPosee" />
      {@html Operation({ operande1: Math.floor(timeInSeconds / 60), operande2: 60, type: 'division' })}
      <div>
        <div>
          Finalement {timeInSeconds} s = <span contenteditable="true" class="reponse" on:keyup={checkHours2} bind:this={spanHours2} /> h
          <span contenteditable="true" class="reponse" on:keyup={checkMinutes2} bind:this={spanMinutes2} />
          min <span contenteditable="true" class="reponse" on:keyup={checkSeconds2} bind:this={spanSeconds2} /> s.
        </div>
        <Feedback type={typeFeedbackFinal} />
      </div>
    </div>
    {/if}
  {/if}
  {#if operation1Selected === 'Division3600'}
    <div>
      <div>
        Il y a 3 600 secondes dans une heure donc on cherche combien de fois il y a 3 600 s dans {timeInSeconds} s pour connaître le nombre d'heures.
      </div>

      <div class="operationPosee" />
      {@html Operation({ operande1: timeInSeconds, operande2: 3600, type: 'division' })}
      <div>
        Donc {timeInSeconds} s = <span contenteditable="true" class="reponse" bind:this={spanHours36001} on:keyup={checkHours36001} /> h
        <span contenteditable="true" bind:this={spanMinutes36001} class="reponse" on:keyup={checkMinutes36001} /> min <span contenteditable="true" bind:this={spanSeconds36001} class="reponse" on:keyup={checkSeconds36001} /> s.
      </div>
      <Feedback type={typeFeedbackDivisionPar3600Etape1} />
    </div>
    {#if isHours36001 && isSeconds36001 && (isMinutes36001 || spanMinutes36001?.innerText.length === 0)}
    <div id="calcul2">
      <div style="margin-top: 30px">
        Le nombre de secondes dépasse 60, donc on va chercher le nombre de minutes.
        <br />Il y a 60 secondes dans une minute donc on cherche combien de fois il y a 60 s dans {timeInSeconds % 3600} s.
      </div>
      <div class="operationPosee" />
      {@html Operation({ operande1: Math.floor(timeInSeconds % 3600), operande2: 60, type: 'division' })}
      <div>
        <div>
          Finalement {timeInSeconds} s = <span contenteditable="true" class="reponse" on:keyup={checkHours2} bind:this={spanHours2} /> h
          <span contenteditable="true" class="reponse" on:keyup={checkMinutes2} bind:this={spanMinutes2} />
          min <span contenteditable="true" class="reponse" on:keyup={checkSeconds2} bind:this={spanSeconds2} /> s.
        </div>
        <Feedback type={typeFeedbackFinal} />
      </div>
    </div>
    {/if}
  {/if}

</section>

<style>
  section {
    width: 800px;
    margin: 10px auto;
  }

  select {
    margin-bottom: 50px;
  }

  .reponse {
    display: inline-block;
    text-align: center;
    width: 50px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
  }

  .operationPosee {
    margin: 20px 100px;
  }
</style>
