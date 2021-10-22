/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { PlusSmIcon } from '@heroicons/react/solid'
import { ISelectDrinks } from '.'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ListHeader(p: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                <div className='-ml-2 mr-2 flex items-center md:hidden'></div>
              </div>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <button
                    type='button'
                    className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500'
                    onClick={() => {
                      p.setOpen(true)
                    }}
                  >
                    <span>Show Selection</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
