import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { fetchPositions, searchRecent, setMapActive } from '../store/searchSlice'

const initialValues = {
    pointA: '',
    pointB: ''
}

const validationSchema = Yup.object({
    pointA: Yup.string().required('To pole jest wymagane.'),
    pointB: Yup.string().required('To pole jest wymagane.')
})

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { locationError } = useSelector((state) => state.search)
    const { recentRoutes } = useSelector((state) => state.routes)

    const onSubmit = (values) => {
        dispatch(fetchPositions({
            pointA: values.pointA,
            pointB: values.pointB
        })).unwrap().then(() => {
            dispatch(setMapActive(true))
            navigate('/map')
        }).catch((err) => {
            console.log('Error: ', err);
        })
    }

    const openRecentRoute = (pos) => {
        dispatch(searchRecent(pos))
        navigate('/map')
    }

    return (
        <div className='container'>
            <h2>Podaj adres startowy oraz końcowy</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <Field name="pointA" type="text" placeholder='punkt A' className='point' />
                    <ErrorMessage name='pointA' render={msg => < div className='error'> {msg} </ div >} />
                    <Field name="pointB" type="text" placeholder='punkt B' className='point' />
                    <ErrorMessage name='pointB' render={msg => < div className='error'> {msg} </ div >} />
                    <button type="submit" className='designate'>Wyznacz trasę</button>
                </Form>
            </Formik>
            {locationError && <p>{locationError}</p>}
            <div className='recent-routes-wrapper'>
                <h2>Ostatnio szukane: </h2>
                <div className='recent-routes'>

                    {recentRoutes.map((pos, index) => {
                        let origin = (pos.pointA.address.label).split(',')[0]
                        let destination = (pos.pointB.address.label).split(',')[0]
                        return (
                            <button key={index} onClick={() => openRecentRoute(pos)} className="recent-route">{origin} &#8594; {destination}</button>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Home