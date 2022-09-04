import React, { useState } from 'react'

export default function ModalCalcul({ currentGamer, onRefresh, updateGamerCurrentScore, closeModal, addInScoring, options }) {
    const [operator, setOperator] = useState("+")
    const [currentScoreTemporary, setCurrentScoreTemporary] = useState(currentGamer.currentScore)
    const [amount, setAmount] = useState(0)

    const save = () => {
        if (operator === "+") {
            const total = currentGamer.currentScore + Number(amount)
            addInScoring(currentGamer.id, amount)
            updateGamerCurrentScore(currentGamer.id, total)
        }
        if (operator === "-") {
            const total = currentGamer.currentScore - Number(amount)
            addInScoring(currentGamer.id, -amount)
            updateGamerCurrentScore(currentGamer.id, total)
        }
        onRefresh()
        closeModal()
    }

    const onClickOperator = (operator) => {
        setOperator(operator)
        onChangeAmount(0)
    }

    const onChangeAmount = (value) => {
        const total = operator === "-" ? currentGamer.currentScore - value : currentGamer.currentScore + Number(value)
        if (options.possibleNegative) {
            setAmount(Number(value))
        }
        if (!options.possibleNegative) {
            console.log("totla", total)
            if (total < 0) {
                // Error message - negative value not authorized
            } else {
                setAmount(Number(value))
            }
        }
        setCurrentScoreTemporary(total)
    }

    return (
        <div className='bg-white text-black absolute max-w-sm mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full border p-2 border-black'>
            <div className='flex items-center justify-between'>
                <div>{currentGamer.name}</div>
                <div onClick={closeModal}>Back</div>
            </div>
            <div className='flex items-center h-20 my-1'>
                <div className='flex-1  h-full'>
                    <div className={`border justify-center items-center flex  h-1/2 border-black text-center  ${operator === "+" && "bg-black text-white "}`} onClick={() => onClickOperator("+")}>
                        +
                    </div>
                    <div className={`border  justify-center items-center flex h-1/2 border-black text-center ${operator === "-" && "bg-black text-white "}`} onClick={() => onClickOperator("-")}>
                        -
                    </div>
                </div>
                <div className="flex-1 h-full border border-black">
                    <input type="number" min={0} max={
                        operator === "-" && !options.possibleNegative ? currentGamer.currentScore : 10000000
                    } value={amount} onChange={(e) => onChangeAmount(e.target.value)} className="w-full h-full flex-1 bg-transparent text-center" />
                </div>
            </div>

            {/* <div className="flex items-center text-center">
                <div className="flex-1 border border-black">
                    {currentGamer.currentScore}
                </div>
                <div className="flex-1 border border-black" onClick={onClickOperator}>
                    {operator}

                </div>
                <div className="flex-1 border border-black">
                    <input type="number" min={0} max={
                        operator === "-" && !options.possibleNegative ? currentGamer.currentScore : 10000000
                    } value={amount} onChange={(e) => onChangeAmount(e.target.value)} className="w-full bg-transparent text-center" />
                </div>
            </div> */}
            Total : {currentScoreTemporary}
            <div className='border border-black text-center' onClick={save}>Save</div>
        </div>
    )
}
