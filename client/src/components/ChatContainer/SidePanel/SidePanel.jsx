import { CreateRoomModal } from '../../Modals/CreateRoomModal'
import { DiscloseRooms } from './DiscloseRooms'
import { DiscloseUsers } from './DiscloseUsers'

import { motion } from 'framer-motion'
import { fadeInLeftChild, fadeInParent } from '../../../Variants'

function SidePanel() {
  return (
    <motion.div
      variants={fadeInLeftChild}
      className='scrollbar-thumb-transparent scrollbar-track-transparent overflow-y-auto scrollbar-thin hover:scrollbar-thumb-purple-700 active:scrollbar-thumb-purple-400 hover:scrollbar-track-slate-100 hover:dark:scrollbar-track-zinc-900 hover:dark:scrollbar-thumb-purple-900 scroll-smooth md:w-64  px-2 w-full'
    >
      <div className='my-4 px-7 '>
        <CreateRoomModal />
        <DiscloseRooms />
        <DiscloseUsers />
      </div>
    </motion.div>
  )
}

export default SidePanel
