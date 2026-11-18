import { motion } from 'motion/react';
import SectionReveal from './SectionReveal';
import { weddingDetails } from '../data/weddingDetails';

const timelineItems=[
    {
        time:'14:00',
        title:'Welcome Drinks',
        description:'Arrive at 11 Krause Road, park your car and join us for a welcome drink.',
        link:weddingDetails.parking.mapUrl,
        linkLabel:'Open parking location',
    },
    {
        time:'15:00',
        title:'A Little Walk',
        description:'We will head up Krause Road together towards the wedding venue.',
        link:null,
        linkLabel:null,
    },
    {
        time:'15:30',
        title:'The Ceremony',
        description:'The moment we have all been waiting for. David and Allyson get married at 506 Krause Road.',
        link:weddingDetails.ceremony.mapUrl,
        linkLabel:'Open wedding venue',
    },
    {
        time:'16:15',
        title:'Canapés & Cake',
        description:'Join us for drinks, delicious canapés and the cutting of our wedding cake.',
        link:null,
        linkLabel:null,
    },
    {
        time:'18:15',
        title:'The Reception',
        description:'Take your seats and join us in celebrating the newlyweds.',
        link:null,
        linkLabel:null,
    },
    {
        time:'18:30',
        title:'Starters',
        description:'A little something to start off the evening.',
        link:null,
        linkLabel:null,
    },
    {
        time:'19:30',
        title:'Dinner',
        description:'Good food, good drinks and even better company.',
        link:null,
        linkLabel:null,
    },
    {
        time:'20:30',
        title:'Something Sweet',
        description:'Because no celebration is complete without dessert.',
        link:null,
        linkLabel:null,
    },
    {
        time:'21:00',
        title:'First Dance & Joll',
        description:'Join us for our first dance as husband and wife, then put on your dancing shoes and joll the night away!',
        link:null,
        linkLabel:null,
    },
];

function Timeline(){
    return(
        <section id="timeline" className="section timeline-section">
            <div className="section-container timeline-container">
                <SectionReveal>
                    <div className="section-heading">
                        <span className="section-eyebrow">The itinerary</span>
                        <h2>The Day Unfolds</h2>
                        <p>Park once, have a drink with us and enjoy the afternoon. We'll take care of getting everyone where they need to be.</p>
                    </div>
                </SectionReveal>
                <div className="timeline">
                    <motion.div
                        className="timeline-line"
                        initial={{scaleY:0}}
                        whileInView={{scaleY:1}}
                        viewport={{once:true,amount:0.2}}
                        transition={{
                            duration:1.5,
                            ease:[0.22,1,0.36,1],
                        }}
                    />
                    {timelineItems.map((item,index)=>(
                        <SectionReveal
                            key={item.time}
                            delay={index*0.1}
                        >
                            <div className="timeline-item">
                                <div className="timeline-time">
                                    {item.time}
                                </div>
                                <div className="timeline-marker">
                                    <span></span>
                                </div>
                                <div className="timeline-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    {item.link && (
                                        <a
                                            className="timeline-location-link"
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {item.linkLabel}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Timeline;