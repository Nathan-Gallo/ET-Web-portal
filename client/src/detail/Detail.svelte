<script>
  import { RingLoader } from "svelte-loading-spinners";

  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import { httpGet } from "../common/api.js";

  export let id;

  let tags = [];
  let description;
  let contact;
  let website;
  let fileNames;

  async function getProject() {
    const { data } = await httpGet("/projects/" + id);
    try {
      fileNames = await httpGet("/filenames/" + id);
    } catch (e) {}
    project = data;

    let tagArray = project.Tags;
    let length = tagArray.length;

    for (let i = 0; i < length; i++) {
      let cleanedName = tagArray[i].Name.replace("_", " ");
      tags.push(cleanedName);
    }

    if (project.Description) {
      description = project.Description.replace(/(<([^>]+)>)/gi, "");
      description = description.replace("&amp;", "&");
      description = description.replace("&nbsp;", " ");
    }

    if (project.Notes) {
      contact = project.Notes.replace(/(<([^>]+)>)/gi, "");
      contact = contact.replace("&amp;", "&");
      contact = contact.replace("&nbsp;", " ");
    }

    if (project.Comment) {
      website = project.Comment;
      website = website.replace(/(<([^>]+)>)/gi, "");
    }
    return await project;
  }
  async function getFile(file) {
    const res = await fetch(
      "http://localhost:8081/api/file/?id=" + id + "&name=" + file,
      {
        method: "GET",
        headers: {
          Accept: "application/pdf",
          "Content-Type": "application/pdf",
        },
      }
    )
      .then((r) => r.blob())
      .then(showFile);
  }

  function showFile(blob) {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([blob], { type: "application/pdf" });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement("a");
    link.href = data;
    link.target = "_blank";
    //link.download = "file.pdf";
    link.click();
    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
    }, 100);
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
      {#if project.EmergingTechPOCPipeline == "Vendors"}
        <Button to="/vendors">&lt; Back</Button>
      {:else if project.EmergingTechPOCPipeline == "Use Cases"}
        <Button to="/useCases">&lt; Back</Button>
      {:else}
        <Button to="/projects">&lt; Back</Button>
      {/if}
    </nav>

    <Header element="h1" size="large">{project.Name}</Header>

    <div class="detail">
      {#if project.Description != ""}
        <div class="inner">
          <Header>About</Header>
          <p class="tile">{description}</p>
        </div>
      {/if}
      <div>
        <Header>Use Case</Header>
        {#each tags as tag}
          {#if tag == undefined}
            <p>TBD</p>
          {:else}
            <ul><li class="tile">{tag}</li></ul>
          {/if}
        {/each}
      </div>
    </div>
    {#if project.EmergingTechPOCPipeline == "Vendors"}
      {#if project.Notes != ""}
        <div>
          <Header>Contact</Header>
          <p class="tile">{contact}</p>
        </div>
      {/if}
      {#if project.Comment != null}
        <div>
          <Header>Vendor Website</Header>
          <p class="tile interactive">
            <a href={website} target="_blank">{project.Name}</a>
          </p>
        </div>
      {/if}
    {/if}
    {#if fileNames != null}
      <div>
        <Header>Additional information</Header>
        {#each fileNames as name}
          <ul class="files interactive" on:click={getFile(name)}>
            <li>{name}</li>
          </ul>
        {/each}
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
    margin: 0px;
    box-shadow: 1px 1px 2px 0px #ccc;
  }
  .loader {
    position: fixed; /* or absolute */
    top: 50%;
    left: 50%;
  }
  ul {
    padding: 0px;
  }
  .files {
    list-style: none;
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
    margin: 5px;
    box-shadow: 5px 5px 10px 0px #ccc;
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
    background: rgb(235, 247, 245);
    transition: 0.4s;
  }
</style>
