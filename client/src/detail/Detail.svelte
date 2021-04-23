<script>
  import { onMount } from "svelte";
  import { RingLoader } from 'svelte-loading-spinners';

  import BackButtonRow from "../common/BackButtonRow.svelte";
  import ProjectCover from "../common/ProjectCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import { httpGet, httpPut } from "../common/api.js";

  export let id;

  let projects = [];
  let tags = [];
  let tag;
  let description;

  async function getProject() {
    const { data } = await httpGet("/projects/" + id);
    project = data[0];
    
    let tagArray = project.Tags._tagsNameArray
    let length = tagArray.length

    for(let i = 0; i < length; i++){
      let cleanedName = tagArray[i].Name.replace("_", " ")
      tags.push(cleanedName)
    }
    description = project.Description.replace(/(<([^>]+)>)/gi, "");
    description = description.replace("&amp;", "&");
    tag = tagArray[0].Name.replace("_", " ");
    console.log(project.c_EmergingTechPOCPipeline);

    return await project
  }
  let project = getProject();

</script>
{#await project}
<div class="loader">
  <RingLoader size="100" color="#1ad79f" unit="px" duration="1s"></RingLoader>
</div>
{:then project}
  
<main>
  <nav>
    {#if project.c_EmergingTechPOCPipeline == "Vendors"}
      <Button to="/vendors">&lt; Back</Button>
    {:else if project.c_EmergingTechPOCPipeline == "Use Cases"}
      <Button to="/useCases">&lt; Back</Button>
    {:else}
      <Button to="/projects">&lt; Back</Button>
    {/if}
  </nav>

  <Header element="h1" size="large">{project.Name}</Header>

  <div class="detail">
    <div class="inner">
      <Header>About</Header>
      <p>{description}</p>
    </div>
    <div>
      <Header>Use Case</Header>
        {#if tag == undefined}
          <p>TBD</p>
        {:else}      
          <p>{tag}</p>
        {/if}
    </div>
  </div>
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
  .detail {
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(40vw, 20rem));
    grid-template-rows: minmax(64vw, 32rem) auto;
    gap: 10rem;
  }
  nav {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    margin-bottom: var(--spacingXLarge);
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
</style>
