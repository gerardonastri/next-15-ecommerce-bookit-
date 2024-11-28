import ProductCard from '@/components/ProductCard';
import { searchProduct } from '@/lib/actions/product.action';
import React from 'react'

const Search = async ({
    searchParams,
  }: {
    searchParams: Promise<{ query?: string }>;
  }) => {
    const query = (await searchParams).query;
    const params = { search: query || null };

    const {documents: products} = await searchProduct(query)
    
        
  return (
    <section className='pt-16'>
      <div className='lg:max-w-[1200px] mx-auto'>
        <h2 className='text-center text-3xl font-bold'>Results for &apos;{query}&apos;</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-10 max-w-[1200px] mx-4 lg:mx-auto">
        {products.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </div>
      </div>
    </section>
  )
}

export default Search