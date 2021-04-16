let fs = require('fs');
const FILE_NAME = './assets/rallyProjects.json';
const REQUEST_FILE = './assets/requestFile.json';

let projectRepo = {
    get: function (resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    },
    getByUserStory: function (userStory, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let projects = JSON.parse(data)
                projects = projects.projects
                let project = projects.find(r => r["User Story"] == userStory);
                resolve(project);
            }
        });
    },
    getByName: function (name, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let project = JSON.parse(data).filter(r => r.name.toLowerCase() == name.toLowerCase());
                resolve(project);
            }
        });
    },
    getByDifficulty: function (difficulty, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let recipes = JSON.parse(data).filter(r => r.difficulty.toLowerCase() == difficulty.toLowerCase());
                resolve(recipes);
            }
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