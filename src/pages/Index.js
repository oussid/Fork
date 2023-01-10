import React from 'react'
import Filter from '../features/recipe/components/Filter';
import Hero from '../features/recipe/components/Hero';
import Result from '../features/recipe/components/Result';

export default function Index() {
  return (
    <div>
      <Hero />
      <Filter></Filter> 
      <Result/>
    </div>
  )
}
