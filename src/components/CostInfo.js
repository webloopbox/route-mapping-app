import { useState } from 'react'
import { useSelector } from 'react-redux'

export const CostInfo = () => {

    const [cost, setCost] = useState(null)
    const [rate, setRate] = useState(null)
    const [toggle, setToggle] = useState(false)

    const { distance, time } = useSelector((state) => state.search)

    const calcEstimateCost = (e) => {
        e.preventDefault()
        const cost = Math.floor(rate * distance * 1.1);
        setCost(cost)
    }

    const toggleInfo = () => {
        setToggle(prev => !prev)
    }

    return (
        <div className={toggle ? 'route-info-wrapper open' : 'route-info-wrapper'}>
            <h2>Podaj stawkę za km</h2>
            <form className='rate-wrapper' onSubmit={calcEstimateCost}>
                <div className='cost-input'>
                    <input type="number" step="any" onChange={(e) => { setRate(e.target.value) }} /><span>zł</span>
                </div>
                <button className='cost-btn' type='submit' >Sprawdź</button>
            </form>
            <div className='total-distance'>
                <p><strong>Dystans:</strong> {distance}km</p>
                {time && <p><strong>Czas przejazdu:</strong> {time}</p>}
                {cost && <p><strong>Szacowany koszt:</strong> {cost}zł</p>}
            </div>
            <button className='switch-btn' onClick={toggleInfo}>{toggle ? '❯' : '❮'}</button>
        </div>
    )
}