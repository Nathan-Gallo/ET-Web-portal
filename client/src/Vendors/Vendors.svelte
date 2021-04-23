<script>
    import { onMount } from "svelte";
    import { RingLoader } from 'svelte-loading-spinners';

    import ProjectCover from "../common/ProjectCover.svelte"
    import { httpGet } from "../common/api.js";

    async function getVendors() {
        const { data } = await httpGet("/vendors");
        return await data
    }
    let projects = getVendors();
</script>

{#await projects}
<div class="loader">
  <RingLoader size="100" color="#1ad79f" unit="px" duration="1s"></RingLoader>
</div>
{:then projects}
<main>
    <h2>Vendors</h2>
    <ul>
      {#each projects as project}
        <li>
          <ProjectCover interactive {project} />
        </li> 
      {/each}
    </ul>
</main>
{/await}
<style>
   .loader {
    position: fixed; /* or absolute */
  top: 50%;
  left: 50%;
  }
main {
    max-width: 1400px;
    margin: auto;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    
    gap: var(--spacingMedium);
    list-style: none;
    max-width: 100%;
    padding: 0;
  }
  li {
    position: relative;
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
    -webkit-transform: scale(0.97);
    -ms-transform: scale(0.97);
    transform: scale(0.97);
    transition: 0.4s;
  }

  .static:hover {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
</style>