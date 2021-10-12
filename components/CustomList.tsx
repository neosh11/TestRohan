import { useState } from 'react'
import Modal from './Modal'

export interface ListItem {
  name: string
  title: string
  price?: number
  calories: number
}
export interface ListProps {
  drinks: ListItem[]
}

const Row = ({ drink, index, setOpen }: { drink: ListItem; index: number; setOpen: any }) => (
  <tr
    key={drink.name}
    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
    onClick={() => {
      setOpen(drink)
    }}
  >
    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{drink.name}</td>
    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{drink.title}</td>
    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{drink.price}</td>
    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{drink.calories}</td>
  </tr>
)

export default function CustomList(props: ListProps) {
  const [drinkSelected, setOpen] = useState(undefined)

  return (
    <>
      <Modal drink={drinkSelected} setOpen={setOpen} />
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Price
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Calories
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.drinks.map((drink, drinkIdx) => (
                    <Row key={drinkIdx} drink={drink} index={drinkIdx} setOpen={setOpen} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
