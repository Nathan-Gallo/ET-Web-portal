"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rally = require('rally'), queryUtils = rally.util.query, restApi = rally({
    apiKey: '_gUdkEZxSYqdMCqqIAWigPpUw5eDzkakpdklNeVIHI',
    requestOptions: {
        headers: {
            'X-RallyIntegrationName': 'Emerging Technology Portal',
            'X-RallyIntegrationVendor': 'The Hartford',
            'X-RallyIntegrationVersion': '1.0'
        }
        // any additional request options (proxy options, timeouts, etc.)
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
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', "Notes", 'Comment', 'EmergingTechPOCPipeline', "Attachments"],
            scope: {
                workspace: '',
                project: '/project/480104022420',
                up: false,
                down: true // true to include child project results, false otherwise
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
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', 'Notes', 'Comment', 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '',
                project: '/project/480104022420',
                up: false,
                down: true // true to include child project results, false otherwise
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
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', "Notes", 'Comment', 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '',
                project: '/project/480104022420',
                up: false,
                down: true // true to include child project results, false otherwise
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
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', "Notes", 'Comment', 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '',
                project: '/project/480104022420',
                up: false,
                down: true // true to include child project results, false otherwise
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
            fetch: ['FormattedID', 'Name', 'Description', 'Tags', "Notes", 'Comment', 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '',
                project: '/project/480104022420',
                up: false,
                down: true // true to include child project results, false otherwise
            },
            query: queryUtils.where('Tags', '=', tag)
        });
    }
    // Sends data to Rally and creates a new userstory
    create(newData) {
        return restApi.create({
            type: 'hierarchicalrequirement',
            data: {
                Name: newData.Name,
                Description: newData.Description,
                Notes: newData.Notes,
                c_EmergingTechPOCPipeline: newData.EmergingTechPOCPipeline
            },
            fetch: ['FormattedID', 'Name', 'Description', "Notes", 'EmergingTechPOCPipeline'],
            scope: {
                workspace: '',
                project: '/project/480104022420', // specify to query a specific project
            }
        });
    }
}
exports.default = ProjectRepo;
//# sourceMappingURL=projectrepo.js.map