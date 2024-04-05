import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundComponent = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="mt-4 text-gray-500">Página no encontrada.</p>

        <Link
          to="/"
          className="mt-6 inline-block rounded bg-indigo-400 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Ir al Inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFoundComponent