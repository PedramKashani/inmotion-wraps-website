import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import ContactInfo from '../components/ContactInfo'

export default function Contact() {
  return (
    <main>
      <PageHero
        label="Get in Touch"
        headline="Let's Build Something."
        subtext="Fill out the form below or give us a call. We respond within 1 business day."
      />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </main>
  )
}
