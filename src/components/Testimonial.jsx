import { testimonial } from '../data/content'

export default function Testimonial() {
  return (
    <section className="testimonial section">
      <div className="container testimonial-inner" data-reveal>
        <p className="eyebrow light">Client testimonial spotlight</p>
        <svg className="quote-mark" viewBox="0 0 64 48" aria-hidden="true"><path d="M0 48V28C0 12 8 3 24 0l3 6C18 9 14 15 14 22h12v26zm36 0V28C36 12 44 3 60 0l3 6c-9 3-13 9-13 16h12v26z" /></svg>
        <blockquote>
          <p>{testimonial.quote}</p>
        </blockquote>
        <div className="testimonial-by">
          <img src={testimonial.logo} alt={testimonial.org} width="64" height="64" />
          <div>
            <p className="hand sig">{testimonial.author}</p>
            <p className="muted-light">{testimonial.org}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
