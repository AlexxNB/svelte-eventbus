<script>
  import {createEventbusDispatcher} from 'svelte-eventbus';
  const dispatch = createEventbusDispatcher();

  export let id;
  export let event;
</script>

<button {id} on:click={()=>dispatch(event)}><slot/></button>