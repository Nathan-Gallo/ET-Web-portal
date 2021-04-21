let fs = require('fs');
const FILE_NAME = './assets/requestFile.json';

let usecaseRepo = {
    insert: function (newData, resolve, reject) {
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
    },
};


module.exports = usecaseRepo;