/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { Drink } from 'interfaces/drinks'

import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Modal from '../Modal'
import LineChart from './LineChart'
import ListHeader from './ListHeader'
import SelectedModal from './SelectedModal'

// const people = [
//   {
//     name: 'Jane Cooper',
//     title: 'Regional Paradigm Technician',
//     role: 'Admin',
//     email: 'janecooper@example.com',
//     telephone: '+1-202-555-0170',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
//   }
//   // More people...
// ]

export interface CustomGridListProps {
  drinks: Drink[]
}

const Button = (p: { text: string; onClick?: () => void }) => {
  return (
    <button
      type='button'
      className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'
      onClick={() => {
        ;(p.onClick || (() => {}))()
      }}
    >
      {p.text}
    </button>
  )
}

const AddDrink = (
  selectedDrinkName: string,
  selectedDrinksState: ISelectDrinks,
  setSelectedDrinks: Dispatch<SetStateAction<ISelectDrinks>>
) => {
  selectedDrinksState.selectedDrinks[selectedDrinkName] = selectedDrinksState.selectedDrinks[selectedDrinkName]
    ? selectedDrinksState.selectedDrinks[selectedDrinkName] + 1
    : 1

  console.log(selectedDrinksState)
  setSelectedDrinks({
    selectedDrinks: selectedDrinksState.selectedDrinks,
    update: selectedDrinksState.update === 0 ? 1 : 0
  })
}

const RemoveDrink = (
  selectedDrinkName: string,
  selectedDrinksState: ISelectDrinks,
  setSelectedDrinks: Dispatch<SetStateAction<ISelectDrinks>>
) => {
  selectedDrinksState.selectedDrinks[selectedDrinkName] =
    selectedDrinksState.selectedDrinks[selectedDrinkName] && selectedDrinksState.selectedDrinks[selectedDrinkName] > 0
      ? selectedDrinksState.selectedDrinks[selectedDrinkName] - 1
      : 0

  console.log(selectedDrinksState)
  setSelectedDrinks({
    selectedDrinks: selectedDrinksState.selectedDrinks,
    update: selectedDrinksState.update === 0 ? 1 : 0
  })
}

const DrankDrink = (
  selectedDrinkName: string,
  drankDrinksState: IDrankDrinks,
  setDrankDrinks: Dispatch<SetStateAction<IDrankDrinks>>
) => {
  const newDrink: DrinkTime = {
    name: selectedDrinkName,
    time: new Date()
  }
  drankDrinksState.drankDrinks.push(newDrink)
  console.log(drankDrinksState)

  // Store locally incase refresh
  localStorage.setItem('drankDrinks', JSON.stringify(drankDrinksState.drankDrinks))

  setDrankDrinks({
    drankDrinks: drankDrinksState.drankDrinks,
    update: drankDrinksState.update === 0 ? 1 : 0
  })
}

