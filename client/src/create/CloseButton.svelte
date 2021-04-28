<script>
    // This property is used by Modal.svelte to pass down the close function
    export let onClose;
  </script>
  
  <style>
    /* Customize to your liking */
    button {
      position: absolute;
      top: -3rem;
      right: 0;
    }
  </style>
  
  <button on:click={onClose}>Custom Close Button</button>
  