<script>
  import Button from "../common/Button.svelte";
</script>

<header>
  <span class="preamble">Welcome to the</span>
  <h1>Emerging Technology Portal</h1>
</header>

<p class="greeting">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae euismod
  velit. Curabitur posuere velit velit, eget fermentum purus scelerisque sit
  amet. Nunc venenatis leo ligula, eu fermentum turpis dignissim at. Quisque
  malesuada dictum nisi, sed venenatis enim hendrerit laoreet. Integer metus
  tortor, pretium auctor auctor in, feugiat nec dolor. Pellentesque pretium
  libero at magna luctus vulputate. Cras vehicula in tortor eget cursus. Aliquam
  a suscipit quam, a molestie nulla. Phasellus purus turpis, placerat sed
  blandit sit amet, fermentum et eros. Ut gravida, erat eget lacinia feugiat,
  arcu mi maximus dui, nec finibus est orci a neque. Cras volutpat velit a quam
  mollis malesuada
</p>

<Button to="/projects">View our Projects</Button>
<br /><br />
<hr />
<br /><br />
<span>Goals</span>
<div class="centered">
  <ul>
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
    <li>Donec ut metus et nibh vestibulum placerat.</li>
    <li>
      Aenean sollicitudin augue id nibh fermentum, ac consectetur elit pharetra.
    </li>
    <li>In iaculis elit ac risus interdum iaculis.</li>
  </ul>
</div>

<style>
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
  }

  .centered {
    width:1500px;
    margin:0 auto;
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
    background-color: white;
    text-align: center;
    padding: 1rem;
    box-shadow: 5px 5px 10px 0px #ccc;
  }
</style>
