import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

import Title from './styles/Title'
import StyledItem from './styles/Item'
import PriceTag from './styles/PriceTag'
import formatMoney from '../lib/formatMoney'

const Item = ({ item }) =>
  <StyledItem>
    {item.image && <img src={item.image} alt={item.title} />}

    <Title>
      <Link
        href={{
          pathname: '/item',
          query: { id: item.id }
        }}
      >
        <a>{item.title}</a>
      </Link>
    </Title>

    <PriceTag>{formatMoney(item.price)}</PriceTag>
    <p>{item.description}</p>

    <div className='buttonList'>
      <Link
        href={{
          pathname: '/update',
          query: { id: item.id }
        }}
      >
        <a>Edit ✏️</a>
      </Link>
      <button>Add to Cart</button>
      <button>Delete</button>
    </div>
  </StyledItem>

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired
  }).isRequired
}

export default Item
