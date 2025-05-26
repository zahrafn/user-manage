//#region get user list

export interface IGetUserListRequest {
    page: number;
    results: number;
    nat?: string
    gender?: string;
}

export interface IGetUserListResponse {
    results: IUser[];
}

//#endregion


//#region user
export interface IUser {
    id: string;
    picture: IPictureProps;
    name: INameProps;
    login: ILoginProps;
    gender: string;
    phone: string;
    email: string;
    location: ILocationProps;
    nat: string;
}

export interface IPictureProps {
    medium: string;
}

export interface INameProps {
    first: string;
    last: string;
}

export interface ILoginProps {
    username: string;
    uuid:string;
}

export interface IStreetProps {
    number: number;
    name: string;
}

export interface ILocationProps {
    street: IStreetProps;
    city: string;
    state: string;
    country: string;
}

//#endregion


//#region get user profile

export interface IGetUserProfileRequest {
    uuid: string;
}

export interface IGetUserProfileResponse {
    results: IUser[];
}

//#endregion
