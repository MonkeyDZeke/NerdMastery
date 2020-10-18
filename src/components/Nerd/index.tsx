import React from 'react'
import { INerd } from '../../types'

const Nerd: React.FC<INerd> = ({ name, rating, rd, volatility }: INerd) => {
    return (
        <div>
            <h5>{name}</h5>
            <ul>
                <li>Rating: {rating}</li>
                <li>Rating Deviation: {rd}</li>
                <li>Volatility: {volatility}</li>
            </ul>
        </div>
    )
}

export default Nerd