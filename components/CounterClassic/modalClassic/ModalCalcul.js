import React, { useState } from 'react'

export default function ModalCalcul({ save, options, currentGamer, closeModal, }) {
    const [points, setPoints] = useState(0)

    const onSave = (operator, points) => {
        let total = 0
        let pointsFormatted = points
        if (operator === "-") {
            total = currentGamer.currentScore + -Math.abs(points)
            pointsFormatted = -Math.abs(points)
        } else (
            total = currentGamer.currentScore + (Math.abs(points))
        )
        if (!options.possibleNegative && total < 0) {
            total = 0
        }
        save(currentGamer.id, total, pointsFormatted)
        closeModal()
    }



    const onChangePoints = (value) => {
        setPoints(value)
    }

    return (
        <div className='bg-white text-black absolute max-w-sm mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full border p-2 border-black'>
            <div className='flex items-center justify-between' >
                <div>{currentGamer.name}</div>
                <div onClick={closeModal}>Back</div>
            </div >
            <div className='flex items-center h-20 my-1'>

                <div className="flex-1 h-full border border-black">
                    <input type="number" min={0} onFocus={() => setPoints("")} pattern="[0-9]*"
                        value={points} autoFocus onChange={(e) => onChangePoints(e.target.value)} className="w-full h-full flex-1 bg-transparent text-center" />
                </div>
            </div>


            <div className='border border-black text-center' onClick={() => onSave('+', points)}>Ajouter</div>
            <div className='border border-black text-center' onClick={() => onSave('-', points)}>Soustraire</div>
        </div >
    )
}
