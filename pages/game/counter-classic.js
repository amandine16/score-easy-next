/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faArrowRotateLeft, faClock, faUserPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import ModalCalcul from '../../components/CounterClassic/ModalCalcul';
import { gamerAddByDefault } from '../../utils/constants';


export default function counterClassic() {
    const [showModalCalcul, setShowModalCalcul] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [gamers, setGamers] = useState([gamerAddByDefault])
    const [currentGamer, setCurrentGamer] = useState(gamers.length !== 0 ? gamers[0] : gamerDefault)
    const [refresh, setRefresh] = useState(false)

    const onRefresh = () => {
        setRefresh((oldRefresh) => !oldRefresh)
    }


    console.log('gamer', gamers)


    useEffect(() => {
        const gamersSort = [...gamers]
        gamersSort.sort((a, b) => (a.currentScore > b.currentScore) ? 1 : ((b.currentScore > a.currentScore) ? -1 : 0));
        if (options.whoWins === "most points") {
            gamersSort.reverse()
        }
        const sortIdsGamers = []
        gamersSort.map((gamer, index) => {
            return (
                sortIdsGamers.push({ gamerId: gamer.id, podium: index + 1, name: gamer.name })
            )
        })
        const gamersCopy = [...gamers]
        sortIdsGamers.map((gamerSorted) => {
            const gamerFoundedIndex = gamersCopy.findIndex((gamer) => gamer.id === gamerSorted.gamerId)
            if (gamerFoundedIndex !== -1) {
                gamersCopy[gamerFoundedIndex].podium = gamerSorted.podium
            }
        })
        setGamers(gamersCopy)
    }, [refresh])


    const onChangeNameGamer = (value, id) => {
        const gamerIndex = gamers.findIndex((gamer) => gamer.id === id)
        let gamerUpdate = [...gamers]
        gamerUpdate[gamerIndex].name = value
        setGamers(gamerUpdate)
    }

    const onReduceScore = (id, incrementation) => {
        const gamerIndex = gamers.findIndex((gamerOld) => gamerOld.id === id)
        const oldGamers = [...gamers]
        if (options.possibleNegative) {
            oldGamers[gamerIndex].currentScore -= incrementation
        }
        if (!options.possibleNegative) {
            if (oldGamers[gamerIndex].currentScore !== 0) {
                oldGamers[gamerIndex].currentScore -= incrementation
            }
        }
        setGamers(oldGamers)
        onRefresh()
    }
    const onIncreaseScore = (gamerId, incrementation) => {
        const gamerIndex = gamers.findIndex((gamerOld) => gamerOld.id === gamerId)
        const oldGamers = [...gamers]
        oldGamers[gamerIndex].currentScore += incrementation
        setGamers(oldGamers)
        onRefresh()
    }

    const optionsDefault = {
        incrementation: 1,
        chrono: false,
        whoWins: "most points",
        sleeves: "illimity",
        possibleNegative: false
    }
    const [options, setOptions] = useState(optionsDefault)

    const openModalCalcul = (gamerId) => {
        const gamerFounded = gamers.find((gamer) => gamer.id === gamerId)
        setCurrentGamer(gamerFounded)
        setShowModalCalcul(true)
    }

    const closeModalCalcul = () => setShowModalCalcul(false)


    const addInScoring = (currentGamerId, newPoints) => {
        const oldGamers = [...gamers]
        const gamerIndex = oldGamers.findIndex((gamer) => gamer.id === currentGamerId)
        oldGamers[gamerIndex].points.push(newPoints)
        setGamers(oldGamers)
    }
    const addPalyer = () => {
        let oldGamers = [...gamers]
        oldGamers.push({ id: oldGamers.length, name: "player " + (oldGamers.length + 1), color: "red", points: [], podium: oldGamers.length + 1, currentScore: 0 })
        setGamers(oldGamers)
    }

    return (
        <div className="max-w-sm mx-auto border border-white ">
            {showModalCalcul &&
                <ModalCalcul addInScoring={addInScoring} options={options} currentGamer={currentGamer} onIncreaseScore={onIncreaseScore} onReduceScore={onReduceScore} closeModalCalcul={closeModalCalcul} />
            }
            <div className="flex items-center justify-between">
                <div>
                    <FontAwesomeIcon icon={faCalculator} />

                </div>
                <div>
                    <FontAwesomeIcon icon={faClock} />
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                    <FontAwesomeIcon icon={faUserPlus} />
                    <FontAwesomeIcon icon={faEllipsisH} />
                </div>
            </div>
            <div className='bg-gray-3'>
                {gamers.map((gamer, index) => {
                    return (
                        <div key={gamer.id}>
                            <div className='flex items-center'>
                                {/* Name */}
                                <div className='flex-1 my-1 mr-1 justify-center text-center'>
                                    <input key={gamer.id} type="text" value={gamer.name} className="w-full border border-white " onChange={(e) => onChangeNameGamer(e.target.value, gamer.id)} />
                                </div>
                                {/* Order */}
                                <div className='border border-white'>
                                    #{gamer.podium}
                                </div>

                            </div>
                            {/* Scoring */}
                            <div className=' w-full no-scrollbar  overflow-auto whitespace-nowrap justify-end flex'>
                                {gamer.points.map((point, index) => {
                                    return (
                                        <div key={index} className={`min-w-[100px] border text-center border-white overflow-hidden ${index === gamer.points.length - 1 && 'font-bold '}`} >{point}</div>
                                    )
                                })}
                            </div>
                            {/* Counter */}
                            <div className="flex items-center">
                                <div className='flex items-center justify-center border border-white flex-1' onClick={() => onReduceScore(gamer.id, options.incrementation)} >
                                    -
                                </div>
                                <div className='flex items-center justify-center border border-white flex-1' onClick={() => openModalCalcul(gamer.id)}>
                                    {gamer.currentScore}
                                </div>
                                <div className='flex items-center justify-center border border-white flex-1' onClick={() => onIncreaseScore(gamer.id, options.incrementation)}>
                                    +
                                </div>
                            </div>
                            {/* Add player */}
                        </div>
                    )
                })}
                <div onClick={addPalyer}>Add player +</div>
            </div>

        </div>
    )
}
