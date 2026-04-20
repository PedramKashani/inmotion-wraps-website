import { useState } from 'react'
import { contactInquiryOptions } from '../data/services'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

// Replace YOUR_FORM_ID with your Formspree form ID (https://formspree.io)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', service: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Full name is required.'
    if (!form.email.trim()) e.email = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.message.trim()) e.message = 'Please describe your project.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          ...(form.phone && { phone: form.phone }),
          ...(form.service && { service: form.service }),
          message: form.message,
        }),
      })
      if (res.ok) setSubmitted(true)
      else setServerError('Something went wrong. Please try again or call us directly.')
    } catch {
      setServerError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = (error?: string) =>
    `w-full bg-brand-bg border rounded px-4 py-3 text-sm text-brand-text placeholder:text-brand-muted/50 focus:outline-none transition-colors duration-200 ${
      error ? 'border-red-500/50 focus:border-red-400' : 'border-brand-border focus:border-brand-accent'
    }`

  const labelClass = 'block font-heading font-medium text-[10px] text-brand-secondary tracking-[0.2em] uppercase mb-2'

  if (submitted) {
    return (
      <div className="flex flex-col items-start justify-center min-h-[300px] md:min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center mb-6">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5C400" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-2xl text-brand-text mb-3">Request Received</h3>
        <p className="text-brand-muted text-sm leading-relaxed max-w-sm">
          Thanks for reaching out. We'll review your project details and get back to you within 1 business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 md:gap-5">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Full Name <span className="text-brand-accent">*</span>
        </label>
        <input
          id="name" name="name" type="text"
          value={form.name} onChange={handleChange}
          placeholder="Jane Smith"
          className={fieldClass(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address <span className="text-brand-accent">*</span>
        </label>
        <input
          id="email" name="email" type="email"
          value={form.email} onChange={handleChange}
          placeholder="you@example.com"
          className={fieldClass(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number <span className="text-brand-muted normal-case tracking-normal font-body font-normal">(optional)</span>
        </label>
        <input
          id="phone" name="phone" type="tel"
          value={form.phone} onChange={handleChange}
          placeholder="(702) 551-7315"
          className={fieldClass()}
        />
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className={labelClass}>
          Service Interested In <span className="text-brand-muted normal-case tracking-normal font-body font-normal">(optional)</span>
        </label>
        <div className="relative">
          <select
            id="service" name="service"
            value={form.service} onChange={handleChange}
            className={`${fieldClass()} appearance-none cursor-pointer pr-10`}
          >
            <option value="">Select a service…</option>
            {contactInquiryOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Project Details <span className="text-brand-accent">*</span>
        </label>
        <textarea
          id="message" name="message" rows={4}
          value={form.message} onChange={handleChange}
          placeholder="Tell us about your project, vehicle type, quantity, timeline, any design notes…"
          className={`${fieldClass(errors.message)} resize-none`}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      {serverError && <p className="text-xs text-red-400">{serverError}</p>}

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-brand-accent text-brand-bg font-semibold text-xs px-8 py-4 uppercase tracking-widest rounded cursor-pointer hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {submitting ? 'Sending…' : 'Send My Request'}
        </button>
      </div>
    </form>
  )
}
