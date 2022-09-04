/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faArrowRotateLeft, faClock, faUserPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import ModalCalcul from '../../components/CounterClassic/modalClassic/ModalCalcul';
import { gamerAddByDefault } from '../../utils/constants';
import ModalOptionsCounterClassic from '../../components/CounterClassic/modalClassic/ModalOptionsCounterClassic';


export default function counterClassic() {
    const [showModalCalcul, setShowModalCalcul] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [gamers, setGamers] = useState([gamerAddByDefault])
    const [currentGamer, setCurrentGamer] = useState(gamers.length !== 0 ? gamers[0] : gamerDefault)
    const [refresh, setRefresh] = useState(false)
    const [pointsAddedEachRound, setpointsAddedEachRound] = useState([0])
    const [currentScoreTemporary, setCurrentScoreTemporary] = useState(0)
    const [showModalOptions, setShowModalOptions] = useState(false)

    const openModalOptions = () => {
        setShowModalOptions(true)
    }
    const closeModalOptions = () => {
        setShowModalOptions(false)
    }

    const onChangeOptions = (newOptions) => {
        setOptions(newOptions)
    }

    const onRefresh = () => {
        setRefresh((oldRefresh) => !oldRefresh)
    }

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



    const onReduceScore = (currentScore, incrementation, index) => {
        const newPointsAddedEachRound = [...pointsAddedEachRound]
        newPointsAddedEachRound[index] = newPointsAddedEachRound[index] - incrementation


        if (!options.possibleNegative) {
            if (pointsAddedEachRound[index] - Math.abs(newPointsAddedEachRound[index]) < 0) {
                // afficher message erreur
            } else {

                setpointsAddedEachRound(newPointsAddedEachRound)
                setCurrentScoreTemporary(currentScore - Math.abs(newPointsAddedEachRound[index]))

            }
        }
        if (options.possibleNegative) {
            setpointsAddedEachRound(newPointsAddedEachRound)
            setCurrentScoreTemporary(currentScore - Math.abs(newPointsAddedEachRound[index]))

        }
    }



    const onIncreaseScore = (currentScore, incrementation, index) => {
        const newPointsAddedEachRound = [...pointsAddedEachRound]
        const total = pointsAddedEachRound[index] + incrementation
        newPointsAddedEachRound[index] = total
        setpointsAddedEachRound(newPointsAddedEachRound)
        setCurrentScoreTemporary(currentScore + total)
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

    const save = (currentGamerId, index) => {
        updateGamerCurrentScore(currentGamerId, currentScoreTemporary)
        addInScoring(currentGamerId, pointsAddedEachRound[index], currentScoreTemporary)
        const newPointsAddedEachRound = [...pointsAddedEachRound]
        newPointsAddedEachRound[index] = 0
        setpointsAddedEachRound(newPointsAddedEachRound)
        setCurrentScoreTemporary(currentScoreTemporary)
        onRefresh()

    }

    const updateGamerCurrentScore = (gamerId, newCurrentScore) => {
        const oldGamers = [...gamers]
        const gamerIndex = oldGamers.findIndex((gamer) => gamer.id === gamerId)
        oldGamers[gamerIndex].currentScore = newCurrentScore
        setGamers(oldGamers)
    }

    const addPlayer = () => {
        let oldGamers = [...gamers]
        const newPointsAddedEachRound = [...pointsAddedEachRound]
        newPointsAddedEachRound.push(0)
        setpointsAddedEachRound(newPointsAddedEachRound)
        oldGamers.push({ id: oldGamers.length, name: "player " + (oldGamers.length + 1), color: "red", points: [], podium: oldGamers.length + 1, currentScore: 0 })
        setGamers(oldGamers)
    }

    const changeOptions = (key, value) => {
        const newOptions = { ...options }
        newOptions[key] = value
        setOptions(newOptions)
    }

    return (
        <div className="max-w-sm mx-auto border  border-white p-2 ">
            {showModalCalcul &&
                <ModalCalcul updateGamerCurrentScore={updateGamerCurrentScore} addInScoring={addInScoring} options={options} currentGamer={currentGamer} closeModal={closeModalCalcul} onRefresh={onRefresh} />
            }
            {showModalOptions &&
                <ModalOptionsCounterClassic changeOptions={changeOptions} options={options} onChangeOptions={onChangeOptions} closeModal={closeModalOptions} onRefresh={onRefresh} />
            }
            <div className="flex items-center justify-between mb-2">
                <div>
                    <FontAwesomeIcon icon={faCalculator} className="text-[20px]" />
                </div>
                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faClock} className="text-[20px] mr-2" />
                    <FontAwesomeIcon icon={faArrowRotateLeft} className="text-[20px] mr-2" />
                    <FontAwesomeIcon icon={faUserPlus} className="text-[20px] mr-2" />
                    <FontAwesomeIcon icon={faEllipsisH} className="text-[20px]" onClick={openModalOptions} />
                </div>
            </div>
            <div className=' '>
                {gamers.map((gamer, index) => {
                    return (
                        <div key={gamer.id} className="p-1 border border-white">
                            <div className='flex items-center'>
                                {/* Name */}
                                <div className='flex-1 my-1 mr-1 justify-center text-center '>
                                    <input key={gamer.id} type="text" value={gamer.name} className="w-full border bg-transparent px-1 border-white " onChange={(e) => onChangeNameGamer(e.target.value, gamer.id)} />
                                </div>
                                {/* Order */}
                                <div className='border border-white'>
                                    #{gamer.podium}
                                </div>

                            </div>
                            {/* Scoring */}
                            <div className=' w-full no-scrollbar  overflow-auto whitespace-nowrap  flex'>
                                {gamer.points.map((point, index) => {
                                    return (
                                        <>
                                            <div key={index} className={`min-w-[100px] border text-center border-white overflow-hidden ${index === gamer.points.length - 1 && 'font-bold '}`} >{point}</div>

                                        </>
                                    )
                                })}
                            </div>
                            {/* Counter */}
                            <div className="flex items-center">
                                <div className='flex items-center justify-center border border-white flex-1' onClick={() => onReduceScore(gamer.currentScore, options.incrementation, index)} >
                                    -
                                </div>
                                <div className='flex items-center justify-center border border-white flex-1' onClick={() => openModalCalcul(gamer.id)}>
                                    {pointsAddedEachRound[index]}
                                </div>
                                <div className='flex items-center justify-center border border-white flex-1' onClick={() => onIncreaseScore(gamer.currentScore, options.incrementation, index)}>
                                    +
                                </div>
                            </div>
                            <div className='border border-white text-center my-1' onClick={() => save(gamer.id, index)}>Save</div>
                            {/* Total current Gamer */}
                            <div>Total : {gamer.currentScore}</div>
                        </div>
                    )
                })}
                {/* Add player */}
                <div className='border border-white  my-1 py-2 px-1 text-center' onClick={addPlayer}>Add player +</div>
            </div>

        </div>
    )
}
