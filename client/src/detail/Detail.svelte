<script>
  import { RingLoader } from "svelte-loading-spinners";

  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import { httpGet } from "../common/api.js";

  export let id;

  let tags = [];
  let tag;
  let description;
  let contact;
  let website;

  async function getProject() {
    const { data } = await httpGet("/projects/" + id);
    project = data[0];
    
    let tagArray = project.Tags._tagsNameArray;
    let length = tagArray.length;

    for (let i = 0; i < length; i++) {
      let cleanedName = tagArray[i].Name.replace("_", " ");
      tags.push(cleanedName);
    }
    description = project.Description.replace(/(<([^>]+)>)/gi, "");
    description = description.replace("&amp;", "&");
    description = description.replace("&nbsp;"," ");

    contact = project.Notes.replace(/(<([^>]+)>)/gi, "");
    contact = contact.replace("&amp;", "&");
    contact = contact.replace("&nbsp;"," ");

    tag = tagArray[0].Name.replace("_", " ");
    console.log(project)
    website = project.c_Comment
    website = website.replace(/(<([^>]+)>)/gi, "")
    return await project;
  }
  let project = getProject();
</script>

{#await project}
  <div class="loader">
    <RingLoader size="100" color="#1ad79f" unit="px" duration="1s" />
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
        <p class="tile">{description}</p>
      </div>
      <div>
        <Header>Use Case</Header>
        {#if tag == undefined}
          <p>TBD</p>
        {:else}
          <p class="tile">{tag}</p>
        {/if}
      </div>
    </div>
    {#if project.c_EmergingTechPOCPipeline == "Vendors"}
      <div><Header>Contact</Header>
      <p class="tile">{contact}</p></div>
      <div><Header>Vendor Website</Header>
        <p class="tile interactive"><a href={website} target="_blank">{project.Name}</a></p>
      </div>
    {/if}
  </main>
{/await}

<style>
  a {
    text-decoration: inherit;
    color: inherit;
  }
  .tile {
    position: relative;
    display: inline-block;
    background: rgb(235, 247, 245);
    background: linear-gradient(
      180deg,
      rgba(235, 247, 245, 1) 0%,
      rgba(250, 251, 253, 1) 100%
    );
    border-radius: 15px;
    text-align: center;
    padding: 1rem;
    box-shadow: 1px 1px 2px 0px #ccc;
  }
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

  .interactive:hover {
    -webkit-transform: scale(0.97);
    -ms-transform: scale(0.97);
    transform: scale(0.97);
    transition: 0.4s;
  }
</style>
