<script context="module">
    import { createEventDispatcher,setContext, getContext } from 'svelte';

    export function initEventbus(component){
        const parent_dispatch = getContext("SVELTE_EVENTBUS_DISPATCHER");
        const dispatch = createEventDispatcher();
        setContext("SVELTE_EVENTBUS_DISPATCHER",(type,details)=>{
            const list = Object.keys(component.$$.callbacks);
            if(list.includes(type))
                dispatch(type,details);
            else if(parent_dispatch) 
                parent_dispatch(type,details);
        });
    }

    export function createEventbusDispatcher(){
        return getContext("SVELTE_EVENTBUS_DISPATCHER");
    }
</script>

<script>
    import {current_component} from 'svelte/internal';
	initEventbus(current_component);
</script>

<slot/>