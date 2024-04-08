import React, { Fragment, useEffect, useState } from 'react'
import Modal from './Modal'

import { Formik, Form, Field, ErrorMessage } from "formik";
import Head from './Head';

const Button = ({ dataClients, dataProducts }) => {
  const [openModal, setOpenModal] = useState(false);
  const [productsNewInvoice, setProductsNewInvoice] = useState([]);
  const [error, setError] = useState(null);

  const itemsHeadTable = ["Product ID","Quantity", "Product Name" ];

  const initialStateForm = {   
    date: new Date(), 
    client: dataClients[0]?.id, 
    discount: '', 
    product:dataProducts[0]?.id
  };

  const addNewInvoice = () => {
    setOpenModal(true);
  }
  const handleCancel = () => {
    setOpenModal(false);
  }
  const addProductToInvoice = ( productId ) => {
    const parseIdProduct = Number(productId);
    
    const product = dataProducts.find(item => item.id === parseIdProduct);
    let copyProducts = [...productsNewInvoice];
    
    if(copyProducts.length > 0){
      const productExist = copyProducts.find(pro => pro.id === parseIdProduct);
      if(productExist){
        let newProducts = copyProducts.map(pro => {
          if(pro.id === parseIdProduct){

            return{
              ...pro,
              quantity:pro.quantity + 1
            }
          }else{
            return pro;
          }
        });
        copyProducts = newProducts;
      }else{
        copyProducts.push({...product,quantity:1})
      }

    }else{
      copyProducts.push({...product,quantity:1})
    }
     
    setProductsNewInvoice(copyProducts);
  };

  const totalWithoutDiscount = () => {
    const total = productsNewInvoice.reduce((acumulador, producto) => {
      return acumulador + (producto.price * producto.quantity);
     }, 0);
    return total;
  };

  const subTotal = (total,discount) => {
    const subtotal = total * (1 - discount/100);
    return subtotal;
  };

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); 
    const day = ("0" + date.getDate()).slice(-2); 
    return `${year}-${month}-${day}`;
  };

  const AddInvoice = ( object, resetForm ) => {
    const total = totalWithoutDiscount();
    const subtotal = subTotal(total, object.discount);

    const body = {
      client: Number(object.client),
      date: formatDateToYYYYMMDD(object.date),
      subtotal: subtotal,
      total: total,
      discount: Number(object.discount),
      products: productsNewInvoice
    }

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    fetch('http://localhost:3001/invoice', requestOptions)
      .then(response => response.json())
      .then(()=>resetForm())
      .catch((error)=>setError(error))
    } catch (error) {
      throw error;
    }
  };

  
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
        onClose={() => null}
      > 
        <div className='lg:flex lg:flex-row gap-4 p-12'>
          <section class="col-span-8">
            <section>
              <div className="max-w-xl lg:max-w-3xl">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Add new invoice
                </h1>

                <p className="mt-4 leading-relaxed text-gray-900">
                  User details
                </p>
                <Formik
                  initialValues={initialStateForm}
                  validate={values => {
                    let errors = {};
                    if (!values.discount) {
                      errors.discount = 'This field is required';
                    }else if(productsNewInvoice.length === 0){
                      errors.product = 'You have not added products yet!';
                    }
                    else{
                      const yearsOldClient = dataClients.find(cli => cli.id === Number(values.client))?.years_antiquity;
                      if(yearsOldClient > 3 && Number(values.discount) > 30){
                        errors.discount = 'Up to 30% admitted!';
                      }
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting,resetForm }) => {
                    AddInvoice(values,resetForm);
                    
                  }}
                >
                  {
                    (
                      {
                        errors, values
                      }
                    ) => (
                      <Form className="mt-8 gap-6 lg:grid lg:grid-rows-1">
                        <section className='lg:grid lg:grid-rows-2'>
                          <div className="w-full h-24">
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Date</label>
                            
                            <input
                              type="date"
                              name="date"
                              className={`mt-1 col-span-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                              autocomplete="off"
                            />

                          </div>
                          <div>
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Client</label>
                            <Field
                              className="mt-1 col-span-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                              name="client"
                              id="client"
                              as="select"
                              autocomplete="off"
                            >
                              {
                                dataClients.map(cli => 
                                  <option key={cli.id} value={cli.id}>{ cli.name }</option>
                                )
                              }
                            

                            </Field>
                            
                          </div>
                        </section>
                        <section className='lg:grid lg:grid-rows-2'>

                          <div className="w-full h-24 mt-2">
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Discount</label>
                            <Field
                              autoComplete="off"
                              type="text"
                              name="discount"
                              pattern="[0-9]{0,13}"
                              className={`mt-1 col-span-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                              placeholder="0%"
                            />
                            <ErrorMessage name="discount" component={()=>(<span className='text-red-500 font-thin'>{errors.discount}</span>)}/>
                          </div>
                          
                          <div className="h-24">
                            <div className="flex  w-full mt-2 items-end">
                              <div>
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Product</label>
                                <Field
                                  className="mt-1 col-span-1 h-12 w-40 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                  name="product"
                                  id="product"
                                  as="select"
                                  autocomplete="off"
                                >
                                  {
                                    dataProducts.map(pro => 
                                      <option key={pro.id} value={pro.id}>{ pro.name }</option>
                                    )
                                  }
                                </Field>
                              </div>
                              <div className="h-12 ml-4 py-4 px-4 text-black bg-gray-400 flex items-center rounded-lg">
                                1
                              </div>
                                <button type='button' onClick={() => addProductToInvoice(values.product)} className="h-12 ml-4 py-4 px-4 text-white bg-gray-700 hover:bg-gray-500 flex items-center rounded-lg">
                                  +
                                </button>
                            </div>

                          </div>
                            <ErrorMessage name="product" component={()=>(<span className='text-red-500 font-thin'>{errors.product}</span>)}/>
                        </section>

                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                          <button
                            type='submit'
                            className="inline-block bg-gray-700 hover:bg-gray-500 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide "
                          >
                            Add
                          </button>
                          <button
                            type='button'
                            onClick ={handleCancel}
                            className="ml-4 inline-block bg-gray-500 hover:bg-gray-700 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide "
                          >
                            Cancel
                          </button>
                        </div>
                      </Form>
                    )
                  }
                </Formik>

              </div>
            </section>
          </section>
          <section class="col-span-4 overflow-y-scroll mt-12 lg:mt-0 max-h-60">
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
                    productsNewInvoice?.map(product => {
                      return (
                        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                      
                          <td className="px-6 py-4">
                            {product.id}
                          </td>
                          <td className="px-6 py-4">
                            {product.quantity}
                          </td>
                          <td className="px-6 py-4">
                            {product.name}
                          </td>                      
                        </tr>
                      )
                    })
                  }
                </tbody>
            </table>
          </section>
        </div>
      </Modal>
    </Fragment>
  )
}

export default Button