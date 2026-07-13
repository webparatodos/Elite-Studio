'use server'

import { writeClient } from '@/sanity/lib/writeClient'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'Por favor, rellena todos los campos obligatorios.' }
  }

  try {
    await writeClient.create({
      _type: 'message',
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
    })
    return {
      status: 'success',
      message: 'Gracias, hemos recibido tu mensaje. Te contactaremos pronto.',
    }
  } catch (error) {
    return { status: 'error', message: 'No hemos podido enviar tu mensaje. Inténtalo de nuevo.' }
  }
}
