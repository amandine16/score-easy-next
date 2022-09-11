import React, { useState } from 'react'

export default function ModalCalcul({ save, options, currentGamer, closeModal, }) {
    const [points, setPoints] = useState(0)

    const add = () => {
        save(currentGamer.id, currentGamer.currentScore + (Math.abs(points)), points)
        closeModal()

    }

    const substract = () => {
        save(currentGamer.id, currentGamer.currentScore + (-Math.abs(points)), points)
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


            <div className='border border-black text-center' onClick={add}>Ajouter</div>
            <div className='border border-black text-center' onClick={substract}>Soustraire</div>
        </div >
    )
}
