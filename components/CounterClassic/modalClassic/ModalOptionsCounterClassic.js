import React, { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function ModalOptionsCounterClassic({ changeOptions, onChangeOptions, closeModal, options }) {
    const [incrementation, setIncrementation] = useState(1)
    const [chrono, setChrono] = useState(false)

    const onChangeIncrementation = (value) => {
        setIncrementation(Number(value))
    }




    const save = () => {
        changeOptions("incrementation", incrementation)
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
                <li className='flex items-center justify-between'>
                    <p>Chrono :</p>
                    <Switch
                        checked={chrono}
                        onChange={setChrono}
                        className={`${chrono ? 'bg-black' : 'bg-gray-300'}
          relative inline-flex h-[18px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={`${chrono ? 'translate-x-[25px]' : 'translate-x-0'}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                </li>
            </ul>



            <div className='border border-black text-center' onClick={save}>Save</div>
        </div>
    )
}
