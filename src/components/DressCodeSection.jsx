import SectionReveal from './SectionReveal';
import '../styles/dress-code-lookbook.css';

const guestPalette = ['#E8DCCA', '#C5A059', '#9EA8B5', '#222930', '#000000'];

function DressSketch() {
    return (
        <svg className="dc-lookbook-sketch" viewBox="0 0 120 150" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M42 12 L48 8 60 26 72 8 78 12 69 38 Q66 47 69 55 C78 75 86 111 101 139 Q82 149 60 145 Q36 149 19 139 C34 111 42 75 51 55 Q54 47 51 38 Z" fill="currentColor" fillOpacity=".055" />
            <path d="M52 54 Q60 58 68 54 M53 61 Q60 64 67 61 M55 69 C52 92 43 120 38 142 M62 69 Q64 107 65 145 M69 73 Q77 110 85 142 M48 8 L45 24 M72 8 L75 24" />
        </svg>
    );
}

function SuitSketch() {
    return (
        <svg className="dc-lookbook-sketch" viewBox="0 0 120 150" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M44 12 L28 19 Q24 22 22 30 L12 89 25 92 33 52 32 91 39 95 40 144 55 144 60 100 65 144 80 144 81 95 88 91 87 52 95 92 108 89 98 30 Q96 22 92 19 L76 12 67 8 60 17 53 8 Z" fill="currentColor" fillOpacity=".055" />
            <path d="M44 12 L41 35 50 39 46 47 60 73 74 47 70 39 79 35 76 12 M53 8 L49 22 60 17 71 22 67 8 M57 22 L63 22 65 28 60 54 55 28 Z M60 73 V92 M32 91 L50 97 60 92 70 97 88 91 M38 65 H49 M71 65 H82 M76 45 H84 M46 103 L45 137 M74 103 L75 137" />
            <circle cx="64" cy="77" r="1.2"/><circle cx="64" cy="84" r="1.2"/>
        </svg>
    );
}

export default function DressCodeSection() {
    return (
        <section id="dress-code" className="section dc-lookbook" aria-labelledby="dress-code-title">
            <div className="section-container dc-lookbook-inner">
                <SectionReveal className="dc-lookbook-header">
                    <h2 id="dress-code-title">Dress Code</h2>
                    <p className="dc-lookbook-formality">Formal / Evening Formal</p>
                    <div className="dc-lookbook-palette" role="img" aria-label="Suggested attire colours: bone, golden bronze, cool steel, charcoal and black">
                        {guestPalette.map((hex) => (
                            <span key={hex} className="dc-lookbook-swatch" style={{ backgroundColor: hex }} />
                        ))}
                    </div>
                    <p className="dc-lookbook-caption">Our suggested colours</p>
                </SectionReveal>
                <SectionReveal className="dc-lookbook-guide" delay={0.08}>
                    <article className="dc-lookbook-outfit">
                        <DressSketch />
                        <div>
                            <h3>For the ladies</h3>
                            <p>Floor-length or sleek cocktail dresses, elegant jumpsuits, or dressy separates.</p>
                        </div>
                    </article>
                    <article className="dc-lookbook-outfit">
                        <SuitSketch />
                        <div>
                            <h3>For the gentlemen</h3>
                            <p>A suit with a tie, in seasonally appropriate colours.</p>
                        </div>
                    </article>
                </SectionReveal>
                <SectionReveal className="dc-lookbook-note" delay={0.12}>
                    <h3>Good to know</h3>
                    <p>We will be walking between venues, so comfortable shoes are a good idea.</p>
                    <p> It is January, so think light fabrics for the afternoon heat.</p>
                </SectionReveal>
            </div>
        </section>
    );
}
