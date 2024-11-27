import React from 'react'

const Search = async ({
    searchParams,
  }: {
    searchParams: Promise<{ query?: string }>;
  }) => {
    const query = (await searchParams).query;
    const params = { search: query || null };

        
  return (
    <section className='pt-16'>
      <div className='lg:max-w-[1200px] mx-auto'>
        <h2 className='text-center text-3xl font-bold'>Results for &apos;{query}&apos;</h2>
      </div>
    </section>
  )
}

export default Search