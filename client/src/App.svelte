<script>
  import { Route, Router } from "svelte-routing";

  import Create from "./create/Create.svelte";
  import Detail from "./detail/Detail.svelte";
  import Home from "./home/Home.svelte";
  import Projects from "./projects/Projects.svelte";
  import Nav from './nav/nav.svelte';
  import UseCases from './useCases/UseCases.svelte';
  import Vendors from "./Vendors/Vendors.svelte";

  export let url = "";
</script>

<style>
  main {
    padding: var(--spacingLarge);
  }
</style>

<Router {url}>
  <Nav></Nav>
  <main>
    <Route path="/create">
      <Create />
    </Route>
    <Route path="/projects/:id" let:params>
      <Detail id={params.id} />
    </Route>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/projects">
      <Projects />
    </Route>
    <Route path="/useCases">
      <UseCases />
    </Route>
    <Route path="/vendors">
      <Vendors />
    </Route>
  </main>
</Router>
