import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPositions, setLocationError } from '../store/searchSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

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

    const { locationError, pointA } = useSelector((state) => state.search)

    const onSubmit = (values) => {
        dispatch(fetchPositions({
            pointA: values.pointA,
            pointB: values.pointB
        })).unwrap().then(() => {
            navigate('/map')
        }).catch((err) => {
            console.log('Error: ', err);
        })
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
        </div>
    )
}

export default Home