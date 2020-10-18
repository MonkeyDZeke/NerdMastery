import { INerd } from '../../types'

export const initialNerds: INerd[] = [
    {
        id: 'abc',
        name: 'Jaymes',
        rating: 1500,
        rd: 350,
        volatility: 0.6,
    },
    {
        id: 'def',
        name: 'Kyle',
        rating: 1500,
        rd: 350,
        volatility: 0.6,
    },
    {
        id: 'ghi',
        name: 'Tom',
        rating: 1500,
        rd: 350,
        volatility: 0.6,
    },
    {
        id: 'jkl',
        name: 'Merlyn',
        rating: 1500,
        rd: 350,
        volatility: 0.6,
    },
    {
        id: 'mno',
        name: 'John',
        rating: 1500,
        rd: 350,
        volatility: 0.6,
    },
]

export const init = (initValues: INerd[]) => initValues

export interface INerdAction {
    type: 'UPDATE' | 'RESET'
    payload: INerd
}

const reducer = (state: INerd[], action: INerdAction) => {
    switch (action.type) {
        case 'UPDATE':
            return [...state.filter(nerd => nerd.id !== action.payload.id), action.payload]
        case 'RESET':
            return init(initialNerds)
        default:
            return state
    }
}

export default reducer