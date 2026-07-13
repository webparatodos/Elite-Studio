'use client'

import { useActionState } from 'react'
import { submitContactForm, type ContactFormState } from '@/lib/actions'

const initialState: ContactFormState = { status: 'idle' }

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Nombre *"
          required
          className="bg-ink-800 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
        />
        <input
          name="email"
          type="email"
          placeholder="Email *"
          required
          className="bg-ink-800 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
        />
      </div>
      <input
        name="phone"
        placeholder="Teléfono"
        className="w-full bg-ink-800 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
      />
      <textarea
        name="message"
        placeholder="Cuéntanos tu proyecto *"
        required
        rows={5}
        className="w-full bg-ink-800 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="px-7 py-3.5 rounded-full bg-accent hover:bg-accent-dark transition-colors font-semibold uppercase tracking-wide text-sm disabled:opacity-50"
      >
        {pending ? 'Enviando…' : 'Enviar mensaje'}
      </button>

      {state.status !== 'idle' && (
        <p className={state.status === 'success' ? 'text-emerald-400 text-sm' : 'text-red-400 text-sm'}>
          {state.message}
        </p>
      )}
    </form>
  )
}
