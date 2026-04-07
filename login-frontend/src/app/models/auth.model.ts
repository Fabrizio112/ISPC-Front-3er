export interface LoginData {
    username: String;
    password: String;
}
export interface User {
    id: number;
    username: String;
    email: String;
}

export interface LoginResponseData {
    refresh: String;
    access: String;
    user: User
}

export interface RegisterData {
    username: String;
    email: String;
    password: String;
}

export interface RegisterResponseData {
    username: String;
    email: String;
}