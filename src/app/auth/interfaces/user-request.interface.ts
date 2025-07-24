export interface UserRequest {
    user:     User;
    userInfo: UserInfo;
}

export interface User {
    categoryIds: number[];
    active:      boolean;
}

export interface UserInfo {
    firstName:      string;
    lastName:       string;
    email:          string;
    userName:       string;
    password:       string;
    phone:          string;
    description:    string;
    profilePicture: string;
}
