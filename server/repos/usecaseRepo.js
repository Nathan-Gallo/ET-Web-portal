let fs = require('fs');
const FILE_NAME = './assets/requestFile.json';

var rally = require('rally'),
    restApi = rally({
        user: 'nathan.gallo@thehartford.com', //required if no api key, defaults to process.env.RALLY_USERNAME
        pass: '!Pnj901599087', //required if no api key, defaults to process.env.RALLY_PASSWORD
        server: 'https://rally1.rallydev.com',  //this is the default and may be omitted
        requestOptions: {
            headers: {
                'X-RallyIntegrationName': 'My cool node.js program',  //while optional, it is good practice to
                'X-RallyIntegrationVendor': 'My company',             //provide this header information
                'X-RallyIntegrationVersion': '1.0'
            }
            //any additional request options (proxy options, timeouts, etc.)     
        }
    });


class UsecaseRepo {
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

module.exports = UsecaseRepo;