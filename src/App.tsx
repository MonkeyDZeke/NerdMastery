import React, { useState } from 'react'
import { Button, Callout, Card, ControlGroup, Elevation, HTMLSelect, Slider, Tag } from '@blueprintjs/core'
import './App.css'
import { people, traits } from './data'
import { IEvaluation } from './types'
import { calculateSession } from './utilities'

// reducer to update people details

interface IOption {
  label: string
  value: string
}

function App() {
  const [players, setPlayers] = useState(people)
  const playerOptions = players.map(player => ({ label: player.name, value: player.id }))

  const [evaluator, setEvaluator] = useState<IOption>({ label: 'Select Evaluator', value: '' })
  const [nerd, setNerd] = useState<IOption>({ label: 'Select Nerd', value: '' })
  const evaluators = playerOptions.filter(p => p.value !== nerd.value)
  const nerds = playerOptions.filter(p => p.value !== evaluator.value)

  const [trait, setTrait] = useState('')

  const [rating, setRating] = useState(0)

  const [evaluations, setEvaluations] = useState<IEvaluation[]>([])
  const addEvaluation = () => setEvaluations(
    [
      ...evaluations,
      {
        evaluatorId: evaluator.value,
        nerdId: nerd.value,
        boost: 1,
        trait,
        rating
      }
    ]
  )

  const submit = () => {
    const results = calculateSession({
      players,
      settings: {},
      evaluations,
      traits
    })
    setPlayers(results)
  }

  return (
    <div>
      <Callout title="Welcome to the NerdMastery playtest">Create a set of evaluations for this session. When you are ready, click "Calculate Results" and see what happens!</Callout>
      <div>
        {players.map(player =>
          <Card elevation={Elevation.ONE}>
            <p>{player.name}</p>
          </Card>
        )}
      </div>
      <div>
        <ControlGroup fill>
          <HTMLSelect
            onChange={({ currentTarget: { value } }) => setEvaluator(evaluators.find(e => e.value === value)!)}
            value={evaluator.value}
            options={[{ label: 'Evaluator', value: '' }, ...evaluators]}
          />
          <HTMLSelect
            onChange={({ currentTarget: { value } }) => setNerd(nerds.find(e => e.value === value)!)}
            value={nerd.value}
            options={[{ label: 'Nerd', value: '' }, ...nerds]}
          />
          <HTMLSelect
            onChange={({ currentTarget: { value } }) => setTrait(value)}
            value={trait}
            options={traits}
          />
          <Slider max={1} min={-1} stepSize={0.2} value={rating} onChange={(n: number) => setRating(n)} labelStepSize={0.2} />
          <Button onClick={addEvaluation} disabled={!evaluator.value || !nerd.value || !trait}>Add Evaluation</Button>
        </ControlGroup>
      </div>
      <div>
        {evaluations.map((e, i) =>
          <Tag onRemove={() => setEvaluations([...evaluations.slice(0,i), ...evaluations.slice(i+1)])}>
            {`${players.find(p => p.id === e.evaluatorId)!.name} rates ${players.find(p => p.id === e.nerdId)!.name}'s ${e.trait} at ${e.rating}`}
          </Tag>
        )}
      </div>
      <div>
        <Button large onClick={submit} disabled={!evaluations.length}>Submit This Session of Evaluations!</Button>
      </div>
    </div>
  )
}

export default App
