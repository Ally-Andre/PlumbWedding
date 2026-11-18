import SectionReveal from './SectionReveal';

function Registry() {
    return (
        <section id="registry" className="section registry-section">
            <div className="section-container registry-container">
                <SectionReveal>
                    <h2>Gifts</h2>
                    <p className="registry-lead">Your presence at our wedding is the greatest gift we could ask for.</p>
                    <p>As we'll be living at home, we're fortunate to already have everything we need. </p>
                    <p>Should you still wish to give us a gift, we would be incredibly grateful for a contribution towards furnishing and decorating our little lounge we are creating together.</p>
                    <div style={{
                        width: '70px',
                        height: '1px',
                        backgroundColor: '#C5A059',
                        margin: '32px auto'
                    }} />
                    <div style={{
                        textAlign: 'center',
                        margin: '25px auto'
                    }}>
                        <p style={{
                            color: '#997334',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            fontSize: '0.8rem',
                            marginBottom: '20px'
                        }}>Banking details</p>
                        <p>
                            <strong>Account holder:</strong> Allyson Andre
                            <br />
                            <strong>Bank:</strong> Discovery Bank
                            <br />
                            <strong>Account number:</strong> 14730292213
                            <br />
                            <strong>Branch code:</strong> 679000
                            <br />
                            <strong>Reference:</strong> Your name
                        </p>
                    </div>
                    <p style={{
                        fontStyle: 'italic',
                        marginTop: '30px'
                    }}>Above all, we simply look forward to celebrating with you.</p>
                </SectionReveal>
            </div>
        </section>
    );
}

export default Registry;