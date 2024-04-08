import { Formik, Form, Field, ErrorMessage } from "formik";

import logo from "../assets/logo.webp";

const SignIn = ({ HandleSignin }) => {
  return (

    <section section className="bg-white" >
      <div className="lg:grid h-screen lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-80 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="logo"
            src={logo}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12 mb-60">

            <p className="mt-4 leading-relaxed text-blue-600">
            We are an international IT outsourcing firm, focused on custom software development. We align our efforts and an innovative methodologies in all phases of the life cycle of scalable systems.

            Our commitment to excellence, technical expertise and location allows us to present innovative and bright services solution for worldwide customers.
            </p>
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-12 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl min-w-72">
            <div className="relative mt-8 block lg:hidden">
              <p className="mt-4 leading-relaxed text-gray-500">
              We are an international IT outsourcing firm, focused on custom software development. We align our efforts and an innovative methodologies in all phases of the life cycle of scalable systems.

              Our commitment to excellence, technical expertise and location allows us to present innovative and bright services solution for worldwide customers.
              </p>
            </div>

            <Formik
              initialValues={{ email: "", password: "" }}
              validate={values => {
                let errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                } else if (
                  !values.password
                ) {
                  errors.password = 'Required';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                HandleSignin(values.email,values.password)
              }}
            >
              {
                (
                  {
                    errors
                  }
                ) => (
                  <Form className="mt-8 gap-6">
                    <div className="w-full h-24 mt-2">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
                      <Field
                        type="text"
                        name="email"
                        className={`mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                        placeholder="account@email.com"
                      />
                      <ErrorMessage name="email" component={() => (<span className='text-red-500 font-thin'>{errors.email}</span>)} />
                    </div>
                    <div className="w-full h-24 mt-2">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Password</label>
                      <Field
                        type="password"
                        name="password"
                        className={`mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                      />
                      <ErrorMessage name="password" component={() => (<span className='text-red-500 font-thin'>{errors.password}</span>)} />
                    </div>
                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        type='submit'
                        className="mt-8 inline-block bg-gray-700 hover:bg-gray-500 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide "
                      >
                        Iniciar sesión
                      </button>
                    </div>
                  </Form>
                )
              }
            </Formik>
          </div>
        </main>
      </div>
    </section>
  )
}

export default SignIn