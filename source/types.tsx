export type UserStackRouteParams = {
    Home: undefined
    Registration: undefined
    Login: undefined
    AddPassword: undefined
}

export type PasswordMenuStackRouteParams = {
    MyPasswords: undefined
    AddPassword: undefined
}

export type fireStoreMainCollectionType = {
    Login: string
    Name: string
    Password: string
    Type: string
    docId?: number
    createdAt: Date
  }