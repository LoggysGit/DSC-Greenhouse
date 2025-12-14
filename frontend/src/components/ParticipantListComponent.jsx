import React, { useState, useRef, useEffect } from 'react';
import '/src/App.css';
import {get_local_id, participantsData, participantsImg} from './LanguageContent.jsx';

// <button id="prevBtn" onClick={scrollPrev} disabled={activeIndex === 1}>&lt;</button>
// <button id="nextBtn" onClick={scrollNext} disabled={activeIndex === participantsData.length - 2}>&gt;</button>

const AuthorsContainer = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const viewportRef = useRef(null);

    const cardRefs = useRef([]);

    const centerActiveCard = (index) => {
        /* Center card functon */
        const viewport = viewportRef.current;
        const activeCard = cardRefs.current[index];

        if (viewport && activeCard) {
            // RelPosition = (viewport + card.width)/2
            const scrollPosition = 
                activeCard.offsetLeft - 
                viewport.clientWidth / 2 + 
                activeCard.clientWidth / 2;

            viewport.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {     // Update center on changing screen
        centerActiveCard(activeIndex);
        // Window size change listener
        window.addEventListener('resize', () => centerActiveCard(activeIndex));
        return () => {
            window.removeEventListener('resize', () => centerActiveCard(activeIndex));
        };
    }, [activeIndex]);

    const scrollNext = () => {
        if (activeIndex < participantsData[0].length - 2) {
            setActiveIndex(prevIndex => prevIndex + 1);
            console.log(`Scroll next: ${prevIndex}`);
        }
    };
    const scrollPrev = () => {
        if (activeIndex > 1) {
            setActiveIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <>
            <div id="authors-container"             
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-once="false"
            data-aos-offset="40%">
                <div id="participants-viewport" ref={viewportRef}>
                    <div id="participants">
                        {participantsData[get_local_id()].map((participant, index) => {
                            const isSpacer = participant.type === 'spacer';
                            let is_null = null;

                            return (
                                <div 
                                    key={index}
                                    className={`participant-card ${isSpacer ? 'spacer-card' : ''}`}
                            
                                    id={index === activeIndex ? 'scaled-card' : is_null}
                                    ref={el => cardRefs.current[index] = el}

                                    onClick={() => !isSpacer && setActiveIndex(index)}
                                >
                                    {!isSpacer && (
                                        <>
                                            <h3>{participant.name}</h3>
                                            <img alt="photo" src={`./public/participants/${participantsImg[index - 1]}`} />
                                            <p>{participant.role}</p>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div id="scroll-btns">
                <button id="prevBtn" onClick={scrollPrev} disabled={activeIndex === 1}>◀</button>
                <button id="nextBtn" onClick={scrollNext} disabled={activeIndex === participantsData[get_local_id()].length - 2}>▶</button>
            </div>
        </>
    );
};

export default AuthorsContainer;
