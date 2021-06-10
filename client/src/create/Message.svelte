<!-- Message Modal -->
<script>
    import { navigate } from "svelte-routing";

    export let message;
    let contact = "If you have any questions please reach out to Nathan Gallo at nathan.gallo@thehartford.com"
</script>
  
  <p>
     {message} 
  </p>
  <p>
    {contact}
  </p>