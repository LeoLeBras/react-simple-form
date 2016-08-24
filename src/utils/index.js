/* @flow */

import type { FormField, FormState } from './../types'

type FieldErrors = Array<string>


// Return field errors by checking
// validator prop
export function getFieldErrors(field: FormField): FieldErrors {
  return Object.keys(field.validator || {})
    .map((rule) => ({
      name: rule,
      func: field.validator[rule],
    }))
    .filter((rule) => !rule.func(field))
    .map((rule) => rule.name)
}


// Get form errors
export const getFormErrors = (form: FormState): {[name: string]: FieldErrors} => (
  Object.keys(form.formState)
    .map((key) => {
      const field = form.formState[key]
      const errors = field.errors || getFieldErrors(field)
      return { [key]: errors }
    })
    .filter((field) => {
      return field[Object.keys(field)[0]].length > 0
    })
    .reduce((fields, field) => {
      const name = Object.keys(field)[0]
      const errors = field[name]
      return { ...fields, [name]: errors }
    }, {})
)


// Check if form has errors and return response
// msg : "succes" or "error"
export const getFormStatus = (form: FormState): 'success' | 'failure' => (
  Object.keys(getFormErrors(form)).length === 0
    ? 'success'
    : 'failure'
)


// Return all field values in a single object
export const getFormValues = (form: FormState): {[name: string]: string | null} => (
  Object.keys({ ...form.formState })
    .map((key) => ({
      name: form.formState[key].name,
      value: form.formState[key].value,
    }))
    .reduce((_form, field) => {
      const newForm = form.formState
      newForm[field.name] = field.value
      return newForm
    }, {})
)
