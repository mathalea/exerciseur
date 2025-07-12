<script lang="ts">
  import LeaderLine from "leader-line-new"

  const ligne1 = $state(["3", "5", "+", "1", "2", "="])
  const ligne2 = $state(["", "+", ""])

  const ligne1Elements = $state<HTMLElement[]>([])
  const ligne2Elements = $state<HTMLElement[]>([])

  $effect(() => {
      new LeaderLine(ligne1Elements[0], ligne2Elements[0], { path: "straight" })
      new LeaderLine(ligne1Elements[1], ligne2Elements[2], { path: "straight" })
      new LeaderLine(ligne1Elements[3], ligne2Elements[0], { path: "straight" })
      new LeaderLine(ligne1Elements[4], ligne2Elements[2], { path: "straight" })
  })

  $effect(() => {
    ligne2[0] = `${Number(ligne1[0]) + Number(ligne1[3])}d`
    ligne2[2] = `${Number(ligne1[1]) + Number(ligne1[4])}u`
  })
</script>

<main class="min-h-screen text-6xl font-bold bg-slate-900 text-white">
  <div class="flex items-center justify-center">
    {#each ligne1 as character, i}
      {#if ["+", "="].includes(character)}
        <span class="m-8 ">{character}</span>
      {:else}
        <input
          class="m-2 w-auto border-2 border-white max-w-16 bg-slate-900"
          bind:this={ligne1Elements[i]}
          bind:value={ligne1[i]}
        />
        
      {/if}
    {/each}
  </div>

  <div class="flex items-center justify-center mt-24">
    {#each ligne2 as character, i}
      {#if ["+", "="].includes(character)}
        <span class="m-8">{character}</span>
      {:else}
        <span
          class="m-2 border-2 border-white max-w-16 bg-slate-900"
          bind:this={ligne2Elements[i]}
        >
          {character}
        </span>
      {/if}
    {/each}
  </div>
</main>
