<script>
    import { onMount } from "svelte";

    import ProjectGrid from "./ProjectGrid.svelte";
    import { httpGet } from "../common/api.js";

    let books = [];
    onMount(async function () {
        const { data } = await httpGet("/?_sort=id&_order=desc");
        books = data.books;
    });
</script>

<ProjectGrid {books} />
