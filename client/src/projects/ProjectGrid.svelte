<script>
  import BookCover from "../common/BookCover.svelte";

  export let projects = [];
</script>

<h2>Active POC's</h2>
<ul>
  {#each projects as project}
    {#if project["Emerging Tech POC Pipeline"] == "Active POC"}
      <li>
        <BookCover interactive {project} /> 
        <!--{project.Name} -->
      </li>
    {/if}
  {/each}
</ul>

<h2>Post POC's</h2>
<ul>
  {#each projects as project}
    {#if project["Emerging Tech POC Pipeline"] == "Post POC"}
      <li>
        <!--<BookCover interactive {project} /> -->
        {project.Name}
      </li>
    {/if}
  {/each}
</ul>

<h2>Upcoming POC's</h2>
<ul>
  {#each projects as project}
    {#if project["Emerging Tech POC Pipeline"] == "Prepping for POC" || "Use Cases"}
      <li>
        <!--<BookCover interactive {project} /> -->
        {project.Name}
      </li>
    {/if}
  {/each}
</ul>

<h2>Our Vendors</h2>
<ul>
  {#each projects as project}
    {#if project["Emerging Tech POC Pipeline"] == "Vendors"}
      <li>
        <!--<BookCover interactive {project} /> -->
        {project.Name}
      </li>
    {/if}
  {/each}
</ul>



<style>
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    grid-auto-rows: 12.8rem;
    gap: var(--spacingMedium);
    list-style: none;
    max-width: 100%;
    padding: 0;
  }
  li {
    position: relative;
    display: flex;
  }
</style>
