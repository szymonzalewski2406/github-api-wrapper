import {User} from "./User";
import {Issue} from "./Issue";

export interface Repository {
    name: string,
    description: string,
    html_url: string,
    clone_url: string,
    ssh_url: string,
    created_at: Date,
    updated_at: Date,
    subscribers_count : number,
    forks : number,
    open_issues : number,
    owner: User,
    issues: Issue[],
}
