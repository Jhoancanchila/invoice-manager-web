import { useState } from 'react'

const Pagination = ({ totalData,setData }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(totalData.length / itemsPerPage);

  const arrayTotalPage = () => {
    let array = []; 

    for (let i = 1; i <= totalPages; i++) {
      array.push(i);
    }
    return array;
  };

  const newArrayTotalPage = arrayTotalPage();

  //paginador
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = totalData.slice(indexOfFirstItem, indexOfLastItem);
    setData(currentItems);
  };

  return (
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage * itemsPerPage) - (itemsPerPage - 1)} - {currentPage * itemsPerPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalData?.length}</span></span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`${currentPage === 1 ? 'opacity-[0.5]' : ''} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
            Previous
          </button>
        </li>
        {
          newArrayTotalPage.map(value =>
            <li key={value}>
              <button onClick={() => handlePageChange(value)} className={`${currentPage === value ? 'bg-gray-500 text-white hover:text-white hover:bg-gray-500' : ''} flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
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
  )
}

export default Pagination