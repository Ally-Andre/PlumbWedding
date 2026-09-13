import { motion } from 'motion/react';

const pieces=[
    {type:'flower',left:'12%',top:'15%',size:22,duration:14,delay:0,x:36,y:170,rotate:110},
    {type:'petal',left:'22%',top:'8%',size:18,duration:16,delay:2,x:24,y:190,rotate:160},
    {type:'leaf',left:'30%',top:'18%',size:17,duration:18,delay:4,x:30,y:160,rotate:100},
    {type:'petal',left:'77%',top:'12%',size:17,duration:15,delay:1,x:-32,y:180,rotate:-150},
    {type:'flower',left:'88%',top:'23%',size:20,duration:17,delay:3,x:-38,y:165,rotate:-115},
    {type:'leaf',left:'70%',top:'27%',size:16,duration:18,delay:5,x:-26,y:185,rotate:-95},
    {type:'petal',left:'9%',top:'47%',size:16,duration:17,delay:3.5,x:34,y:175,rotate:145},
    {type:'flower',left:'18%',top:'63%',size:18,duration:19,delay:6,x:26,y:150,rotate:95},
    {type:'leaf',left:'84%',top:'54%',size:16,duration:16,delay:1.5,x:-28,y:180,rotate:-120},
    {type:'petal',left:'91%',top:'67%',size:17,duration:18,delay:5,x:-32,y:155,rotate:-150},
    {type:'flower',left:'74%',top:'76%',size:19,duration:20,delay:7,x:-22,y:145,rotate:-105},
    {type:'petal',left:'28%',top:'79%',size:15,duration:17,delay:4.5,x:24,y:135,rotate:135},
];

function FlowerIcon(){
    return(
        <svg viewBox="0 0 32 32" className="ambient-svg">
            <ellipse cx="16" cy="8" rx="4.3" ry="7"/>
            <ellipse cx="23.5" cy="13.5" rx="4.3" ry="7" transform="rotate(72 23.5 13.5)"/>
            <ellipse cx="20.5" cy="22.5" rx="4.3" ry="7" transform="rotate(144 20.5 22.5)"/>
            <ellipse cx="11.5" cy="22.5" rx="4.3" ry="7" transform="rotate(216 11.5 22.5)"/>
            <ellipse cx="8.5" cy="13.5" rx="4.3" ry="7" transform="rotate(288 8.5 13.5)"/>
            <circle cx="16" cy="16" r="3"/>
        </svg>
    );
}

function PetalIcon(){
    return(
        <svg viewBox="0 0 24 32" className="ambient-svg">
            <path d="M12 2C17 8 21 15 19 21C17 27 12 30 12 30C12 30 7 27 5 21C3 15 7 8 12 2Z"/>
        </svg>
    );
}

function LeafIcon(){
    return(
        <svg viewBox="0 0 30 20" className="ambient-svg">
            <path d="M2 10C8 2 20 1 28 5C23 15 12 20 2 10Z"/>
            <path className="ambient-leaf-vein" d="M5 10C12 9 18 7 25 5"/>
        </svg>
    );
}

function EnvelopeAmbient({hidden}){
    return(
        <motion.div
            className="envelope-ambient"
            initial={{opacity:0}}
            animate={{opacity:hidden ? 0 : 1}}
            transition={{duration:0.5}}
            aria-hidden="true"
        >
            {pieces.map((piece,index)=>(
                <motion.div
                    key={index}
                    className={`ambient-piece ambient-${piece.type}`}
                    style={{
                        left:piece.left,
                        top:piece.top,
                        width:`${piece.size}px`,
                        height:`${piece.size}px`,
                    }}
                    initial={{
                        x:0,
                        y:0,
                        rotate:0,
                        opacity:0,
                    }}
                    animate={{
                        x:[0,piece.x,piece.x*0.5,0],
                        y:[0,piece.y*0.35,piece.y,piece.y*1.25],
                        rotate:[0,piece.rotate,piece.rotate*1.4,piece.rotate*1.8],
                        opacity:[0,0.72,0.58,0],
                    }}
                    transition={{
                        duration:piece.duration,
                        delay:piece.delay,
                        repeat:Infinity,
                        repeatDelay:1.5,
                        ease:'easeInOut',
                    }}
                >
                    {piece.type==='flower' && <FlowerIcon/>}
                    {piece.type==='petal' && <PetalIcon/>}
                    {piece.type==='leaf' && <LeafIcon/>}
                </motion.div>
            ))}
        </motion.div>
    );
}

export default EnvelopeAmbient;