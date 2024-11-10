<script lang="ts">
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
    const children_render = $derived(children);

</script>

<h1>{@render children_render?.()}</h1>

<style>
    h1 {
        color: rgb(248, 127, 92);
        font-weight: bolder;
        font-size: 200%;
        padding-bottom: 5px;
        border-bottom: 4px solid rgb(33, 109, 154);
    }
</style>