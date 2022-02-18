<script>
    import {current_component} from 'svelte/internal';
    import {initEventbus} from './lib.js';
	initEventbus(current_component);
</script>

<slot/>