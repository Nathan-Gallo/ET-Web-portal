<script>
  import { links } from "svelte-routing";

  export let project = {};
  export let interactive = false;

  function isValidUrl(url) {
    return url && /http.+\.(jpg|png|gif)$/.test(url);
  }
</script>

{#if interactive}
  <a href={"/projects/" + project.FormattedID} use:links>
    <span class="title">{project.Name}</span>
  </a>
{:else}
  <a href={"/projects/" + project.FormattedID} use:links>
    <span class="title">{project.Name}</span>
  </a>
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
