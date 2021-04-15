<script>
  import Button from "../common/Button.svelte";
  import ProjectCover from "../common/ProjectCover.svelte";
  import { onMount } from "svelte";
  import { httpGet } from "../common/api.js";

  let projects = [];
  onMount(async function () {
    const { data } = await httpGet("/?_sort=id&_order=desc");
    projects = data.projects;
  });
</script>

<main>
  <header>
    <span class="preamble">Welcome to the</span>
    <h1>Emerging Technology Portal</h1>
  </header>
  <div class="container">
    <p class="greeting">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae
      euismod velit. Curabitur posuere velit velit, eget fermentum purus
      scelerisque sit amet. Nunc venenatis leo ligula, eu fermentum turpis
      dignissim at. Quisque malesuada dictum nisi, sed venenatis enim hendrerit
      laoreet. Integer metus tortor, pretium auctor auctor in, feugiat nec
      dolor. Pellentesque pretium libero at magna luctus vulputate. Cras
      vehicula in tortor eget cursus. Aliquam a suscipit quam, a molestie nulla.
      Phasellus purus turpis, placerat sed blandit sit amet, fermentum et eros.
      Ut gravida, erat eget lacinia feugiat, arcu mi maximus dui, nec finibus
      est orci a neque. Cras volutpat velit a quam mollis malesuada
    </p>
    <img src="./graphic.png" alt="technology graphic" />
  </div>
  <Button to="/create">Submit a Use Case</Button>

  <br /><br />
  <hr />
  <br /><br />
  <span class="preamble">Current Projects</span>
  <div class="centered">
    <ul>
      {#each projects as project}
        {#if project["Emerging Tech POC Pipeline"] == "Active POC"}
          <li class="interactive">
            <ProjectCover interactive {project} />
            <!--{project.Name} -->
          </li>
        {/if}
      {/each}
    </ul>
  </div>
  <br />
  <hr />
  <br />

  <div class="centered">
    <ul>
      <li class="interactive">Center of Excellence</li>
      <li class="interactive">POCs</li>
      <li class="interactive">Use Cases</li>
      <li class="interactive">Vendors</li>
      <li class="interactive">White Papers</li>
    </ul>
  </div>

  <br />
  <hr />
  <br />
  <span class="preamble">Goals</span>
  <img class="center" src="./pillars.png" alt="technology graphic" />
<!--
  <div class="goals">
    <ul class="stacked">
      <li class="interactive static">
        Excellence <div class="vl" />
        <ul class="inner">
          <li>
            Be the Pathfinders for new technology at The Hartford, guiding
            everyone forward and upward
          </li>
        </ul>
      </li>
      <li class="interactive static">
        Explore <div class="vl" />
        <ul class="inner"><li /></ul>
      </li>
      <li class="interactive static">
        Engage <div class="vl" />
        <ul class="inner"><li /></ul>
      </li>
      <li class="interactive static">
        Deliver <div class="vl" />
        <ul class="inner"><li /></ul>
      </li>
    </ul>
  </div>
  -->
</main>

<style>
  main {
    max-width: 1400px;
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
    float: left;
  }

  .goals {
    display: flex;
    overflow: hidden;
  }
  .container {
    display: flex;
  }
  .centered {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 65%;
  }

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
  }

  img {
    width: 40%;
    height: auto;
    border-radius: 15px;
    margin-left: 7px;
    margin-bottom: 15px;
  }

  ul {
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-auto-rows: 12.8rem;
    gap: var(--spacingMedium);
    list-style: none;
    max-width: 100%;
    padding: 0;
  }
  .interactive {
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
  .inner {
    margin-left: 10px;
  }
  .vl {
    margin-left: 10px;
    border-left: 2px solid black;
  }

  .stacked {
    display: block;
  }
  .interactive:hover {
    -webkit-transform: scale(0.97);
    -ms-transform: scale(0.97);
    transform: scale(0.97);
    transition: 0.4s;
  }
  .static {
    margin-top: 15px;
  }
  .static:hover {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  @media only screen and (max-width: 767px) {
    img {
      display: none;
    }
  }
</style>
