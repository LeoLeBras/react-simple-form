/* @flow */

import type { FormField } from 'react-simple-form/types'

export const isRequired = (field: FormField): boolean => (
  field.value !== undefined && field.value !== null && field.value !== ''
)
