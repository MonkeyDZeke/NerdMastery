export interface IGlicko {
    _tau: number,
    __rating: number,
    __rd: number,
    __vol: number,
    id: number,
    adv_ranks: number[],
    adv_rds: number[],
    outcomes: number[],
    getRating: () => number,
    getRd: () => number,
    getVol: () => number,
}

export interface ITrait {
    rating: number
    ratingShift: number
    rd: number
    volatility: number
    glicko: IGlicko | null
    boost: number // should be between 0.9 and 1.1
}


export interface INerd {
    id: string
    name: string
    level: number
    boost: number // should be between 0.9 and 1.1
    traits: {
        [key: string]: ITrait
    }
}

export interface IEvaluation {
    evaluatorId: string
    nerdId: string
    boost: number // should be between 0.9 and 1.1
    rating: number // should be between -1 and 1
    trait: string
}

export interface ISession {
    evaluations: IEvaluation[]
    settings: {
        tau?: number
        rpd?: number
        rating?: number
        rd?: number
        vol?: number
    }
    traits: string[]
    players: INerd[]
}
