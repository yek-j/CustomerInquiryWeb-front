export type UserInfoType =  {
    email: string,
    name: string,
    admin: string,
    password: string
}


export type UserInfoFormType = {
    data: UserInfoType,
    handler: (event: React.FormEvent<HTMLFormElement>) => void,
}