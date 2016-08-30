/* @flow */

import React, { PropTypes, Component } from 'react'
import _ from 'lodash'
import { getFormStatus, getFormValues, getFormErrors } from './../../utils'
import formReducer from './../../module/reducer'
import * as actionTypes from './../../module/actionTypes'
import type { FormAction, FormState, FormField, FormResponse, FormContext } from './../../types'

const { INITIALYZE_FIELD, CHANGE_FIELD, FOCUS_FIELD, BLUR_FIELD, UPDATE, SUBMIT } = actionTypes

type Props = {
  className: string,
  children?: React$Element<any>,
  initialValues: { [name: string]: string },
  reducer: () => { action: FormAction, state: FormState },
}

class Form extends Component {

  props: Props
  state: FormState = {
    status: 'pending',
    formState: {},
  }


  // Initialize a field
  onInitialyze = (field: FormField) => {
    const initialValues = this.props.initialValues || {}
    const { name } = field
    const value = initialValues[name] || null
    this.dispatch({
      type: INITIALYZE_FIELD,
      field: { ...field, value },
      force: true,
    })
  }


  // Change a field
  onChange = (field: FormField) => {
    this.dispatch({
      type: CHANGE_FIELD,
      field,
    })
  }


  // Focus a field
  onFocus = (field: FormField) => {
    this.dispatch({
      type: FOCUS_FIELD,
      field,
    })
  }


  // Blur a field
  onBlur = (field: FormField) => {
    this.dispatch({
      type: BLUR_FIELD,
      field,
    })
  }


  // Update values in all fields
  onUpdateValues = (values: { [name: string]: string }): void => {
    this.dispatch({
      type: UPDATE,
      values,
      force: true,
    })
  }


  // Submit form. This method is accessible only
  // with ref
  onSubmit = (): Promise<FormResponse> => {
    return new Promise(
      async (resolve, reject) => {
        const status = getFormStatus({ ...this.state })
        const form = _.cloneDeep(this.state)
        const { formState } = form
        if (status === 'success') {
          const values = getFormValues(form)
          const response = { status, formState, values }
          this.dispatch({
            type: SUBMIT,
            response,
            force: true,
          })
          resolve(response)
        } else {
          const response = {
            status,
            formState,
            errors: getFormErrors({ ...this.state }),
          }
          this.dispatch({
            type: SUBMIT,
            response,
            force: true,
          })
          reject(response)
        }
      }
    )
  }


  // Dispatch an action
  dispatch = (action: FormAction): void => {
    const { reducer } = this.props
    const state = formReducer(
      this.state || { status: 'pending', formState: {} },
      action,
    )
    if (reducer) reducer(state, action)
    this.state = state
    if (action.force) this.forceUpdateFields()
  }


  // Update all fields
  timer: any = null
  forceUpdateFields = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.forceUpdate()
    }, 10)
  }


  // Return form state
  getState = (): Object => {
    return this.state.formState
  }


  // Send form actions to field children
  static childContextTypes = { form: PropTypes.object.isRequired }
  getChildContext(): { form: FormContext } {
    return {
      form: {
        status: this.state.status,
        formState: this.state.formState,
        onInitialyze: this.onInitialyze,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
      },
    }
  }


  // Render <Form /> component without parsing anything
  render() {
    const { children, className } = this.props
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          return false
        }}
        className={className}
      >
        {children}
      </form>
    )
  }

}

export default Form
