/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, ReactNode, useState } from 'react'
import { Menu, Listbox, Popover, Transition, Disclosure } from '@headlessui/react'

import Image from 'next/image'

import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
  AcademicCapIcon
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ChevronDoubleDownIcon } from '@heroicons/react/solid'
import { pageRoutes } from '../../../lib/routes'

import { navKeys } from '@lib/types'

const navLinks: { href: string; label: string; navKey: navKeys; subLinks?: any[] }[] = [
  {
    href: pageRoutes.home,
    label: 'HOME',
    navKey: 'home'
  },
  {
    href: pageRoutes.about,
    label: 'ABOUT US',
    navKey: 'about'
  }
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function HeaderTW(props: { selectedNavKey: navKeys }) {
  const DesktopHref = (p: { name: string; href: string; navKey: navKeys }) => {
    return (
      <a
        href={p.href}
        className={`inline-flex items-center text-base font-medium border-greenie hover:text-gray-100 ${
          props.selectedNavKey === p.navKey ? 'text-greenie border-b-2' : 'text-white'
        }`}
      >
        {p.name}
      </a>
    )
  }

  const DesktopListPop = (p: { name: string; list: any[]; children?: ReactNode; navKey: navKeys }) => {
    return (
      <Popover className='relative'>
        {({ open }) => (
          <>
            <Popover.Button
              className={classNames(
                open
                  ? 'text-white'
                  : props.selectedNavKey === p.navKey
                  ? 'text-greenie border-b-2 rounded-b-none'
                  : 'text-white',
                'border-greenie md:px-2 h-full group rounded-md inline-flex items-center text-base font-medium hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-greenie'
              )}
            >
              <span>{p.name}</span>
              <ChevronDownIcon
                className={classNames(open ? 'text-gray-100' : 'text-white', 'ml-2 h-5 w-5 group-hover:text-gray-100')}
                aria-hidden='true'
              />
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel static className='absolute right-0 z-20 mt-3 px-2 w-screen max-w-md sm:px-0'>
                <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-greenie bg-opacity-80 overflow-hidden'>
                  <div className='relative grid gap-6 bg-mainBlue px-5 py-6 sm:gap-8 sm:p-8'>
                    {p.list.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`-m-3 p-2 flex items-center border-b-2 rounded-b-none rounded-lg bg-white bg-opacity-0 hover:bg-opacity-20`}
                      >
                        {item.icon && <item.icon className='flex-shrink-0 h-6 w-6 text-greenie' aria-hidden='true' />}
                        <div className='ml-4'>
                          <p className='text-lg font-medium text-white'>{item.name}</p>
                          {item.description && <p className='mt-1 text-sm text-gray-500'>{item.description}</p>}
                        </div>
                      </a>
                    ))}
                  </div>
                  {p.children ?? <></>}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  const NavAccordion = (p: { href: string; label: string; navKey: string; subLinks: any[] }) => {
    const { label, href, navKey, subLinks } = p
    return (
      <Disclosure>
        {({ open }) => (
          <>
            <div className='w-full flex justify-between border-b'>
              <a
                href={href}
                className={`flex-1 bg-white bg-opacity-0 hover:bg-opacity-25 pl-2 ${
                  navKey === props.selectedNavKey && 'text-greenie'
                }`}
              >
                {label}
              </a>
              <Disclosure.Button className='leading-none py-1 px-2 font-bold text-2xl rounded-sm bg-white bg-opacity-0 hover:bg-opacity-25'>
                <p>{open ? '-' : '+'}</p>
              </Disclosure.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter='transition-transform origin-top duration-100'
              enterFrom='transform scale-y-0'
              enterTo='transform scale-y-100'
              leave='transition-transform origin-top duration-100'
              leaveTo='transform scale-y-0'
            >
              <Disclosure.Panel className='pl-4 flex flex-col font-normal'>
                {subLinks.map(({ name, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className='bg-white bg-opacity-0 hover:bg-opacity-25 py-1 pl-1 border-b border-gray-300'
                  >
                    {name}
                  </a>
                ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    )
  }

  return (
    <>
      <Popover className='absolute inset-0 z-30 bg-gradient-to-b from-black h-48'>
        {({ open }) => (
          <>
            <div className='flex justify-center mx-auto px-4 sm:px-6 w-10/12'>
              <div className='flex w-full justify-between items-center sm:py-4 md:py-8 xl:py-12 lg:justify lg:space-x-4'>
                <div className='lg:hidden'>
                  <Popover.Button className='bg-transparent border border-bluie rounded-md p-2 inline-flex items-center justify-center text-bluie focus:outline-none focus:ring-2 focus:ring-inset focus:ring-greenie shadow-md'>
                    <span className='sr-only'>Open menu</span>
                    <MenuIcon className='h-6 w-6 text-green' aria-hidden='true' />
                  </Popover.Button>
                </div>

                {/* <div className='relative h-20 w-32 bg-transparent'>
                  <a href={pageRoutes.home}>
                    <Image src={LCLogo} alt='Life Corpus Logo' layout='fill' objectFit='contain' />
                  </a>
                </div> */}

                <Popover.Group
                  as='nav'
                  className='hidden lg:flex justify-between w-2/3 lg:items-stretch space-x-4 hover:text-lightBlue'
                >
                  {navLinks.map(({ label, navKey, href, subLinks }, i) => (
                    <React.Fragment key={i}>
                      {!subLinks ? (
                        <DesktopHref href={href} name={label} navKey={navKey} />
                      ) : (
                        <DesktopListPop name={label} navKey={navKey} list={subLinks} />
                      )}
                    </React.Fragment>
                  ))}
                </Popover.Group>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter='duration-200 ease-out'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='duration-100 ease-in'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              {/* Mobile */}
              <Popover.Panel
                focus
                static
                className='absolute top-0 inset-x-0 z-20 bg-mainBlue p-2 transition transform origin-top-right lg:hidden'
              >
                <div className='bg-bluie opacity-98 border-4 border-bluie rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-white'>
                  <div className='py-2 px-2 sm:px-8'>
                    <div className='-mr-2 flex justify-between items-center'>
                      <Popover.Button className='bg-transparent rounded-md p-2 inline-flex items-center justify-center text-white border-2 border-white shadow-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightBlue'>
                        <span className='sr-only'>Close menu</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                      <div className='relative h-40 w-40'>
                        <a href={pageRoutes.home}>
                          {/* <Image src={LCLogo2} alt='Life Corpus Logo' layout='fill' objectFit='contain' /> */}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className='mt-2 px-2 sm:px-8 py-4'>
                    <nav className='grid gap-y-2 text-white font-medium px-4'>
                      {navLinks.map(({ label, href, navKey, subLinks }, i) =>
                        !subLinks ? (
                          <a
                            key={i}
                            href={href}
                            className={`py-1 bg-white bg-opacity-0 hover:bg-opacity-25 pl-2 border-b ${
                              navKey === props.selectedNavKey && 'text-greenie'
                            }`}
                          >
                            {label}
                          </a>
                        ) : (
                          <NavAccordion key={i} href={href} label={label} subLinks={subLinks} navKey={navKey} />
                        )
                      )}
                    </nav>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}
