'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FaqItem = { id: string; question: string; answer: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="max-w-3xl divide-y divide-white/10 border-t border-b border-white/10">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="font-display text-lg pr-6">{item.question}</span>
              <span className={`text-accent text-2xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/60 pb-5 pr-10">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
