import { createEventDispatcher,setContext, getContext } from 'svelte';

const LABEL = "SVELTE:EVENTBUS:DISPATCHER";

export function initEventbus(component){
    const parent_dispatch = getContext(LABEL);
    const dispatch = createEventDispatcher();
    setContext(LABEL,(type,details)=>{
        const list = Object.keys(component.$$.callbacks);
        if(list.includes(type))
            dispatch(type,details);
        else if(parent_dispatch) 
            parent_dispatch(type,details);
    });
}

export function createEventbusDispatcher(){
    return getContext(LABEL);
}