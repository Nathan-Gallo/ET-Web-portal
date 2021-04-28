var rally = require('rally'),
    queryUtils = rally.util.query,
    restApi = rally({
        user: 'nathan.gallo@thehartford.com', //required if no api key, defaults to process.env.RALLY_USERNAME
        pass: '!Pnj901599087', //required if no api key, defaults to process.env.RALLY_PASSWORD
        server: 'https://rally1.rallydev.com',  //this is the default and may be omitted
        requestOptions: {
            headers: {
                'X-RallyIntegrationName': 'Emerging Technology Portal',  //while optional, it is good practice to
                'X-RallyIntegrationVendor': 'The Hartford',             //provide this header information
                'X-RallyIntegrationVersion': '1.0'
            }
            //any additional request options (proxy options, timeouts, etc.)     
        }
    });

class ProjectRepo {
    get() {
        return restApi.query({
            type: 'hierarchicalrequirement',
            start: 1,
            pageSize: 200,
            limit: 200,
            order: 'Rank',
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '', //specify to query entire workspace
                project: '/project/480104022420', //specify to query a specific project
                up: false, //true to include parent project results, false otherwise
                down: true //true to include child project results, false otherwise
            },
            query: queryUtils.where('EmergingTechPOCPipeline', '!=', null)
        });
    }

    getByUserStory(userStory) {
        return restApi.query({
            type: 'hierarchicalrequirement',
            start: 1,
            pageSize: 200,
            limit: 200,
            order: 'Rank',
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', 'Notes', 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '', //specify to query entire workspace
                project: '/project/480104022420', //specify to query a specific project
                up: false, //true to include parent project results, false otherwise
                down: true //true to include child project results, false otherwise
            },
            query: queryUtils.where('FormattedID', '=', userStory)
        });
    }

    getVendors() {
        return restApi.query({
            type: 'hierarchicalrequirement',
            start: 1,
            pageSize: 200,
            limit: 200,
            order: 'Rank',
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', "Notes", 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '', //specify to query entire workspace
                project: '/project/480104022420', //specify to query a specific project
                up: false, //true to include parent project results, false otherwise
                down: true //true to include child project results, false otherwise
            },
            query: queryUtils.where('EmergingTechPOCPipeline', '=', "Vendors")
        });
    }

    getUsecases() {
        return restApi.query({
            type: 'hierarchicalrequirement',
            start: 1,
            pageSize: 200,
            limit: 200,
            order: 'Rank',
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '', //specify to query entire workspace
                project: '/project/480104022420', //specify to query a specific project
                up: false, //true to include parent project results, false otherwise
                down: true //true to include child project results, false otherwise
            },
            query: queryUtils.where('EmergingTechPOCPipeline', '=', "Use Cases")
        });
    }

    searchByTag(tag) {
        return restApi.query({
            type: 'hierarchicalrequirement',
            start: 1,
            pageSize: 200,
            limit: 200,
            order: 'Rank',
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '', //specify to query entire workspace
                project: '/project/480104022420', //specify to query a specific project
                up: false, //true to include parent project results, false otherwise
                down: true //true to include child project results, false otherwise
            },
            query: queryUtils.where('Tags', '=', tag)
        })
    }

    create(newData) {
        return restApi.create({
            type: 'hierarchicalrequirement',
            data: newData,
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '', //specify to query entire workspace
                project: '/project/480104022420', //specify to query a specific project
            }
        });
    }
}

module.exports = ProjectRepo;