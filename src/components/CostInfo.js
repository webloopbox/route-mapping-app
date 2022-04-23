import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import { setRate, setCost, setTime } from '../store/routeSlice'

export const CostInfo = () => {

    const [cost, setCost] = useState(null)
    const [rate, setRate] = useState(null)
    const [time, setTime] = useState(null)

    const dispatch = useDispatch()

    const { distance } = useSelector((state) => state.search)

    const calcEstimateCost = () => {
        const cost = Math.floor(rate * distance * 1.1);
        const time = distance / 800;
        setCost(cost)
        setTime(time)
    }

    return (
        <div className='route-info-wrapper'>
            <h2>Podaj stawkę za km</h2>
            <div className='rate-wrapper'>
                <div className='cost-input'>
                    <input type="number" className='' onChange={(e) => dispatch(setRate(e.target.value))} /><span>zł</span>
                </div>
                <button className='cost-btn' onClick={calcEstimateCost}>Sprawdź</button>
            </div>
            <div className='total-distance'>
                <p><strong>Dystans:</strong> {distance}km</p>
                {cost && <p><strong>Szacowany koszt:</strong> {cost}zł</p>}
                {time && <p><strong>Czas przejazdu:</strong> {time} dni</p>}
            </div>
        </div>
    )
}