export interface User {
    id: number,
    login: string,
    avatar_url: string,
    html_url: string,
    type: string,
    name: string,
    location: string,
    public_repos: number,
    followers: number,
    created_at: Date,
    updated_at: Date,
}
