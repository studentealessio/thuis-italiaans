/* ==========================================
   THUIS ITALIAANS — SCRIPT.JS
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ===== REVIEWS CAROUSEL ===== */

    const track = document.getElementById('carouselTrack');
    const dotsWrap = document.getElementById('carouselDots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (track) {

        const cards = Array.from(track.children);

        // build dots
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Ga naar review ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
            });
            dotsWrap.appendChild(dot);
        });

        const dots = Array.from(dotsWrap.children);

        const setActiveDot = () => {
            const trackLeft = track.scrollLeft;
            let closestIndex = 0;
            let closestDistance = Infinity;

            cards.forEach((card, i) => {
                const distance = Math.abs(card.offsetLeft - trackLeft);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = i;
                }
            });

            dots.forEach((dot, i) => dot.classList.toggle('active', i === closestIndex));
        };

        track.addEventListener('scroll', () => {
            window.requestAnimationFrame(setActiveDot);
        }, { passive: true });

        const scrollByCard = (direction) => {
            const cardWidth = cards[0].getBoundingClientRect().width + 24; // gap
            track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
        };

        if (prevBtn) prevBtn.addEventListener('click', () => scrollByCard(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => scrollByCard(1));

        setActiveDot();
    }

    /* ===== CONTACT FORM ===== */

    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const location = form.location.value;
            const message = form.message.value.trim();

            const subject = encodeURIComponent(`Aanvraag intake — ${name}`);
            const body = encodeURIComponent(
                `Naam: ${name}\nE-mail: ${email}\nVoorkeur: ${location}\n\nBericht:\n${message}`
            );

            window.location.href = `mailto:info@thuisitaliaans.nl?subject=${subject}&body=${body}`;
        });
    }

});