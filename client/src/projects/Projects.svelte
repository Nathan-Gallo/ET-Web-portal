<script>
    import { onMount } from "svelte";

    import ProjectGrid from "./ProjectGrid.svelte";
    import { httpGet } from "../common/api.js";

    let projects = [];
    onMount(async function () {
        const { data } = await httpGet("/?_sort=id&_order=desc");
        projects = data.books;
    });
</script>

<ProjectGrid {projects} />
