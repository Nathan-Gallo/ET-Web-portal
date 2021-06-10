<script>
  import { navigate } from "svelte-routing";
  import { getContext } from "svelte";

  import Button from "../common/Button.svelte";
  import Header from "../common/Header.svelte";
  import { httpPost } from "../common/api.js";
  import TextInput from "./TextInput.svelte";
  import Message from "./Message.svelte";
  import CloseButton from './CloseButton.svelte';
 
  const { open } = getContext('simple-modal');

  const showModal = (story) => {
		open(
			Message,
			{
				message: "Your request has been submitted as UserStory: " + story
			},
		  {
				closeButton: CloseButton
			},
			{
				onClosed: () => {
          navigate("/")
				}
			}
		);
	};

  let name = "";
  let email = "";
  let team = "";
  let description = "";
  let result = null;

  // $ = Svelte Reactive Declaration - updates variable when any of it's pieces change
  $: request = { name, email, team, description };

  async function handleSubmit(event) {
    if(name != "" && email != "" && team != "" && description != ""){
      let result = await httpPost("/requests", request)
  
      let story = result.data.Object.FormattedID
      if (result.status == 201) {
        showModal(story)
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
      <TextInput label="Your Name" bind:value={name} /> <!-- Bind sets two way binding between the element and the variable -->
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
