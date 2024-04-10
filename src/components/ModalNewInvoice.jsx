import React, { Fragment, useEffect, useState } from 'react';

import Modal from './Modal';
import Head from './Head';

import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from 'sweetalert2';


const ModalNewInvoice = ({ 
  dataClients, 
  dataProducts, 
  functionValidateSales, 
  dataInvoices, 
  functionDataCompleted, 
  functionDataShowCurrent, 
  functionCurrentPage 
}) => {

  const [openModal, setOpenModal] = useState(false);
  const [productsNewInvoice, setProductsNewInvoice] = useState([]);
  const [disableInputDiscount, setDisableInputDiscount] = useState(functionValidateSales(dataClients[0]?.id));
  const [currentClientSelected, setCurrentClientSelected] = useState(dataClients[0]?.id);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedImg, setUploadedImg] = useState('');
  const [initialStateForm, setInitialStateForm] = useState(
    {
      date: new Date(),
      client: dataClients[0]?.id,
      discount: 0,
      product: dataProducts[0]?.id
    }
  );

  const itemsHeadTable = ["Product ID", "Quantity", "Product Name"];


  const handleImageCapture = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUploadedImg(file)
      let file_type = e.target.files[0]?.type.split("/");
      if (file_type[0] === "image") {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleUploadImage = async (idInvoice) => {

    let voucher = new FormData();
    voucher.append("image", uploadedImg);
    voucher.append("idInvoice", idInvoice);

    await fetch('http://localhost:3001/upload-image', {
      method: 'POST',
      body: voucher
    })
      .then(res => {
        if (res.ok) {
          setUploadedImg("");
          setPreviewUrl("");
          return res.json();
        } else {
          throw new Error('Image upload failed!');
        }
      })
      .catch(error => {
        throw error;
      });

  };

  const addNewInvoice = () => {
    setInitialStateForm(
      {
        date: new Date(),
        client: dataClients[0]?.id,
        discount: 0,
        product: dataProducts[0]?.id
      }
    );
    setOpenModal(true);
  }
  const handleCancel = () => {
    setUploadedImg("");
    setPreviewUrl("");
    setProductsNewInvoice([]);
    setOpenModal(false);
  }
  const addProductToInvoice = (productId) => {
    const parseIdProduct = Number(productId);

    const product = dataProducts.find(item => item.id === parseIdProduct);
    let copyProducts = [...productsNewInvoice];

    if (copyProducts.length > 0) {
      const productExist = copyProducts.find(pro => pro.id === parseIdProduct);
      if (productExist) {
        let newProducts = copyProducts.map(pro => {
          if (pro.id === parseIdProduct) {

            return {
              ...pro,
              quantity: pro.quantity + 1
            }
          } else {
            return pro;
          }
        });
        copyProducts = newProducts;
      } else {
        copyProducts.push({ ...product, quantity: 1 })
      }

    } else {
      copyProducts.push({ ...product, quantity: 1 })
    }

    setProductsNewInvoice(copyProducts);
  };

  const totalWithoutDiscount = () => {
    const total = productsNewInvoice.reduce((acumulador, producto) => {
      return acumulador + (producto.price * producto.quantity);
    }, 0);
    return total;
  };

  const subTotal = (total, discount) => {
    const subtotal = total * (1 - discount / 100);
    return subtotal;
  };

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const pageChange = ( dataCompleted ) => {
    const totalPages = Math.ceil(dataCompleted.length / 10);
    functionDataCompleted(dataCompleted);
    functionCurrentPage(totalPages);
    const indexOfLastItem = totalPages * 10;
    const indexOfFirstItem = indexOfLastItem - 10;
    const currentItems = dataCompleted.slice(indexOfFirstItem, indexOfLastItem);
    functionDataShowCurrent(currentItems);
  };

  const AddInvoice = async (object, resetForm) => {
    if (productsNewInvoice.length === 0) {
      Swal.fire("You have not added products yet!")
      return;
    };
    const discount = disableInputDiscount === 0 ? 0 : Number(object.discount);
    const subtotal = totalWithoutDiscount();
    const total = subTotal(subtotal, discount);

    const body = {
      client: Number(object.client),
      date: formatDateToYYYYMMDD(object.date),
      subtotal: subtotal,
      total: total,
      discount: discount,
      products: productsNewInvoice
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    try {
      const response = await fetch('http://localhost:3001/invoice', requestOptions);
      const data = await response.json();
      const newInvoice = data.data;
      if (response.ok) {
        const newDataInvoices = [...dataInvoices,newInvoice[0]];
        
        pageChange(newDataInvoices);
        setCurrentClientSelected(dataClients[0]?.id);
        setProductsNewInvoice([]);
        resetForm();
        Swal.fire({
          title: "Successfully saved!",
          icon: "success"
        });

        if (uploadedImg) {
          await handleUploadImage(newInvoice[0]?.id);
        }

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong, try again!",
        });
      }
    } catch (error) {
      throw error;
    };
  };
  useEffect(() => {
    const clientId = !currentClientSelected ? dataClients[0]?.id : currentClientSelected;
    const value = functionValidateSales(clientId);
    setDisableInputDiscount(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClientSelected]);

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
        <div className='lg:flex lg:flex-row gap-4 px-8 lg:p-12'>
          <section className="col-span-8">
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
                    setCurrentClientSelected(Number(values.client));
                    let errors = {};
                    if (values.discount > disableInputDiscount) {
                      if (disableInputDiscount === 0) setDisableInputDiscount(0);
                      else errors.discount = `Up to ${disableInputDiscount}% admitted!`;
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    AddInvoice(values, resetForm);

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
                          <div className="w-full h-24 flex flex-col justify-start">
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Date</label>

                            <input
                              type="date"
                              name="date"
                              className={`mt-1 col-span-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                            />
                          </div>
                          <div className='flex flex-col justify-center'>
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Client</label>
                            <Field
                              className="mt-1 col-span-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                              name="client"
                              id="client"
                              as="select"

                            >
                              {
                                dataClients.map(cli =>
                                  <option key={cli.id} value={cli.id}>{cli.name}</option>
                                )
                              }


                            </Field>

                          </div>
                        </section>
                        <section className='lg:grid lg:grid-rows-2'>

                          <div className="w-full h-24 flex flex-col justify-start">
                            <label htmlFor="Email" className={`${disableInputDiscount === 0 ? 'text-opacity-5' : ''} block text-sm font-medium text-gray-700`}>Discount</label>
                            <Field
                              type="number"
                              step="0.1"
                              min="0" 
                              max="100"
                              name="discount"
                              className={`mt-1 col-span-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                              placeholder={disableInputDiscount === 0 ? "" : "0%"}
                              disabled={disableInputDiscount === 0}
                            />
                            <ErrorMessage name="discount" component={() => (<span className='text-red-500 font-thin'>{errors.discount}</span>)} />
                          </div>

                          <div className="h-24 flex flex-col justify-center">
                            <div className="flex  w-full mt-2 items-end">
                              <div>
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Product</label>
                                <Field
                                  className="mt-1 col-span-1 h-12 w-40 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                  name="product"
                                  id="product"
                                  as="select"

                                >
                                  {
                                    dataProducts.map(pro =>
                                      <option key={pro.id} value={pro.id}>{pro.name}</option>
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
                          <ErrorMessage name="product" component={() => (<span className='text-red-500 font-thin'>{errors.product}</span>)} />
                        </section>

                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mt-4 lg:mt-0">
                          <button
                            type='submit'
                            className="inline-block bg-gray-700 hover:bg-gray-500 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide "
                          >
                            Add
                          </button>
                          <button
                            type='button'
                            onClick={handleCancel}
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
          <section className="col-span-4 mt-8 lg:mt-0 grid lg:block">
            <section>
              {
                previewUrl &&
                (
                  <div className='flex items-center justify-center min-h-36'>
                    <span>
                      <img width={200} height={200} src={uploadedImg ? previewUrl : "https://placehold.co/600x400/png"} alt="capture" />
                    </span>
                  </div>
                )
              }
              <div className="flex items-center justify-center ">
                <input type="file" id="upload-image" name="upload-image" className="hidden" accept="image/*" capture="camera" onChange={handleImageCapture} />
                <label htmlFor="upload-image" className="cursor-pointer bg-gray-700 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                  <span>Upload image</span>
                </label>
              </div>
            </section>
            <section className='overflow-y-scroll mt-2 lg:mt-0 max-h-40'>
              <table className='mx-auto text-center'>
                <thead>
                  <tr>
                    {
                      itemsHeadTable?.map(item => <Head key={item} item={item} />)
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
          </section>
        </div>
      </Modal>
    </Fragment>
  )
}

export default ModalNewInvoice