<script>
  import BookCover from "../common/BookCover.svelte";

  export let projects = [];
</script>

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

<ul>
  {#each projects as project}
    <li>
      <BookCover interactive {project} />
    </li>
  {/each}
</ul>
