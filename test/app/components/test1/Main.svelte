<script>
  import Child from './Child.svelte';
  import {Eventbus} from 'svelte-eventbus';
  let message = 'Wait for action...';
  let name = 'Child to Parent';
</script>

<fieldset>
  <legend>Test 1: {name}</legend>
  <h3 id="test1_message">{message}</h3>

  <Eventbus on:child_parent={()=>message=name+' OK'}>
    <Child {name}/>
  </Eventbus>
</fieldset>