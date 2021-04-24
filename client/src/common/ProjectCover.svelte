<script>
  import { links } from "svelte-routing";

  export let project = {};
  export let interactive = false;
</script>

{#if interactive}
  <a href={"/projects/" + project.FormattedID} use:links>
    <span class="title">{project.Name}</span>
  </a>
{:else}
  <span class="title">{project.Name}</span>
{/if}

<style>
  a {
    text-decoration: inherit;
    color: inherit;
  }
  .title {
    line-height: var(--typeLineHeightTight);
  }
</style>
