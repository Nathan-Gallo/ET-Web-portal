"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RallyObject {
    constructor(name, description, notes, FormattedID, Tags, Comment, EmergingTechPOCPipeline = "Portal Submissions") {
        this.Name = name;
        this.Description = description;
        this.Notes = notes;
        this.FormattedID = FormattedID;
        this.Tags = Tags;
        this.Comment = Comment;
        this.EmergingTechPOCPipeline = EmergingTechPOCPipeline;
    }
}
exports.default = RallyObject;
//# sourceMappingURL=RallyObject.js.map