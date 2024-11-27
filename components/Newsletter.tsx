import React from 'react'
import { Button } from './ui/button'

const Newsletter = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-8">Subscribe to our newsletter for the latest releases and exclusive offers.</p>
        <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md text-background w-full"
            required
          />
          <Button variant="secondary">Subscribe</Button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter