<script context="module">
    import { createEventDispatcher,setContext, getContext } from 'svelte';

    export function initEventbus(){
        setContext("SVELTE_EVENTBUS_DISPATCHER",createEventDispatcher());
    }

    export function createEventbusDispatcher(){
        return getContext("SVELTE_EVENTBUS_DISPATCHER");
    }
</script>

<script>
	initEventbus();
</script>

<slot/>