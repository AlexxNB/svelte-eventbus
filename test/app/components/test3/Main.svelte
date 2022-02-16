<script>
  import Child1 from './Child1.svelte';
  import {Eventbus} from 'svelte-eventbus';
  let message = 'Wait for action...';
  let name = 'Event bubbling';
</script>

<fieldset>
  <legend>Test 3: {name}</legend>
  <h3 id="test3_parent_message">{message}</h3>

  <Eventbus on:bubble_child={()=>message=name+' child FAIL'} on:bubble_parent={()=>message=name+' parent OK'}>
    <Child1 {name}/>
  </Eventbus>
</fieldset>