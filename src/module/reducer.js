/* @flow */
/* eslint no-param-reassign: 0 */

import type { FormAction, FormState } from './../types'
import * as actionTypes from './actionTypes'

const { INITIALYZE_FIELD, CHANGE_FIELD, FOCUS_FIELD, BLUR_FIELD, UPDATE, SUBMIT } = actionTypes

const initialState = {
  status: 'pending',
  formState: {},
}

export default function (state: FormState = initialState, action: FormAction): FormState {
  switch (action.type) {

    case INITIALYZE_FIELD:
    case CHANGE_FIELD:
    case FOCUS_FIELD:
    case BLUR_FIELD: {
      const { field } = action
      return {
        ...state,
        formState: {
          ...state.formState,
          [field.name]: field,
        },
      }
    }
    case UPDATE: {
      const { values } = action
      return {
        ...state,
        formState: Object.keys(state.formState)
          .map((name) => ({
            ...state.formState[name],
            value: values[name] || state.formState[name].value,
          }))
          .reduce((form, field) => {
            form[field.name] = field
            return form
          }, {}),
      }
    }

    case SUBMIT: {
      const { status } = action.response
      return {
        ...state,
        status,
      }
    }

    default: {
      return state
    }

  }
}
