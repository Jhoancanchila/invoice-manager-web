import { useEffect, useState, Suspense, lazy } from 'react'
import Error from './Error';
import Loading from './Loading';
import Head from './Head';
import Pagination from './Pagination';
import Button from './Button';

const Row = lazy(() => import('./Row'));

const Table = () => {

  const [ clients , setClients ] = useState([]);
  const [ products , setProducts ] = useState([]);
  const [ data , setData ] = useState([]);
  const [ dataCompleted , setDataCompleted ] = useState([]);
  const [ error, setError ] = useState(null);

  const itemsHeadTable = ["# Invoice","Client", "Date", "Subtotal", "Discount", "Total", "Products"];
  
  const fetchInvoices = () => {
    fetch("http://localhost:3001/invoice")
    .then(response => response.json())
    .then(res => {
      setDataCompleted(res.data);
      const currentItems = res.data.slice(0, 10);
      setData(currentItems);
    })
    .catch(error => setError(error))  
  };

  const fetchClient = async () => {
    try {
      const response = await fetch(`http://localhost:3001/client`);
      const data = await response.json();
      setClients(data.data);
    } catch (error) {
      setError(error);
      throw error;
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/product`);
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchClient();
    fetchInvoices();
    fetchProducts();
  },[]);

  if( error ) return < Error error={ error }/>

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Button
        dataClients={clients}
        dataProducts={products}
      />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {
            itemsHeadTable?.map(item => <Head key={item} item={item}/>)
          }                     
        </tr>
      </thead>
        <tbody>
          {
            data?.map(invoice => {
              const client = clients.find(cli => cli.id === invoice.client_id)?.contact_name;
              const newInvoice = {...invoice, client }
              return (
                <Suspense fallback={<Loading/>}>
                  <Row key={invoice.id} {...newInvoice }/>
                </Suspense>
              )
            })
          }
        </tbody>
      </table>
      <Pagination totalData={dataCompleted} setData={setData}/>
    </div>
  )
}

export default Table

