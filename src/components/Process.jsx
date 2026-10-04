import { process } from '../data/content'

export default function Process() {
  return (
    <section className="process section" id="process">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">How we work</p>
          <h2 className="display">A structured <span className="green">Agile</span> path from idea to launch.</h2>
          <p className="lead">Six clear stages, regular demos, and no surprises on scope or timeline.</p>
        </div>
        <ol className="steps">
          {process.map((s, i) => (
            <li className="step" key={s.title} data-reveal>
              <span className="step-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {s.hand && <span className="hand step-hand">{s.hand}</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
