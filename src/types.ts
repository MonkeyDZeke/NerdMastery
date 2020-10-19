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


export interface INerd {
    id: string
    name: string
    rating: number
    rd: number
    volatility: number
    glicko: IGlicko | null
    level: number
}

export interface IRating {
    nerdName: string
    nerdId: string
    evaluatorName: string
    evaluatorId: string
    rating: number
}