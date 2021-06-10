<!-- Javascript, HTML, and CSS are all written in the same file and are all scoped for this single component -->
<script>
    import { RingLoader } from "svelte-loading-spinners";

    import ProjectGrid from "./ProjectGrid.svelte";
    import { httpGet } from "../common/api.js";

    async function getProjects() {
        const { data } = await httpGet("/projects");
        return data;
    }
    let projects = getProjects();
</script>

{#await projects}
    <main>
        <RingLoader size="100" color="#1ad79f" unit="px" duration="1s" />
    </main>
{:then}
    <ProjectGrid {projects} />
{/await}

<!-- CSS is scoped for this component only -->
<style>
    main {
        position: fixed; 
        top: 50%;
        left: 50%;
    }
</style>
