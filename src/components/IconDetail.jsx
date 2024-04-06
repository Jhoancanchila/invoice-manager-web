import React, { Fragment, useEffect, useState } from 'react'
import Modal from './Modal';
import Head from './Head';
import Error from './Error';

const IconDetail = ({ children, invoiceId, endpointOne =null, endpointTwo=null }) => {
  const [ openModal, setOpenModal ] = useState(false);
  const [ dataProductInvoice, setDataProductInvoice ] = useState([]);
  const [ dataProducts, setDataProduct ] = useState([]);
  const [ error, setError ] = useState(null);

  const itemsHeadTable = ["Product ID","Quantity", "Product Name" ];

  const getProducts = async () => {
    setOpenModal(true);
  };

  const fetchDataOne = async () => {
    try {
      const response = await fetch(endpointOne);
      const data = await response.json();
      setDataProductInvoice(data.data);
    } catch (error) {
      setError(error);
    }
  };
  const fetchDataTwo = async () => {
    try {
      const response = await fetch(endpointTwo);
      const data = await response.json();
      setDataProduct(data.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if(endpointOne) fetchDataOne();
    
    if(endpointTwo) fetchDataTwo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Fragment>
      <div onClick={getProducts}>{children}</div>
      <Modal isOpen={openModal} onClose={() =>setOpenModal(false)}>
        <h1 className='mx-auto text-center font-bold '>Invoice # {invoiceId}</h1>
        {
          !error ?
          <table className='mx-auto text-center'>
            <thead>
              <tr>
                {
                  itemsHeadTable?.map(item => <Head key={item} item={item}/>)
                }                     
              </tr>
            </thead>
              <tbody>
                {
                  dataProductInvoice?.map(product => {
                    const nameProduct = dataProducts.find(prod => prod.id === product.product_id)?.name;
                    return (
                      <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                      
                        <td className="px-6 py-4">
                          {product.product_id}
                        </td>
                        <td className="px-6 py-4">
                          {product.quantity}
                        </td>
                        <td className="px-6 py-4">
                          {nameProduct}
                        </td>                      
                      </tr>
                    )
                  })
                }
              </tbody>
          </table>
          :
          <Error error={error}/>
        }
      </Modal>
    </Fragment>
  )
}

export default IconDetail