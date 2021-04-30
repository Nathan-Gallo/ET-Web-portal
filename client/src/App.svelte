<script>
  import { Route, Router } from "svelte-routing";
  import Modal from 'svelte-simple-modal';

  import Create from "./create/Create.svelte";
  import Detail from "./detail/Detail.svelte";
  import Home from "./home/Home.svelte";
  import Projects from "./projects/Projects.svelte";
  import Nav from "./nav/nav.svelte";
  import UseCases from "./useCases/UseCases.svelte";
  import Vendors from "./Vendors/Vendors.svelte";
  import Whitepapers from "./white_papers/Whitepapers.svelte";


  export let url = "";
</script>

<Router {url}>
  <Nav />
  <main>
    <Route path="/create">
      <Modal>
        <Create />
      </Modal>  
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
    <Route path="/whitepapers">
      <Whitepapers />
    </Route>
  </main>
</Router>

<style>
  main {
    padding: var(--spacingLarge);
  }
</style>
