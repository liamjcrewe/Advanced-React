import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import React, { Component } from 'react'

import Item from './Item'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

const Centre = styled.div`
  text-align: center;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

export { ALL_ITEMS_QUERY }
export default () =>
  <Centre>
    <p>Shop!</p>
    <Query query={ALL_ITEMS_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error.</p>

        return (
          <ItemsList>
            {data.items.map(item =>
              <Item key={item.id} item={item} />
            )}
          </ItemsList>
        )
      }}
    </Query>
  </Centre>
