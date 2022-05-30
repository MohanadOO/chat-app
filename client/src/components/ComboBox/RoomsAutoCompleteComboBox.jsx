import { Fragment, useEffect, useState, useContext } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { getAllRooms, JoinRoom } from '../../Firebase'
import { RoomContext } from '../../Context/RoomContext'
import { ChatContext } from '../../Context/ChatContext'

export function RoomsAutoCompleteComboBox() {
  const { setMatchedRooms, setRoom } = useContext(RoomContext)
  const { currentUser } = useContext(ChatContext)
  const [rooms, setRooms] = useState([])
  const [selected, setSelected] = useState(rooms[0]?.data)
  const [query, setQuery] = useState('')

  useEffect(() => {
    //Get All the rooms from the rooms collection
    getAllRooms().then((rooms) => {
      //Show only the rooms that the user is not joined to
      const newRooms = []
      rooms.forEach((room) => {
        room.data.users.forEach((user) => {
          if (user !== currentUser.uid) {
            newRooms.push(room)
          }
        })
      })
      setRooms(newRooms)
    })
  }, [])

  function EnterRoom() {
    JoinRoom(selected.data.name, selected.id, currentUser.uid).then(
      (roomInfo) => {
        setRoom(roomInfo)
      }
    )
    setMatchedRooms((prevRooms) => {
      return [...prevRooms, { id: selected.id, ...selected.data }]
    })
  }

  const filteredRooms =
    query === ''
      ? rooms
      : rooms.filter((person) =>
          person?.data.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className='w-full'>
      <Combobox value={selected} onChange={setSelected}>
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-auto rounded-lg bg-white shadow-md'>
            <Combobox.Input
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
              displayValue={(person) => person?.data.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              {/* <SelectorIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              /> */}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-32 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {filteredRooms?.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  Nothing found.
                </div>
              ) : (
                filteredRooms?.map((room) => (
                  <Combobox.Option
                    key={room.data.name + room.data.roomAvatar}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={room}
                  >
                    {({ selected, active }) => (
                      <div className='flex gap-5'>
                        <img
                          className='w-5'
                          src={room.data.roomAvatar}
                          alt={`${room.data.name}_avatar`}
                        />
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {room.data.name}
                        </span>
                        <span className='ml-auto text-black/50 font-light'>
                          Users: {room.data.users.length}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            {/* <CheckIcon className='h-5 w-5' aria-hidden='true' /> */}
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
          <div onClick={EnterRoom} className='mt-3 text-center'>
            <button
              type='submit'
              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            >
              Join Room
            </button>
          </div>
        </div>
      </Combobox>
    </div>
  )
}
