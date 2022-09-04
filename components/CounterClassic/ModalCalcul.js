import React, { useState } from 'react'

export default function ModalCalcul({ currentGamer, onIncreaseScore, onReduceScore, closeModalCalcul, addInScoring, options }) {
    const [operator, setOperator] = useState("+")
    const [amount, setAmount] = useState(0)

    const save = () => {
        if (operator === "+") {
            onIncreaseScore(currentGamer.id, amount)
            addInScoring(currentGamer.id, amount)
        }
        if (operator === "-") {
            onReduceScore(currentGamer.id, amount)
            addInScoring(currentGamer.id, -amount)
        }
        closeModalCalcul()
    }

    const onClickOperator = () => {
        setOperator(operator === "+" ? "-" : "+")
        onChangeAmount(0)
    }

    const onChangeAmount = (value) => {
        setAmount(Number(value))
    }

    return (
        <div className='absolute max-w-sm mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full border p-2 border-white'>
            <div className='flex items-center justify-between'>
                <div>{currentGamer.name}</div>
                <div onClick={closeModalCalcul}>Back</div>
            </div>
            <div className="flex items-center text-center">
                <div className="flex-1 border border-white">
                    {currentGamer.currentScore}
                </div>
                <div className="flex-1 border border-white" onClick={onClickOperator}>
                    {operator}

                </div>
                <div className="flex-1 border border-white">
                    <input type="number" min={0} max={
                        operator === "-" && !options.possibleNegative ? currentGamer.currentScore : 10000000
                    } value={amount} onChange={(e) => onChangeAmount(e.target.value)} />
                </div>
            </div>
            <div onClick={save}>Save</div>
        </div>
    )
}
