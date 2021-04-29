import RallyInterface from './RallyInterface';

export default class RallyObject implements RallyInterface {
    constructor(name: string, description: string, notes: string, FormattedID?: string, Tags?: Array<any>, Comment?: string, EmergingTechPOCPipeline: string = "Portal Submissions") {
        this.Name = name;
        this.Description = description;
        this.Notes = notes;
        this.FormattedID = FormattedID;
        this.Tags = Tags;
        this.Comment = Comment;
        this.EmergingTechPOCPipeline = EmergingTechPOCPipeline;
    }
    FormattedID: string;
    Name: string;
    Description: string;
    Tags: any[];
    Notes: string;
    Comment: string;
    EmergingTechPOCPipeline: string;
}
