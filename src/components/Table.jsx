import { useEffect, useState } from 'react'

const Table = () => {

  const [ clients , setClients ] = useState([]);
  const [ data , setData ] = useState([]);
  const [ dataCompleted , setDataCompleted ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(dataCompleted.length / itemsPerPage);
  
  const fetchInvoices = () => {
    fetch("http://localhost:3001/invoice")
    .then(response => response.json())
    .then(res => {
      setDataCompleted(res.data);
      const currentItems = res.data.slice(0, 10);
      setData(currentItems);
    })
    .catch(error => new Error(error))  
  };

  const fetchClient = async () => {
    try {
      const response = await fetch(`http://localhost:3001/client`);
      const data = await response.json();
      setClients(data.data);
    } catch (error) {
      throw error;
    }
  };

  const getProducts = async () => {
    
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataCompleted.slice(indexOfFirstItem, indexOfLastItem);
    setData(currentItems);
  };

  const arrayTotalPage = () => {
    let array = []; 

    for (let i = 1; i <= totalPages; i++) {
      array.push(i);
    }
    return array;
  };

  const newArrayTotalPage = arrayTotalPage();

  useEffect(() => {
    fetchClient();
    fetchInvoices();
  },[]);


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
                # Invoice
            </th>
            <th scope="col" className="px-6 py-3">
                Client
            </th>
            <th scope="col" className="px-6 py-3">
                Date
            </th>
            <th scope="col" className="px-6 py-3">
                Subtotal
            </th>
            <th scope="col" className="px-6 py-3">
                Discount
            </th>
            <th scope="col" className="px-6 py-3">
                Total
            </th>
            <th scope="col" className="px-6 py-3">
                Products
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map(invoice => 
              <tr key={invoice.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {invoice.id}
                </th>
                <td className="px-6 py-4">
                  {clients.find(cli => cli.id === invoice.client_id)?.contact_name}
                </td>
                <td className="px-6 py-4">
                  {invoice.created_date}
                </td>
                <td className="px-6 py-4">
                  {invoice.subtotal}
                </td>
                <td className="px-6 py-4">
                  {invoice.discount}
                </td>
                <td className="px-6 py-4">
                  {invoice.total}
                </td>
                <td className="px-6 py-4">
                  <span onClick={getProducts} className='cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z"/></svg>
                  </span>
                </td>
              </tr>            
            )
          }
        </tbody>
      </table>
      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage * itemsPerPage) - (itemsPerPage - 1)} - {currentPage * itemsPerPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{dataCompleted?.length}</span></span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`${currentPage === 1 ? 'opacity-[0.5]' : ''} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
              Previous
            </button>
          </li>
          {
            newArrayTotalPage.map(value =>
              <li key={value}>
                <button onClick={() => handlePageChange(value)} className={`${currentPage === value ? 'bg-gray-500 text-white hover:text-white hover:bg-gray-500' : ''} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                  {value}
                </button>
              </li>
            )
          }
          <li>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`${currentPage === totalPages ? 'opacity-[0.5]' : ''} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Table

