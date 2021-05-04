<script>
  import ProjectCover from "../common/ProjectCover.svelte";

  export let projects = [];
</script>

<main>
  <h2>Active POC's</h2>
  <ul>
    {#each projects as project}
      {#if project.EmergingTechPOCPipeline === "Active POC"}
        <li>
          <ProjectCover interactive {project} />
        </li>
      {/if}
    {/each}
  </ul>

  <h2>Completed POC's</h2>
  <ul>
    {#each projects as project}
      {#if project.EmergingTechPOCPipeline === "Post POC"}
        <li>
          <ProjectCover interactive {project} />
        </li>
      {/if}
    {/each}
  </ul>

  <h2>Upcoming POC's</h2>
  <ul>
    {#each projects as project}
      {#if project.EmergingTechPOCPipeline === "Prepping for POC"}
        <li>
          <ProjectCover interactive {project} />
        </li>
      {/if}
    {/each}
  </ul>
</main>

<style>
  main {
    max-width: 1400px;
    margin: auto;
  }
  ul {
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-auto-rows: 12.8rem;
    gap: var(--spacingMedium);
    list-style: none;
    max-width: 100%;
    padding: 0;
  }
  li {
    position: relative;
    display: flex;
    background: rgb(235, 247, 245);
    background: linear-gradient(
      180deg,
      rgba(235, 247, 245, 1) 0%,
      rgba(250, 251, 253, 1) 100%
    );
    border-radius: 15px;
    text-align: center;
    padding: 1rem;
    box-shadow: 5px 5px 10px 0px #ccc;
  }
  li:hover {
    background: rgb(235, 247, 245);
    transition: 0.4s;
  }
</style>
