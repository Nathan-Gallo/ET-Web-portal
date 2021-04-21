<script>
  import { onMount } from "svelte";

  import BackButtonRow from "../common/BackButtonRow.svelte";
  import ProjectCover from "../common/ProjectCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import { httpGet, httpPut } from "../common/api.js";

  export let id;

  let project = {};
  let projects = [];
  let tags = [];
  let tag;
  let description;

  onMount(async (_) => {
    const { data } = await httpGet("/projects/" + id);
    project = data[0];
    console.log(project)
    
    let tagArray = project.Tags._tagsNameArray
    let length = tagArray.length

    for(let i = 0; i < length; i++){
      let cleanedName = tagArray[i].Name.replace("_", " ")
      tags.push(cleanedName)
    }
    description = project.Description.replace(/(<([^>]+)>)/gi, "");
    description = description.replace("&amp;", "&");
    tag = tagArray[0].Name.replace("_", " ");
    console.log(tags);
  });
  
</script>

<main>
  <BackButtonRow />

  <Header element="h1" size="large">{project.Name}</Header>

  <div class="detail">
    <div class="inner">
      <Header>About</Header>
      <p>{description}</p>
    </div>
    <div>
      <Header>Use Case</Header>
        <p>{tag}</p>
    </div>
  </div>
</main>

<style>
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
