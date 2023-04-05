import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useAuthStore, useCategoryStore, useUiStore } from '../../hooks';
import { useProductStore } from '../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CategoryModalUpdate = () => {

  const { isProductModalOpen2, closeProductModal2 } = useUiStore();

  const { activeProduct, startSavingCategory, startLoadingProducts } = useCategoryStore();
  const { category } = useCategoryStore();

  const { user } = useAuthStore();

  const [formSubmittted, setFormSubmittted] = useState(false);

  const onCloseModal2 = () => {
    closeProductModal2()
  }

  const validationSchema = yup.object({
    // category: yup.string().required('The Category is required')
  })
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      category: ''
    },
    resolver: yupResolver(validationSchema)
  })
  const onSubmit = async ({ name }) => {
    await startSavingCategory({ name });
    closeProductModal2();
    setFormSubmittted(false)
    // startLoadingProducts()
  }

  return (
    <Modal
      isOpen={isProductModalOpen2}
      onRequestClose={onCloseModal2}
      style={customStyles}
      className='Modal'
      overlayClassName='Overlay'
      closeTimeoutMS={200}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-5 py-7">
          <div className=''>
            <div className='flex flex-col'>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" >New Category</label>
              <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="name" {...register('name')} />
              <label className="font-semibold text-sm text-gray-600 pb-1 block" >Category</label>
              {/* <select name="select" id="select" {...register('select')}>
                {
                  category.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))
                }
              </select> */}
            </div>
          </div>
          {
            (<p className="text-left text-red-700 mb-4">{errors.category?.message}</p>) && (<p className="text-left text-red-700 mb-4">{errors.name?.message}</p>)
          }
          <div className='w-full flex items-center justify-center'>
            <button type="button" className="transition max-w-[100px] duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block" onClick={handleSubmit(onSubmit)}>
              <span className="inline-block">Create</span>
              <i className="fa-solid fa-arrow-right w-4 h-4 inline-block"></i>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}