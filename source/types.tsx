export type UserStackRouteParams = {
    Home: undefined
    Registration: undefined
    Login: undefined
}

export type PasswordMenuStackRouteParams = {
    MyPasswords: undefined
    AddPassword?: {
      edit: boolean
      currentItemInfos: fireStoreMainCollectionType
    }
}

export type fireStoreMainCollectionType = {
    Login: string
    Name: string
    Password: string
    Type: string
    docId?: string
    createdAt: Date|string
  }