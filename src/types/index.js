/* @flow */

export type FormStatus = 'pending' | 'success' | 'failure'

export type FormField = {
  component: React$Element<any>,
  name: string,
  value: string,
  errors: Array<string>,
  hasBeenFocused: boolean,
  isFocused: boolean,
}

export type FormState = {
  status: FormStatus,
  formState: { [name: string]: FormField }
}

export type FormAction = Object & {
  type: string,
}

export type FormResponse = {
  status: string,
  formState: FormState,
  values: { [name: string]: string },
}

export type FormContext = {
  status: FormStatus,
  formState: FormState,
  onInitialyze: (field: FormField) => void,
  onChange: (field: FormField) => void,
  onFocus: (field: FormField) => void,
  onBlur: (field: FormField) => void,
}
