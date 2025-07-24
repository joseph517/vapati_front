export interface UserResponse {
    accessToken:  string;
    refreshToken: string;
    userInfo:     UserInfo;
}

export interface UserInfo {
    userId:    number;
    email:     string;
    role:      string;
    firstName: string;
    lastName:  string;
    userName:  string;
    fullName:  string;
}
