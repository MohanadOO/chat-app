import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AddIcon } from '../Icons'
import { RoomsComboBox } from '../ComboBox/RoomsComboBox'

export function JoinRoomModal() {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className='border-purple-200 border-b-2 dark:border-white/50 mb-2'>
        <button
          type='button'
          onClick={openModal}
          className='flex items-center gap-3 rounded-lg px-3 w-full py-2 mb-1 text-sm hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:text-white hover:bg-purple-500 transition-colors'
        >
          <AddIcon />
          Join Room
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25 ' />
          </Transition.Child>

          <div className='fixed inset-0'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-auto rounded-2xl bg-white py-14 px-10 text-left align-middle shadow-xl transition-all dark:bg-purple-800 text-black dark:text-white'>
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-semibold leading-6 text-gray-700 dark:text-white mb-5'
                  >
                    Room Name
                  </Dialog.Title>
                  <RoomsComboBox closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
