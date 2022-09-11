import React, { useState } from 'react'

export default function ModalOptionsCounterClassic({ changeOptions, onChangeOptions, closeModal, options }) {
    const [incrementation, setIncrementation] = useState(options.incrementation)
    const [possibleNegative, setPossibleNegative] = useState(options.possibleNegative)
    const [whoWins, setWhoWins] = useState(options.whoWins)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const onChangeIncrementation = (value) => {
        setIncrementation(Number(value))
    }

    const save = () => {
        changeOptions("incrementation", incrementation)
        changeOptions("whoWins", whoWins)
        changeOptions("possibleNegative", possibleNegative)
        closeModal()
    }
    return (
        <div className='bg-white text-black absolute max-w-sm mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full border p-2 border-black'>
            <div className='flex items-center justify-between mb-2'>
                <div>Party options</div>
                <div onClick={closeModal}>Back</div>
            </div>
            {/* <ul className='border border-black p-1 mb-2'>
                {Object.keys(options).map((optionKey, index) => {
                    return (
                        <li key={index} className="flex items-center justify-between">
                            <p>{optionKey} : </p>
                            <p>{options[optionKey]}</p>
                        </li>
                    )
                })}
            </ul> */}

            <ul>
                {/* Incrementation */}
                <li className='flex items-center justify-between'>
                    <p>Incrementation :</p>
                    <input type="number" min={1} value={incrementation} onChange={(e) => onChangeIncrementation(e.target.value)} className="bg-transparent text-right" />
                </li>
                {/* Possible negative ? */}
                <li >
                    <p >Value negative ? </p>
                    <div className="flex">
                        <div className={`w-fit  mr-2 bg-transparent ${possibleNegative ? 'border border-black' : 'border border-gray-200'} px-4`} onClick={() => setPossibleNegative(true)}>yes</div>
                        <div className={`w-fit  mr-2 bg-transparent ${!possibleNegative ? 'border border-black' : 'border border-gray-200'} px-4`} onClick={() => setPossibleNegative(false)}>no</div>
                    </div>
                </li>
                {/* Who wins ? */}
                <li >
                    <p >Who wins ? </p>
                    <div className="flex">
                        <div className={`w-fit  mr-2 bg-transparent ${whoWins ? 'border border-black' : 'border border-gray-200'} px-4`} onClick={() => setWhoWins(true)}>+ points</div>
                        <div className={`w-fit  mr-2 bg-transparent ${!whoWins ? 'border border-black' : 'border border-gray-200'} px-4`} onClick={() => setWhoWins(false)}>- points</div>
                    </div>
                </li>
                {/* Chrono */}
                <li >
                    <p>Chrono :</p>
                    <p className='text-xs mb-1'>Pour lancer le timer, revevenir au compteur, et cliquez sur l&apos;icône </p>
                    <div className="flex mb-2">
                        <input min={0} className='w-full flex-1 mr-2 bg-transparent border px-2' type="number" value={hours} onChange={(e) => setHours(e.target.value)}></input>
                        <input min={0} className='w-full flex-1 mr-2 bg-transparent border px-2' type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)}></input>
                        <input min={0} className='w-full flex-1 bg-transparent border px-2' type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)}></input>
                    </div>
                </li>
            </ul>



            <div className='border border-black text-center' onClick={save}>Save</div>
        </div >
    )
}
