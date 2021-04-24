<script>
  import { navigate } from "svelte-routing";

  import BackButtonRowHome from "../common/BackButtonRowHome.svelte";
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
    const { ok } = await httpPost("/", request);
    if (ok) {
      navigate("/");
    }
  }

  async function doPost(event) {
    const res = await fetch("http://localhost:8081/api/projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const json = await res.json();
    let rawResult = JSON.stringify(json);
    result = JSON.parse(rawResult);

    if (result.status == 201) {
      navigate("/");
    }
  }
</script>

<main>
  <BackButtonRowHome />

  <Header element="h1" size="large">Submit an Idea</Header>

  <form on:submit|preventDefault={doPost}>
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
  .preview {
    display: grid;
    grid-template-columns: minmax(20vw, 10rem);
    grid-template-rows: minmax(32vw, 16rem);
  }
  @media (min-width: 48rem) {
    form {
      grid-template-columns: 60vw 20vw;
    }
  }
</style>
