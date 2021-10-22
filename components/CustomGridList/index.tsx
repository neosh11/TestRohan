/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { Drink } from 'interfaces/drinks'

import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import Modal from '../Modal'
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

const ListItem = ({
  drink,
  selectedDrinks,
  setSelectedDrinks
}: {
  drink: Drink
  selectedDrinks: ISelectDrinks
  setSelectedDrinks: Dispatch<SetStateAction<ISelectDrinks>>
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
            <Button text='Drank' />
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

export default function CustomGridList(props: CustomGridListProps) {
  const [drinkSelected, setOpen] = useState(undefined)

  const initSelectedDrinks: { [id: string]: number } = {}
  const initSelectedDrinksState: ISelectDrinks = {
    selectedDrinks: initSelectedDrinks,
    update: 0
  }
  const [selectedDrinks, setSelectedDrinks] = useState<ISelectDrinks>(initSelectedDrinksState)
  const [openSelectedModal, setOpenSelectedModal] = useState(false)

  return (
    <>
      <Modal drink={drinkSelected} setOpen={setOpen} />
      <SelectedModal open={openSelectedModal} setOpen={setOpenSelectedModal} selectedDrink={selectedDrinks} />
      <ListHeader setOpen={setOpenSelectedModal} />

      <div role='list' className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {props.drinks.map((drink, i) => (
          <ListItem key={i} drink={drink} selectedDrinks={selectedDrinks} setSelectedDrinks={setSelectedDrinks} />
        ))}
      </div>
    </>
  )
}
