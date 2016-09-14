/* @flow */

export type FormStatus = 'pending' | 'success' | 'failure'

export type FormField = {
  component: React$Element<any>,
  ref: Object,
  name: string,
  value: string | null,
  validator: { [key: name]: (field: FormField) => boolean },
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
  values: { [name: string]: string | null },
}

export type FormContext = {
  status: FormStatus,
  formState: FormState,
  keyboardAvoidingViewRef: React$Element<any>,
  initialValues: [key: string]: string,
  onInitialyze: (field: FormField) => void,
  onChange: (field: FormField) => void,
  onFocus: (field: FormField) => void,
  onBlur: (field: FormField) => void,
  onSubmit: () => Promise<FormResponse>,
}
