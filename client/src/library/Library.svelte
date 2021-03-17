<script>
  import { onMount } from "svelte";

  import BookGrid from "./BookGrid.svelte";
  import Button from "../common/Button.svelte";
  import { httpGet } from "../common/api.js";

  let books = [];
  onMount(async function () {
    const { data } = await httpGet("/?_sort=id&_order=desc");
    books = data.books;
  });
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

<Button to="/create">View our Projects</Button>
<hr />
<BookGrid {books} />

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
</style>