const ListItem = ({
  drink,
  selectedDrinks,
  setSelectedDrinks,
  drankDrinksState,
  setDrankDrinks
}: {
  drink: Drink
  selectedDrinks: ISelectDrinks
  setSelectedDrinks: Dispatch<SetStateAction<ISelectDrinks>>

  drankDrinksState: IDrankDrinks
  setDrankDrinks: Dispatch<SetStateAction<IDrankDrinks>>
}) => {
  return (
    <div key={drink.name} className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 '>
      <div className='w-full flex items-center justify-between p-6 space-x-6'>
        <div className='flex-1 truncate'>
          <div className='flex items-center space-x-3'>
            <h3 className='text-gray-900 text-sm font-medium truncate'>{drink.name}</h3>
            <span className='flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full'>
              {selectedDrinks.selectedDrinks[drink.name] || '0'}
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className='-mt-px flex divide-x divide-gray-200'>
          <div className='w-0 flex-1 flex'>
            <Button
              text='+'
              onClick={() => {
                AddDrink(drink.name, selectedDrinks, setSelectedDrinks)
              }}
            />

            <Button
              text='-'
              onClick={() => {
                RemoveDrink(drink.name, selectedDrinks, setSelectedDrinks)
              }}
            />
          </div>
          <div className='-ml-px w-0 flex-1 flex'>
            <Button
              text='Drank'
              onClick={() => {
                DrankDrink(drink.name, drankDrinksState, setDrankDrinks)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export interface ISelectDrinks {
  selectedDrinks: { [id: string]: number }
  update: number
}

export interface DrinkTime {
  name: string
  time: Date
}
export interface IDrankDrinks {
  drankDrinks: DrinkTime[]
  update: number
}

const getSTDDrink = (name: string) => {
  return 1.0
}

export interface IPoint {
  x: number
  y: number
}
type TData = IPoint[]

type genderCoeff = 0.55 | 0.68
//! Temporary
const CalculateBAC = (
  drankDrinksState: IDrankDrinks,
  coeff: genderCoeff,
  weight: number
): { BAC: number; BACData: TData } => {
  const decayRate = 0.015
  const drankDrinks = drankDrinksState.drankDrinks

  let BAC = 0.0

  const data: TData = []

  const preFirstDrink: Date = drankDrinks[0].time
  const firstDrink: Date = typeof preFirstDrink === 'string' ? new Date(preFirstDrink) : preFirstDrink

  let lastTime: Date = new Date()
  const currentTime = new Date()

  for (let i = 0; i < drankDrinks.length; i++) {
    const tt = drankDrinks[i].time
    const t: Date = typeof tt === 'string' ? new Date(tt) : tt
    const std = getSTDDrink(drankDrinks[i].name)

    if (i === 0) {
      BAC += std / (weight * coeff)
      data.push({ x: 0, y: 0 })
      data.push({ x: 0, y: BAC })
    } else {
      // All other points

      const elapsedTime = (t.getTime() - lastTime.getTime()) / (1000 * 3600)
      console.log(elapsedTime)
      let decayedBAC = BAC - decayRate * elapsedTime
      decayedBAC = decayedBAC < 0 ? 0 : decayedBAC

      const elapsedTimeFirstDrink = (t.getTime() - firstDrink.getTime()) / (1000 * 3600)
      data.push({ x: elapsedTimeFirstDrink, y: decayedBAC })

      console.log(`${BAC} dada1`)
      console.log(`${decayedBAC} dada2`)

      const addSTD = std / (weight * coeff)

      BAC = decayedBAC < 0 ? addSTD : decayedBAC + addSTD

      data.push({ x: elapsedTimeFirstDrink, y: BAC })
    }
    lastTime = t
  }

  const timeToZero = BAC / decayRate

  const elapsedTimeFirstDrinkLast =
    (lastTime.getTime() + timeToZero * 1000 * 3600 - firstDrink.getTime()) / (1000 * 3600)

  const elapsedTime = (currentTime.getTime() - lastTime.getTime()) / (1000 * 3600)

  if (elapsedTimeFirstDrinkLast < elapsedTime) {
    data.push({ x: elapsedTimeFirstDrinkLast, y: 0 })
  }

  const decayedBAC = BAC - decayRate * elapsedTime
  BAC = decayedBAC < 0 ? 0 : decayedBAC
  const elapsedTimeFirstDrink = (currentTime.getTime() - firstDrink.getTime()) / (1000 * 3600)
  data.push({ x: elapsedTimeFirstDrink, y: BAC })

  return {
    BAC: BAC,
    BACData: data
  }

  // Assume every drink 1 std drank
}

export default function CustomGridList(props: CustomGridListProps) {
  const [drinkSelected, setOpen] = useState(undefined)

  const initSelectedDrinks: { [id: string]: number } = {}
  const initSelectedDrinksState: ISelectDrinks = {
    selectedDrinks: initSelectedDrinks,
    update: 0
  }
  const [selectedDrinks, setSelectedDrinks] = useState<ISelectDrinks>(initSelectedDrinksState)

  // Get localState

  const initDrankDrinksState: IDrankDrinks = {
    drankDrinks: [],
    update: 1
  }
  const [drankDrinks, setDrankDrinks] = useState<IDrankDrinks>(initDrankDrinksState)

  const [openSelectedModal, setOpenSelectedModal] = useState(false)

  useEffect(function () {
    const ddd = localStorage.getItem('drankDrinks')

    const iiii: IDrankDrinks = {
      drankDrinks: ddd ? JSON.parse(ddd) : [],
      update: 0
    }
    setDrankDrinks(iiii)
  }, [])

  const reeee = drankDrinks.drankDrinks.length === 0 ? null : CalculateBAC(drankDrinks, 0.55, 80)

  return (
    <>
      <Modal drink={drinkSelected} setOpen={setOpen} />
      <SelectedModal open={openSelectedModal} setOpen={setOpenSelectedModal} selectedDrink={selectedDrinks} />
      <ListHeader setOpen={setOpenSelectedModal} />

      <div role='list' className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {props.drinks.map((drink, i) => (
          <ListItem
            key={i}
            drink={drink}
            selectedDrinks={selectedDrinks}
            setSelectedDrinks={setSelectedDrinks}
            drankDrinksState={drankDrinks}
            setDrankDrinks={setDrankDrinks}
          />
        ))}
      </div>

      {JSON.stringify(drankDrinks)}

      {reeee && (
        <>
          <div>{reeee.BAC}</div>
          <LineChart data={reeee.BACData} />
        </>
      )}
    </>
  )
}
