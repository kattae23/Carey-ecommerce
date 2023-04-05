

import React from 'react'
import { useEffect } from 'react';
import { useCategoryStore, useCheckoutStore } from '../../hooks';
import { useProductStore } from '../../hooks/useProductStore';
import { Footer, Navbar } from '../../ui/components'
import { Ads, Feature, Hero, Products } from '../components'

export const HomePage = () => {


  const { products, startLoadingProducts } = useProductStore();
  const { category, startLoadingCategory } = useCategoryStore();
  const { startLoadingCheckouts } = useCheckoutStore();


  useEffect(() => {
    startLoadingProducts({ limit: 0 })
    startLoadingCategory()
    startLoadingCheckouts()
  }, []);


  return (

    <>
      <Navbar />
      <Hero />
      <Products />
      <Ads />
      <Feature />
      <Footer />
    </>
  )
}
