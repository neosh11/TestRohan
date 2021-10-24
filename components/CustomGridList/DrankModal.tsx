/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { IDrankDrinks, ISelectDrinks, TGraphData } from '.'
import LineChart from './LineChart'

export default function DrankModal(p: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  drankDrinks: IDrankDrinks
  setDrankDrinks: Dispatch<SetStateAction<IDrankDrinks>>

  BACData: {
    BAC: number
    BACData: TGraphData
  } | null
}) {
  return (
    <Transition.Root show={p.open} as={Fragment}>
      <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={p.setOpen}>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
              <div className='mt-5 sm:mt-6'>
                <button
                  type='button'
                  className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                  onClick={() => {
                    // Remove Everything with button
                    p.setDrankDrinks({
                      drankDrinks: [],
                      update: (p.drankDrinks.update + 1) % 2
                    })
                  }}
                >
                  Clear Selection
                </button>
              </div>

              {/* Show BAC */}
              <div>BAC: {p.BACData?.BAC || 0}</div>

              <div>
                <div>
                  {p.drankDrinks.drankDrinks.map((nn, ii) => {
                    return (
                      <div className='grid grid-cols-2 shadow-md p-2' key={`${ii} dada`}>
                        <span className='p-2'> {nn.name} </span>
                        <span className='p-2'>
                          {typeof nn.time === 'object' ? nn.time.toDateString() : new Date(nn.time).toDateString()}{' '}
                        </span>
                        <span className='grid justify-items-center'>
                          <span>
                            <button
                              type='button'
                              className='bg-blue-200 text-white p-2'
                              onClick={() => {
                                // remove the item
                                p.drankDrinks.drankDrinks.splice(ii, 1)
                                localStorage.setItem('drankDrinks', JSON.stringify(p.drankDrinks.drankDrinks))

                                p.setDrankDrinks({
                                  drankDrinks: p.drankDrinks.drankDrinks,
                                  update: (p.drankDrinks.update + 1) % 2
                                })
                              }}
                            >
                              x
                            </button>
                          </span>
                        </span>
                      </div>
                    )
                  })}
                </div>
                {p.BACData && (
                  <>
                    <LineChart data={p.BACData.BACData} />
                  </>
                )}
              </div>

              <div className='mt-5 sm:mt-6'>
                <button
                  type='button'
                  className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                  onClick={() => p.setOpen(false)}
                >
                  X
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
