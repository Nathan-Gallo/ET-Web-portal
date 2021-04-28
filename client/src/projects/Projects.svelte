<script>
    import { RingLoader } from "svelte-loading-spinners";

    import ProjectGrid from "./ProjectGrid.svelte";
    import { httpGet } from "../common/api.js";

    async function getProjects() {
        const { data } = await httpGet("/projects");
        return await data;
    }
    let projects = getProjects();
</script>

{#await projects}
    <main>
        <RingLoader size="100" color="#1ad79f" unit="px" duration="1s" />
    </main>
{:then projects}
    <ProjectGrid {projects} />
{/await}

<style>
    main {
        position: fixed; 
        top: 50%;
        left: 50%;
    }
</style>
