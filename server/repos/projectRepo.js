let fs = require('fs');
const FILE_NAME = './assets/rallyProjects.json';
const REQUEST_FILE = './assets/requestFile.json';


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

function queryAllVendors() {
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
        query: queryUtils.where('EmergingTechPOCPipeline', '=', "Vendors")
    });
}

function queryAllUsecases() {
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

let projectRepo = {
    /* get: function (resolve, reject) {
         fs.readFile(FILE_NAME, function (err, data) {
             if (err) {
                 reject(err);
             }
             else {
                 resolve(JSON.parse(data));
             }
         });
     }, */
    get: function () {
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
    },
    getByUserStory: function (userStory) {
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
            query: queryUtils.where('FormattedID', '=', userStory)
        });
    },
    getAllVendors: function () {
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
            query: queryUtils.where('EmergingTechPOCPipeline', '=', "Vendors")
        });
    },
    getAllUsecases: function () {
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
    },
    getByType: function (type, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let recipes = JSON.parse(data).filter(r => r.type.toLowerCase() == type.toLowerCase());
                resolve(recipes);
            }
        });
    },
    search: function (searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let recipes = JSON.parse(data);
                // Perform search
                if (searchObject) {
                    recipes = recipes.filter(
                        r => (searchObject.id ? r.id == searchObject.id : true) &&
                            (searchObject.name ? r.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true));
                }
                resolve(recipes);
            }
        });
    },
    insert: function (newData, resolve, reject) {
        fs.readFile(REQUEST_FILE, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let requests = JSON.parse(data);
                console.dir(requests)
                //if (projects.find(u => u.name.toLowerCase() == newData.name.toLowerCase())) {
                //     reject(err);
                //  }
                // else {
                // Make a new object to create the ID
                let newRequest;


                newRequest = {
                    id: requests.length + 1,
                    name: newData.name,
                    email: newData.email,
                    team: newData.team,
                    description: newData.description,
                };

                requests.push(newRequest);
                fs.writeFile(REQUEST_FILE, JSON.stringify(requests), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(newData);
                    }
                });
                // }
            }
        });
    },
    update: function (newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let recipes = JSON.parse(data);
                let recipe = recipes.find(r => r.id == id);
                if (recipe) {
                    Object.assign(recipe, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(recipes), function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(newData);
                        }
                    });
                }
            }
        });
    },
    delete: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let recipes = JSON.parse(data);
                let index = recipes.findIndex(r => r.id == id);
                if (index != -1) {
                    recipes.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(recipes), function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(index);
                        }
                    });
                }
            }
        });
    }
};

module.exports = projectRepo;