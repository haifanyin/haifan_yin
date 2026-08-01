'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Microscope } from 'lucide-react'
import { motion } from 'framer-motion'
import { researchTopics } from '@/lib/data'
import { fadeInUp } from '@/lib/constants'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionTitle from '@/components/layout/SectionTitle'

const focusIds = ['rydberg-atomic-receiver', 'massive-mimo', 'ris', 'superdirective']

const focusDescriptions: Record<string, string> = {
  'massive-mimo': 'Mobility-aware architectures, channel prediction, and efficient CSI acquisition for next-generation wireless systems.',
  ris: 'Programmable wireless environments through intelligent surfaces, practical prototypes, and field trials.',
  superdirective: 'Compact arrays, coupling-aware beamforming, and efficient superdirectivity for communication systems.',
  'rydberg-atomic-receiver': 'Quantum-enabled receivers and signal processing methods for sensing and future 6G architectures.',
}

export default function ResearchFocusSection() {
  const focusTopics = focusIds
    .map(id => researchTopics.find(topic => topic.id === id))
    .filter((topic): topic is (typeof researchTopics)[number] => Boolean(topic))

  return (
    <SectionWrapper id="research-focus" className="bg-gradient-to-b from-blue-50/70 via-background to-indigo-50/35 dark:from-blue-950/15 dark:via-background dark:to-indigo-950/10 !pt-6 md:!pt-8 !pb-10 md:!pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle className="!mb-8 md:!mb-10" accent="blue" subtitle="Core topics in wireless communications and signal processing">
          Research Focus
        </SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {focusTopics.map((topic) => (
            <motion.article key={topic.id} variants={fadeInUp}>
              <Link
                href={`/research#${topic.id}`}
                className="group block h-full rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                  <div className="absolute left-4 bottom-3 right-4 flex items-end justify-between gap-3">
                    <div className="flex items-center gap-2 text-white">
                      <Microscope className="w-4 h-4 text-white/75" />
                      <span className="text-sm font-semibold leading-tight">{topic.title}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
                <p className="p-4 text-sm leading-relaxed text-muted-foreground">
                  {focusDescriptions[topic.id]}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
