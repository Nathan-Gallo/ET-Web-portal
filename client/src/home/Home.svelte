<script>
  import { RingLoader } from "svelte-loading-spinners";

  import { httpGet } from "../common/api.js";
  import ProjectCover from "../common/ProjectCover.svelte";
  import Button from "../common/Button.svelte";

  async function getVendors() {
    const { data } = await httpGet("/projects");
    return await data;
  }
  let projects = getVendors();
</script>

<main>
  <header>
    <span class="preamble">Welcome to the</span>
    <h1>Emerging Technology Portal</h1>
  </header>
  <div class="container">
    <p class="greeting">
      The Emerging Technology team is uniquely positioned to identify, assess
      and evaluate new and emerging technologies and leveraging them for
      positive disruption and innovation within the enterprise. Our goal is to
      be your partner and resource and to engage at every level of the business
      to drive the delivery and adoption of emerging technologies, aligning The
      Hartford’s strategic business and technology objectives. These
      technologies will deliver innovative new solutions in place of current
      technology that is too expensive, inefficient, or just not practical using
      traditional means or practices. The team is dedicated to Evangelize new
      technology and solutions both in the marketplace and within The Hartford
      and to facilitate brainstorming services to collaborate on innovative,
      outside the box solutions utilizing new concepts and technologies that
      will solve previously unsolvable problems.
      <br /><br /><span class="greeting"
        >Our ultimate goal is delivering to your team the best in market
        solutions to the appropriate business and technical opportunities within
        the enterprise using “Proof of Concepts” to marry these validated
        solutions with your team’s technical and business challenges.
      </span>
    </p>
    <img src="./graphic.png" alt="technology graphic" />
  </div>
  <Button to="/create">Submit a Use Case</Button>

  <br /><br />
  <hr />
  <br /><br />
  <span class="preamble">Current Projects</span>
  <div class="centered">
    {#await projects}
      <div class="flex-container">
        <div class="inner-element">
          <RingLoader size="40" color="#1ad79f" unit="px" duration="1s" />
        </div>
      </div>
    {:then projects}
      <ul class="icons">
        {#each projects as project}
          {#if project.EmergingTechPOCPipeline == "Active POC"}
            <li class="interactive">
              <ProjectCover interactive {project} />
            </li>
          {/if}
        {/each}
      </ul>
    {/await}
  </div>
  <br />
  <hr />
  <br />

  <div class="centered">
    <ul class="icons">
      <li class="interactive">Center of Excellence</li>
      <li class="interactive"><a href="/projects">POCs</a></li>
      <li class="interactive"><a href="/useCases">Use Cases</a></li>
      <li class="interactive"><a href="/vendors">Vendors</a></li>
      <li class="interactive"><a href="/whitepapers">White Papers</a></li>
    </ul>
  </div>

  <br />
  <hr />
  <br />

  <span class="preamble">The Four Tenants of Emerging Technology</span>
  <br />
  <table class="tg">
    <tbody>
      <tr>
        <td class="tg-title">Evangelize</td>
        <td class="tg-0pky"
          ><ul>
            <li>
              Be the Pathfinders for new technology at The Hartford, guiding
              everyone forward and upward
            </li>
          </ul></td
        >
      </tr>
      <tr>
        <td class="tg-title">Explore</td>
        <td class="tg-0pky"
          ><ul>
            <li>
              Work with every level of the business to understand and identify
              the core technical &amp; business challenges that can be solved
              through emerging technology solutions
            </li>
          </ul></td
        >
      </tr>
      <tr>
        <td class="tg-title">Engage</td>
        <td class="tg-0pky"
          ><ul>
            <li>
              Engage with solution engineering, partner business and technology
              teams to define the priorities and opportunities in each app area
            </li>
          </ul></td
        >
      </tr>
      <tr>
        <td class="tg-title">Deliver</td>
        <td class="tg-0lax"
          ><ul>
            <li>Focus on Results and minimize cumbersome process</li>
          </ul></td
        >
      </tr>
    </tbody>
  </table>
</main>

<style>
  .flex-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    justify-content: center;
    align-items: center;
  }
  .inner-element {
    width: 100px;
    height: 100px;
  }

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

  .container {
    display: flex;
  }
  .centered {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 65%;
  }

  img {
    width: 40%;
    height: auto;
    border-radius: 15px;
    margin-left: 7px;
    margin-bottom: 15px;
  }

  .icons {
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-auto-rows: 12.8rem;
    gap: var(--spacingMedium);
    list-style: none;
    max-width: 100%;
    padding: 0;
  }

  .tg {
    margin: auto;
    border-collapse: collapse;
    font-size: 0.9em;
    min-width: 400px;
    box-shadow: 5px 5px 10px 0px #ccc;
    background: rgb(235, 247, 245);
    background: linear-gradient(
      180deg,
      rgba(235, 247, 245, 1) 0%,
      rgba(250, 251, 253, 1) 100%
    );
  }
  .tg td {
    padding: 12px;
  }
  .tg tbody tr {
    border-bottom: thin solid #dddddd;
  }
  .tg tbody tr:active-row {
    font-weight: bold;
  }
  .tg-title {
    font-weight: bold;
  }

  a {
    text-decoration: inherit;
    color: inherit;
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

  .interactive:hover {
    -webkit-transform: scale(0.97);
    -ms-transform: scale(0.97);
    transform: scale(0.97);
    transition: 0.4s;
  }

  @media only screen and (max-width: 767px) {
    img {
      display: none;
    }
  }
</style>
