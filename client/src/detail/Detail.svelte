<script>
  import { onMount } from "svelte";

  import BackButtonRow from "../common/BackButtonRow.svelte";
  import ProjectCover from "../common/ProjectCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import { httpGet, httpPut } from "../common/api.js";

  export let id;

  let project = {};
  let tag;
  let projects = [];
  let vendors = [];
/*
  onMount(async _ => {
    let { data } = await httpGet("/" + id);
    project = data;
    tag = project.Tags.replace("_", " ");
  });
*/
  onMount(async _ => {
    const { data } = await httpGet("/?_sort=id&_order=desc");
    projects = data.projects;
    let length = projects.length
    for(let i=0; i <length; i++){
      if(id == projects[i]["User Story"]){
        project = projects[i]
      }
    }
    tag = project.Tags.replace("_", " ");

    for(let i = 0; i < length; i++) {
      if(project.Tags == projects[i].Tags && projects[i]["Emerging Tech POC Pipeline"] == "Vendors") {
        vendors.push(projects[i])
      }
    }
  });

  console.log(vendors)
</script>

<style>
  main {
    max-width: 1400px;
    margin: auto;
  }
  .detail {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40vw, 20rem));
    grid-template-rows: minmax(64vw, 32rem) auto;
    gap: var(--spacingXLarge);
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
<main>
<BackButtonRow />

<Header element="h1" size="large">{project.Name}</Header>

<div class="detail">
  <div>
    <Header>About</Header>
    <p>{project.Description}</p>
  </div>  
  <div>
    <Header>Use Case</Header>
    <p>{tag}</p>
  </div>

</div>
</main>
