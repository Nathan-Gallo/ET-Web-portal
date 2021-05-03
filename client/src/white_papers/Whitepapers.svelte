<script>
    import Header from "../common/Header.svelte";
</script>

<main>
    <Header>White Papers</Header>

    <div class="container">
        <p class="greeting">
            This our repository of technical white papers created by the team.
            These were individually created by request of either partner's team
            or executive interest in a specific emerging technology. The team is
            happy to create additional white papers on any emerging technology
            topic and share its learning with you and your team.
        </p>
    </div>

    <div class="centered">
        <ul class="icons">
            <li class="interactive">
                <a
                    href="https://thehartford-my.sharepoint.com/:p:/p/mathew_adams/EQhoR2iJ829ClsOxrax59RMBXsEGT6GC8gs9go8-cTExCQ?e=9JcLZK"
                    target="_blank">Blockchain</a
                >
            </li>
            <li class="interactive">
                <a
                    href="https://thehartford-my.sharepoint.com/:p:/p/mathew_adams/EdAVZpX6mcpNlGOqjO74NHwBhPhIhoBna9P5tE4TFOmuVA?e=4SRlSi"
                    target="_blank">Internet of Things</a
                >
            </li>
        </ul>
    </div>
</main>

<style>
    main {
        max-width: 1400px;
        margin: auto;
    }
    .centered {
        display: block;
    }
    .icons {
        display: flex;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        grid-auto-rows: 12.8rem;
        gap: var(--spacingMedium);
        list-style: none;
        max-width: 100%;
        padding: 0;
    }
    a {
        text-decoration: inherit;
        color: inherit;
    }
    .interactive {
        position: relative;
        display: flex;
        background: rgb(235, 247, 245);
        background: linear-gradient(
            180deg,
            rgba(235, 247, 245, 1) 0%,
            rgba(250, 251, 253, 1) 100%
        );
        border-radius: 15px;
        text-align: center;
        padding: 1rem;
        box-shadow: 5px 5px 10px 0px #ccc;
    }

    .interactive:hover {
        -webkit-transform: scale(0.97);
        -ms-transform: scale(0.97);
        transform: scale(0.97);
        transition: 0.4s;
    }
    .greeting {
        font-size: var(--typeSizeSmall);
        float: left;
    }

    .container {
        display: flex;
        max-width: 700px;
    }
</style>
