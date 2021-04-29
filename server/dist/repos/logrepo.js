"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const FILE_NAME = './logs/log.txt';
class LogRepo {
    write(data, resolve, reject) {
        let toWrite = "*".repeat(80) + "\r\n";
        toWrite += "Date/Time: " + new Date().toLocaleDateString() + "\r\n";
        toWrite += "Exception Info: " + JSON.stringify(data) + "\r\n";
        toWrite += "*".repeat(80) + "\r\n";
        fs_1.default.writeFile(FILE_NAME, toWrite, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    }
}
exports.default = LogRepo;
//# sourceMappingURL=logrepo.js.map