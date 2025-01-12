<script lang="ts">
  const operandes = ["3", "5", "+", "1", "2"]
</script>

<main
  class="min-h-screen flex items-center justify-center text-6xl font-bold bg-slate-900 text-white"
>
  {#each operandes as operande}
    <span>{operande}</span>
  {/each}
</main>
