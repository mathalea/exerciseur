<script lang="ts">
  import { onMount } from 'svelte'
  let ComponentExercice = $state()



  let refresh = $state(true)

  async function router(): Promise<void> {
    const url = new URL(document.URL)
    const params = url.search
    let nameExercice = params.replace('?', '')
    nameExercice = nameExercice.charAt(0).toUpperCase() + nameExercice.slice(1)
    try {
      ComponentExercice = (await import(`./exercices/${nameExercice}.svelte`)).default
    } catch (error) {
      ComponentExercice = (await import(`./exercices/Erreur.svelte`)).default
    }
    refresh = !refresh
  }

  window.addEventListener('load', router)
  window.addEventListener('hashchange', router)
</script>

<main>
  {#key refresh}
    <ComponentExercice />
  {/key}
</main>

<footer>
  <img src="images/logo2.png" width="125px" alt="Coopmaths CC-BY-SA" />
</footer>

<style>
  main {
    min-height: 70vh;
  }
  footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 15px;
  }
</style>
