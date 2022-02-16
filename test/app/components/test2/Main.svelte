<script>
  import Child1 from './Child1.svelte';
  import {Eventbus} from 'svelte-eventbus';
  let message = 'Wait for action...';
  let name = 'Deep Child to Parent';
</script>

<fieldset>
  <legend>Test 2: {name}</legend>
  <h3 id="test2_message">{message}</h3>

  <Eventbus on:deep_child_parent={()=>message=name+' OK'}>
    <Child1 {name}/>
  </Eventbus>
</fieldset>