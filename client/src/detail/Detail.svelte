<script>
  import { onMount } from "svelte";

  import BackButtonRow from "../common/BackButtonRow.svelte";
  import BookCover from "../common/BookCover.svelte";
  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import { httpGet, httpPut } from "../common/api.js";

  export let id;

  let project = {};

  onMount(async _ => {
    const { data } = await httpGet("/" + id);
    project = data;
    console.log(project)
  });

</script>

<style>
  .detail {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40vw, 20rem));
    grid-template-rows: minmax(64vw, 32rem) auto;
    gap: var(--spacingXLarge);
  }
  .cover {
    position: relative;
    display: flex;
    margin-bottom: var(--spacingXLarge);
  }
  .favorite {
    position: absolute;
    width: 90%;
    left: calc(10% + var(--spacingSmall));
    bottom: var(--spacingLarge);
  }
</style>

<BackButtonRow />

<Header element="h1" size="large">{project.Name}</Header>

<div class="detail">
  <div class="cover">
    <BookCover {project} />
  </div>
  <div>
    <Header>About</Header>
    <p>{project.Name}</p>
  </div>
</div>
