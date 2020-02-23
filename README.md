# svelte-eventbus

Simple eventbus realization based on internal Svelte's tools only.

Use when you need handle events from deeply-nested child components without events forwarding.

### Features

* You can set event listeners on `Eventbus` component and catch any event created with `createEventbusDispatcher` in any child component.

* Events are isolated inside of `Eventbus` component instance. You can have more than one `Eventbus` in the parent component. Each will listen events from it's child components only.

* If you will have some nested `Eventbus` components, events will bubble while first of them will be occured.



### Usage example:

*Parent - App.svelte*

```html
<script>
    import Eventbus from 'svelte-eventbus';
    import Child from './Child.svelte';

    let totalclicks = 0;
</script>

<p>Total clicks: {totalclicks}</p>

<Eventbus on:button_click={()=>totalclicks++}>
    <!-- There can be childs in any nest level-->
    <Child />
</Eventbus>
```

*Nested - Child.svelte*

```html
<script>
    import {createEventbusDispatcher} from 'svelte-eventbus';
    const dispatch = createEventbusDispatcher();
</script>

<button on:click={()=>dispatch('button_click')}>Click</button>
```