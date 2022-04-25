import { fetchPositions } from "../store/searchSlice";

const state = {
    pointA: {},
    pointB: {},
    loading: 'false',
    locationError: '',
    distance: null,
    time: null,
    mapActive: false,
}

let data = { pointA: "Warsaw", pointB: "Cracow" }
let wrongData = { pointA: "Warsaw", pointB: "asdasdasdasd" }

describe('thunk', () => {
    describe('fetch provided address', () => {
        it('should fetch data', async () => {
            const dispatch = jest.fn()
            const thunk = fetchPositions(data)
            await thunk(dispatch, () => state, undefined)
            const { calls } = dispatch.mock
            expect(calls[0][0].type).toEqual('search/position/pending')
            expect(calls[1][0].type).toEqual('search/position/fulfilled')
            console.log(dispatch.mock.calls);
        })
        it('should fail if wrong adress', async () => {
            const dispatch = jest.fn()
            const thunk = fetchPositions(wrongData)
            await thunk(dispatch, () => state, undefined)
            const { calls } = dispatch.mock
            expect(calls[0][0].type).toEqual('search/position/pending')
            expect(calls[1][0].type).toEqual('search/position/rejected')
            expect(calls[1][0].payload).toEqual('Podano nieistniejącą lokalizację!')
            console.log(dispatch.mock.calls);
        })
    })
})