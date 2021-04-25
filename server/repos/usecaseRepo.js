let fs = require('fs');
const FILE_NAME = './assets/requestFile.json';

var rally = require('rally'),
    queryUtils = rally.util.query,
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
    insert(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let requests = JSON.parse(data);
                console.dir(requests)

                let newRequest;


                newRequest = {
                    id: requests.length + 1,
                    name: newData.name,
                    email: newData.email,
                    team: newData.team,
                    description: newData.description,
                };

                requests.push(newRequest);
                fs.writeFile(FILE_NAME, JSON.stringify(requests), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(newData);
                    }
                });
            }
        });
    }

    create() {
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