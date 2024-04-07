import { createPortal } from 'react-dom';

const Modal = ({isOpen,onClose,children}) => {
  if(!isOpen) return;
  return createPortal(
    <div onClick={() =>onClose()} className='w-full h-full bg-gray-500 backdrop-filter bg-opacity-30 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30'>
      <div className='absolute bg-white px-4 py-4 rounded-3xl min-w-[60%]'>
        {children}
      </div>
    </div>,document.getElementById("modal")
  )
}

export default Modal