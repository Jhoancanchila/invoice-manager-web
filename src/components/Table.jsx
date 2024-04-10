import { useEffect, useState, Suspense, lazy } from 'react'
import Error from './Error';
import Loading from './Loading';
import Head from './Head';
import Pagination from './Pagination';
import ModalNewInvoice from './ModalNewInvoice';
import { useAuth } from '../context/auth';
import { Cookies } from "react-cookie";

const Row = lazy(() => import('./Row'));

const Table = () => {

  const cookies = new Cookies();

  const [ clients , setClients ] = useState([]);
  const [ products , setProducts ] = useState([]);
  const [ data , setData ] = useState([]);
  const [ dataCompleted , setDataCompleted ] = useState([]);
  const [ error, setError ] = useState(null);

  const { user } = useAuth();

  const token = cookies.get("token")

  const itemsHeadTable = ["# Invoice","Client", "Date", "Subtotal", "Discount", "Total", "Products", "Voucher"];

  
  const validateSales = ( client_id ) => {

    let discountMax;
    const yearsOldClient = clients.find(cli => cli.id === Number(client_id))?.years_antiquity;
    const invoicesByClients = dataCompleted.filter(invoice => invoice.client_id === client_id);
    const saleLessTwoHundred = invoicesByClients.some(inv => inv.total < 200);
    const saleTwoThousandMajor = invoicesByClients.some(inv => inv.total > 2000);
    const salesLowerThousand = invoicesByClients.some(inv => inv.total < 1000);

    if(saleLessTwoHundred){
      discountMax = 0;
      return  discountMax;
    }else if(saleTwoThousandMajor){
      discountMax = 45;
      return discountMax;
    }else if(salesLowerThousand){
      discountMax = 10;
      return discountMax;
    }else if(yearsOldClient >= 3){
      discountMax = 30;
      return discountMax;
    }
    else{
      discountMax = 0;
      return  discountMax;
    }
    
  };

  const fetchInvoices = () => {
    let url;
    if(user.role_id === 1){
      url = "http://localhost:3001/invoice";
    }else{
      url = `http://localhost:3001/invoice/${user.client_id}`
    }
    fetch(url,{
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(res => {
      setDataCompleted(res.data);
      const currentItems = res.data.slice(0, 10);
      setData(currentItems);
    })
    .catch(error => {
      setError(error)
      if (error?.response?.status === 401) {
        cookies.remove("token");
        cookies.remove("user");
        document.location.href="/";
      }
    })  
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
    if(user.role_id === 1){
      fetchProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if( error ) return < Error error={ error }/>

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

      {
        user.role_id === 1 &&
        <ModalNewInvoice
          dataClients={clients}
          dataProducts={products}
          functionValidateSales={validateSales}
        />
      }
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
              const client = clients.find(cli => cli.id === invoice.client_id)?.name;
              const newInvoice = {...invoice, client }
              return (
                <Suspense fallback={<Loading cells = {itemsHeadTable}/>}>
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

