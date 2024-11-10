<script lang="ts">
  interface Props {
    type: 'success' | 'tryAgain' | '';
  }

  let { type }: Props = $props();
</script>

{#if type === 'success'}
  <div class="bravo">Bravo !</div>
{:else if type === 'tryAgain'}
  <div class="tryAgain">Non. Essaie encore.</div>
{/if}

<style>
  div {
    font-weight: bolder;
  }
  .bravo {
    font-size: xx-large;
    color: green;
  }

  .tryAgain {
    color: red;
  }
</style>
