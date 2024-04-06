import React from 'react'

const Row = ( props ) => {

  const { id,client,created_date, subtotal, discount, total } = props;

  //formatear fecha
  const formatDate = ( date, locale, options ) => new Intl.DateTimeFormat(locale,options).format(date);

  const getProducts = async () => {
    
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {id}
      </th>
      <td className="px-6 py-4">
        {client}
      </td>
      <td className="px-6 py-4">
        {formatDate(new Date(created_date), "en", { dateStyle: "long" })}
      </td>
      <td className="px-6 py-4">
        {subtotal}
      </td>
      <td className="px-6 py-4">
        {discount}
      </td>
      <td className="px-6 py-4">
        {total}
      </td>
      <td className="px-6 py-4">
        <span /* onClick={getProducts} */ className='cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" /></svg>
        </span>
      </td>
    </tr>
  )
}

export default Row