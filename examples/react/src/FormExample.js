/* eslint no-console: 0 */

import React, { Component } from 'react'
import { Form } from 'react-simple-form'
import { isRequired } from './helpers/validator'
import Field from './components/Field'
import TextInput from './components/TextInput'
import Button from './components/Button'

class FormExample extends Component {

  state = {
    firstName: 'Léo',
  }

  componentWillMount() {
    setTimeout(() => {
      this.form.onUpdateValues({
        lastName: 'Le Bras',
      })
    }, 2500)
  }

  onSubmit = async () => {
    try {
      const response = await this.form.onSubmit()
      console.log(response)
    } catch (errors) {
      console.log(errors)
    }
  }

  reducer = (state, action) => {
    console.log(`%c ${action.type}`, 'font-weight: bold; font-size: 16px;')
    console.log(state)
  }

  getFormState = () => {
    console.log(this.form.getState())
  }

  render() {
    return (
      <Form
        ref={(c) => this.form = c}
        initialValues={this.state}
        reducer={this.reducer}
      >
        <Field
          name="gender"
          label="Gender"
          placeholder="Ex: Monsieur"
          validator={{ isRequired }}
          component={TextInput}
        />
        <Field
          name="firstName"
          label="First name"
          placeholder="Ex: Léo"
          validator={{ isRequired }}
          component={TextInput}
        />
        <Field
          name="lastName"
          label="Last name"
          placeholder="Ex: Le Bras"
          validator={{ isRequired }}
          component={TextInput}
        />
        <Button onClick={this.getFormState}>
          Get form state
        </Button>
        <Button onClick={this.onSubmit}>
          Submit
        </Button>
      </Form>
    )
  }

}

export default FormExample
