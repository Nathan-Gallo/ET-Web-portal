<script>
  import { navigate } from "svelte-routing";

  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import { httpPost } from "../common/api.js";
  import TextInput from "./TextInput.svelte";

  let name = "";
  let email = "";
  let team = "";
  let description = "";
  let result = null;

  $: request = { name, email, team, description };

  async function handleSubmit(event) {
    if(name != "" && email != "" && team != "" && description != ""){
      let result = await httpPost("/requests", request)
      console.log(result.data.Object.FormattedID)
      if (result.status == 201) {
        navigate("/");
    }
    }
  }
</script>

<main>
  <nav>
    <Button to="/">&lt; Back</Button>
  </nav>
  <Header element="h1" size="large">Submit an Idea</Header>

  <form on:submit|preventDefault={handleSubmit}>
    <div class="fields">
      <TextInput label="Your Name" bind:value={name} />
      <TextInput label="Your Email" bind:value={email} />
      <TextInput label="Your Team/Group" bind:value={team} />
      <TextInput
        label="Business Need / Usecase"
        bind:value={description}
        multiline
      />
      <div>
        <Button>Submit</Button>
      </div>
    </div>
  </form>
</main>

<style>
  main {
    max-width: 1500px;
    margin: auto;
  }

  form {
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 1fr;
    gap: var(--spacingXLarge);
  }
  .fields {
    display: grid;
    grid-auto-rows: auto;
    gap: var(--spacingMedium);
  }
  nav {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    margin-bottom: var(--spacingXLarge);
  }

  @media (min-width: 48rem) {
    form {
      grid-template-columns: 60vw 20vw;
    }
  }
</style>
