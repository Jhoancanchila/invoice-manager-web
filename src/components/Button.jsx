import React, { Fragment, useState } from 'react'
import Modal from './Modal'

const Button = () => {
  const [ openModal, setOpenModal ] = useState(false);

  const addNewInvoice = () => {
    setOpenModal(true);
  }
  return (
    <Fragment>
      <button
        onClick={addNewInvoice}
        className="ml-4 my-4 inline-block rounded bg-gray-700 px-5 py-3 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none"
      >
        + Invoice
      </button>
      <Modal 
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Add new invoice
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          User details
        </p>

        <form action="#" className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              name="first_name"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              name="last_name"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              name="password"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>

            <input
              type="password"
              id="PasswordConfirmation"
              name="password_confirmation"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          

          

          
        </form>
      </div>
    </main>
  </div>
</section>
      </Modal>
    </Fragment>
  )
}

export default Button