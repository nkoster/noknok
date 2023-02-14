type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key
    }
    : {
      type: Key
      payload: M[Key]
    }
}

export enum Types {
  Update = 'UPDATE_USER',
}

export type UserType = string

type UserPayload = {
  [Types.Update]: string
}

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<
  UserPayload
>]

export const userReducer = (
  state: UserType,
  action: UserActions
) => {
  switch (action.type) {
    case Types.Update:
      return action.payload
    default:
      return state
  }
}
