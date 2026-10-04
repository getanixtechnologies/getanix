import { useState } from 'react'
import { inquiryTypes, services } from '../data/content'

export default function Contact() {
  const [type, setType] = useState('sales')
  const [sent, setSent] = useState(null)
  const current = inquiryTypes.find((t) => t.id === type)

  const submit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    // Connect this to your backend, CRM or WhatsApp API endpoint.
    console.log('Getanix inquiry', { type, ...data })
    setSent(data.name || 'there')
  }

  return (
    <section className="contact section" id="contact">
      <div className="container contact-inner">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow light">Inquire about our solutions</p>
          <h2 className="display">Ready to <span className="green">crumple</span> the chaos?</h2>
          <p className="lead light">Tell us about your project. We reply with a free initial consultation, a detailed proposal and a timeline.</p>
          <p className="hand contact-hand">no paperwork, promise.</p>
        </div>

        <div className="contact-card" data-reveal>
          <div className="contact-tabs" role="tablist" aria-label="Inquiry type">
            {inquiryTypes.map((t) => (
              <button key={t.id} role="tab" aria-selected={type === t.id} className={type === t.id ? 'is-active' : ''} onClick={() => { setType(t.id); setSent(null) }}>
                {t.label}
              </button>
            ))}
          </div>

          {sent ? (
            <div className="sent" role="status">
              <p className="hand">thank you, {sent}!</p>
              <p>Your request is noted. Our team will get back to you within one business day.</p>
              <button className="btn btn-ghost" onClick={() => setSent(null)}>Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="form">
              <p className="form-hint">{current.hint}</p>
              <div className="row">
                <label htmlFor="f-name">Name<input id="f-name" name="name" required autoComplete="name" placeholder="Your name" /></label>
                <label htmlFor="f-company">Company<input id="f-company" name="company" autoComplete="organization" placeholder="Company name" /></label>
              </div>
              <div className="row">
                <label htmlFor="f-email">Email<input id="f-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
                <label htmlFor="f-phone">WhatsApp / Phone<input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" /></label>
              </div>
              <label htmlFor="f-service">Solution
                <select id="f-service" name="service" defaultValue={type === 'app' ? 'Mobile App Development' : type === 'ai' ? 'AI Solutions & Agents' : ''}>
                  <option value="">Not sure yet</option>
                  {services.map((s) => <option key={s.id}>{s.title}</option>)}
                </select>
              </label>
              <label htmlFor="f-msg">What slows your business down?<textarea id="f-msg" name="message" rows="4" placeholder="e.g. We answer 200 WhatsApp enquiries a day by hand..." /></label>
              <button className="btn btn-green btn-block" type="submit">{current.label}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
