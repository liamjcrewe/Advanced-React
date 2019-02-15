import gql from 'graphql-tag'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import React, { Component } from 'react'

import Form from './styles/Form'
import Error from './ErrorMessage'
import formatMoney from '../lib/formatMoney'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`

class CreateItem extends Component {
  initialState = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  }

  state = this.initialState

  handleChange = event => {
    const { name, type, value } = event.target

    if (value.length === 0) {
      return this.setState({ [name]: this.initialState[name] })
    }

    const newValue = type === 'number' ? parseFloat(value) : value

    this.setState({ [name]: newValue })
  }

  render () {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state} >
        {(createItem, { loading, error }) => (
          <Form onSubmit={async event => {
            event.preventDefault()

            const response = await createItem()

            Router.push({
              pathname: '/item',
              query: { id: response.data.createItem.id }
            })
          }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor='title'>
                Title
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Title'
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor='price'>
                Price
                <input
                  type='number'
                  id='price'
                  name='price'
                  placeholder='Price'
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor='price'>
                Description
                <textarea
                  id='description'
                  name='description'
                  placeholder='Enter a Description'
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>

              <button type='submit'>Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export { CREATE_ITEM_MUTATION }
export default CreateItem
