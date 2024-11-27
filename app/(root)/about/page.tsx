'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation, Variants } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Heart, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

function CountUp({ end, duration = 2 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const controls = useAnimation()
  const inView = useInView(nodeRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.5 }
      })
      let start = 0
      const step = end / (duration * 60)
      const timer = setInterval(() => {
        start += step
        if (start < end) {
          setCount(Math.floor(start))
        } else {
          setCount(end)
          clearInterval(timer)
        }
      }, 1000 / 60)
      return () => clearInterval(timer)
    }
  }, [inView, end, duration, controls])

  return (
    <motion.p 
      ref={nodeRef}
      initial={{ opacity: 0 }}
      animate={controls}
      className="text-4xl font-bold text-primary mb-2"
    >
      {count.toLocaleString()}+
    </motion.p>
  )
}

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted">
      <main className="flex-1">
        <motion.section 
          className="py-20 px-4 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <motion.h1 variants={fadeInUp} className="text-4xl font-bold mb-4">About Bookworm&apos;s Paradise</motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our passion for books, ebooks, and music. We&apos;re more than just a store - we&apos;re a community of book lovers and music enthusiasts.
          </motion.p>
        </motion.section>

        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Our Story
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="mb-4">
                  Founded in 2010, Bookworm&apos;s Paradise started as a small corner bookshop with a vision to create a haven for book lovers. Over the years, we&apos;ve grown into a digital marketplace, expanding our offerings to include ebooks and music.
                </p>
                <p>
                  Our journey has been one of constant evolution, always driven by our love for literature and the arts. Today, we&apos;re proud to serve book enthusiasts and music lovers worldwide, connecting them with the stories and melodies that enrich their lives.
                </p>
              </motion.div>
              <motion.div 
                className="relative h-64 md:h-full"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.pexels.com/photos/28835857/pexels-photo-28835857/free-photo-of-gruppo-in-silhouette-all-alba-a-tochimilco.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt="Bookworm's Paradise store"
                  className="rounded-lg shadow-lg object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Meet Our Team
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { name: "Emma Thompson", role: "Founder & CEO", image: "" },
                { name: "Michael Chen", role: "Head of Operations", image: "" },
                { name: "Sarah Johnson", role: "Chief Curator", image: "" },
                { name: "David Patel", role: "Tech Lead", image: "" }
              ].map((member, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card>
                    <CardHeader>
                      <Image src="/testimone.webp" alt={member.name} width={128} height={128} className="rounded-full w-32 h-32 object-cover mx-auto mb-4" />
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Our Values
            </motion.h2>
            <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: <BookOpen className="h-12 w-12 mb-4" />, title: "Love for Literature", description: "We believe in the power of books to inspire, educate, and transform lives." },
                { icon: <Users className="h-12 w-12 mb-4" />, title: "Community Focus", description: "We foster a vibrant community of readers and music lovers, encouraging dialogue and shared experiences." },
                { icon: <Heart className="h-12 w-12 mb-4" />, title: "Passion for Arts", description: "We celebrate creativity in all its forms, from the written word to musical compositions." }
              ].map((value, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-primary-foreground text-primary">
                    <CardContent className="pt-6 text-center">
                      {value.icon}
                      <CardTitle className="mb-2">{value.title}</CardTitle>
                      <CardDescription className="text-primary/75">{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Bookworm&apos;s Paradise in Numbers
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: 500000, label: "Books Sold" },
                { number: 100000, label: "eBooks Downloaded" },
                { number: 50000, label: "Music Albums Sold" },
                { number: 1000000, label: "Happy Customers" }
              ].map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 text-center">
                    <CountUp end={stat.number} />
                    <CardDescription>{stat.label}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Join Our Journey
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8 max-w-2xl mx-auto"
            >
              We&apos;re always looking for passionate individuals to join our team. If you love books, music, and technology, we&apos;d love to hear from you!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button size="lg">
                View Career Opportunities
                <TrendingUp className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}