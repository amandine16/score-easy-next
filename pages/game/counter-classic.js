/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faArrowRotateLeft, faClock, faUserPlus } from '@fortawesome/free-solid-svg-icons';


export default function counterClassic() {

    const [gamers, setGamers] = useState([
        {
            id: 0,
            name: "Amandine",
            color: "red",
            points: [
                1, 2, 4, 10
            ]
        },
        {
            id: 1,
            name: "Julien",
            color: "blue",
            points: [
                1, 2, 4, 10
            ]
        },
        {
            id: 2,
            name: "Hera",
            color: "yellow",
            points: [
                1, 2, 4, 10
            ]
        }
    ])

    const onChangeGamer = (value, id) => {
        const gamerIndex = gamers.findIndex((gamer) => gamer.id === id)
        console.log('gamerIndex', gamerIndex)
        let gamerUpdate = [...gamers]
        console.log('value', value)
        gamerUpdate[gamerIndex].name = value
        setGamers(gamerUpdate)
        console.log('test', gamerUpdate)

    }

    return (
        <div className="max-w-sm mx-auto border border-white ">
            <div className="flex items-center justify-between">
                <div>
                    <FontAwesomeIcon icon={faCalculator} />

                </div>
                <div>
                    <FontAwesomeIcon icon={faClock} />
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                    <FontAwesomeIcon icon={faUserPlus} />
                </div>
            </div>
            <div className='bg-gray-3'>
                {gamers.map((gamer, index) => {
                    return (
                        <input key={gamer.id} type="text" value={gamer.name} onChange={(e) => onChangeGamer(e.target.value, gamer.id)} />
                    )
                })}
            </div>

        </div>
    )
}
