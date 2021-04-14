<script>
  import ProjectCover from "../common/ProjectCover.svelte";

  export let projects = [];
</script>

<main>
<h2>Active POC's</h2>
<ul>
  {#each projects as project}
    {#if project["Emerging Tech POC Pipeline"] == "Active POC"}
      <li>
        <ProjectCover interactive {project} /> 
        <!--{project.Name} -->
      </li>
    {/if}
  {/each}
</ul>

<h2>Completed POC's</h2>
<ul>
  {#each projects as project}
    {#if project["Emerging Tech POC Pipeline"] == "Post POC"}
      <li>
        <ProjectCover interactive {project} />
      </li>
    {/if}
  {/each}
</ul>

<h2>Upcoming POC's</h2>
<ul>
  {#each projects as project}
    {#if project["Emerging Tech POC Pipeline"] == "Prepping for POC" || "Use Cases"}
      <li>
        <ProjectCover interactive {project} />
      </li>
    {/if}
  {/each}
</ul>

<h2>Our Vendors</h2>
<ul>
  {#each projects as project}
    {#if project["Emerging Tech POC Pipeline"] == "Vendors"}
      <li class="static">
        <!--<BookCover interactive {project} /> -->
        {project.Name}
      </li>
    {/if}
  {/each}
</ul>
</main>



<style>
  main {
    max-width: 1500px;
    margin: auto;
  }
  header {
    margin: var(--spacingMedium) 0 var(--spacingLarge) 0;
    text-transform: uppercase;
  }
  .preamble {
    display: block;
  }
  h1 {
    font-size: var(--typeSizeXLarge);
    font-weight: var(--typeWeightBold);
    line-height: var(--typeLineHeightTight);
  }

  .greeting {
    font-size: var(--typeSizeSmall);
  }

  .centered {
    width: 1500px;
    margin: 0 auto;
  }
  ul {
    display: grid;
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
  -webkit-transform: scale(.97);
  -ms-transform: scale(.97);
  transform: scale(.97);
  transition: .4s;
  }

  .static:hover {
    -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
    }
</style>
