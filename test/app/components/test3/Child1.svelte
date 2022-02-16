<script>
  import Child2 from './Child2.svelte';
  import {Eventbus} from 'svelte-eventbus';
  let message = 'Wait for action...';
  export let name;
</script>

<h3 id="test3_child_message">{message}</h3>

<Eventbus on:bubble_child={()=>message=name+' child OK'}>
  <Child2/>
</Eventbus>