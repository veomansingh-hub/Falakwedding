document.addEventListener("DOMContentLoaded", () => {
    // Performance optimization for mobile devices
    const isMobile = window.innerWidth < 768;

    // 1. Star Particles Generator
    const starField = document.getElementById("star-field");
    const numStars = isMobile ? 25 : 60;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 4 + 3}s`;
        starField.appendChild(star);
    }

    // 2. Intense & Rich Galaxy Canvas Background (Pure Black & Gold theme)
    const galaxyCanvas = document.getElementById("galaxy-canvas");
    const gCtx = galaxyCanvas.getContext("2d");
    let galaxyStars = [];
    const galaxyStarsCount = isMobile ? 320 : 850; 
    let floatingLanterns = [];

    function resizeGalaxyCanvas() {
        galaxyCanvas.width = window.innerWidth;
        galaxyCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeGalaxyCanvas);
    resizeGalaxyCanvas();

    // Initialize dense spiral galaxy stars (using rich gold/bronze values)
    for (let i = 0; i < galaxyStarsCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 2.2) * (Math.min(galaxyCanvas.width, galaxyCanvas.height) * 0.5);
        const armIndex = Math.floor(Math.random() * 3); 
        const armAngle = (armIndex * (Math.PI * 2 / 3)) + (dist * 0.015);
        
        galaxyStars.push({
            dist: dist,
            angle: angle + armAngle,
            size: Math.random() * 1.8 + 0.5,
            speed: (0.00015 + (1 / dist) * 0.06) * 0.3,
            color: `rgba(${220 + Math.random() * 35}, ${170 + Math.random() * 45}, ${70 + Math.random() * 55}, ${0.35 + Math.random() * 0.55})` // warm gold
        });
    }

    // Setup subtle background planets
    const subtlePlanets = [
        { xOffset: -200, yOffset: -90, radius: 22, ring: true, color: "rgba(223, 183, 108, 0.08)" },
        { xOffset: 240, yOffset: 130, radius: 16, ring: false, color: "rgba(120, 160, 255, 0.07)" }
    ];

    // Setup Glowing Jellyfish Easter Egg
    let jellyfish = {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 150,
        vy: 0.22,
        wobble: 0,
        wobbleSpeed: 0.012,
        pulse: 0
    };

    // Add initial ambient floating lanterns
    const initialLanternsCount = isMobile ? 4 : 8;
    for (let i = 0; i < initialLanternsCount; i++) {
        floatingLanterns.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight + window.innerHeight,
            speed: Math.random() * 0.5 + 0.3,
            wobbleSpeed: Math.random() * 0.02 + 0.01,
            wobbleRange: Math.random() * 8 + 4,
            angle: Math.random() * Math.PI,
            scale: Math.random() * 0.4 + 0.8,
            text: "",
            opacity: Math.random() * 0.5 + 0.5
        });
    }

    function animateGalaxy() {
        // Pure black backdrop trails
        gCtx.fillStyle = "rgba(0, 0, 0, 0.08)";
        gCtx.fillRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);

        const cx = galaxyCanvas.width / 2;
        const cy = galaxyCanvas.height / 2;

        // Central Nebula Glow (Soft dark blue/indigo dust)
        const nebGrad = gCtx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(galaxyCanvas.width, galaxyCanvas.height) * 0.4);
        nebGrad.addColorStop(0, "rgba(8, 28, 56, 0.45)");
        nebGrad.addColorStop(0.5, "rgba(5, 20, 42, 0.15)");
        nebGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        gCtx.fillStyle = nebGrad;
        gCtx.fillRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);

        // Core gold glow
        const coreGrad = gCtx.createRadialGradient(cx, cy, 0, cx, cy, 50);
        coreGrad.addColorStop(0, "rgba(223, 183, 108, 0.55)");
        coreGrad.addColorStop(1, "rgba(223, 183, 108, 0)");
        gCtx.fillStyle = coreGrad;
        gCtx.beginPath();
        gCtx.arc(cx, cy, 50, 0, Math.PI * 2);
        gCtx.fill();

        // Render subtle planets
        subtlePlanets.forEach(p => {
            const px = cx + p.xOffset;
            const py = cy + p.yOffset;
            
            gCtx.fillStyle = p.color;
            gCtx.beginPath();
            gCtx.arc(px, py, p.radius, 0, Math.PI * 2);
            gCtx.fill();
            
            if (p.ring) {
                gCtx.strokeStyle = "rgba(223, 183, 108, 0.05)";
                gCtx.lineWidth = 1.5;
                gCtx.save();
                gCtx.translate(px, py);
                gCtx.scale(1.8, 0.4);
                gCtx.beginPath();
                gCtx.arc(0, 0, p.radius * 1.25, 0, Math.PI * 2);
                gCtx.stroke();
                gCtx.restore();
            }
        });

        // Render spiral stars
        galaxyStars.forEach(star => {
            star.angle += star.speed;
            const sx = cx + Math.cos(star.angle) * star.dist;
            const sy = cy + Math.sin(star.angle) * star.dist;
            
            gCtx.fillStyle = star.color;
            gCtx.beginPath();
            gCtx.arc(sx, sy, star.size, 0, Math.PI * 2);
            gCtx.fill();
        });

        // Render Floating Wish Lanterns (Made bigger & more pronounced)
        floatingLanterns = floatingLanterns.filter(lantern => {
            lantern.y -= lantern.speed;
            lantern.angle += lantern.wobbleSpeed;
            const lx = lantern.x + Math.sin(lantern.angle) * lantern.wobbleRange;

            const w = 32 * lantern.scale;
            const h = 42 * lantern.scale;

            gCtx.save();
            gCtx.shadowBlur = 25;
            gCtx.shadowColor = "rgba(255, 140, 0, 0.85)";
            gCtx.fillStyle = "rgba(223, 140, 45, 0.9)";

            gCtx.beginPath();
            gCtx.moveTo(lx - w/2, lantern.y);
            gCtx.lineTo(lx + w/2, lantern.y);
            gCtx.lineTo(lx + w*0.4, lantern.y + h);
            gCtx.lineTo(lx - w*0.4, lantern.y + h);
            gCtx.closePath();
            gCtx.fill();

            gCtx.fillStyle = "rgba(255, 235, 170, 0.98)";
            gCtx.beginPath();
            gCtx.arc(lx, lantern.y + h * 0.4, w * 0.25, 0, Math.PI * 2);
            gCtx.fill();

            if (lantern.text) {
                gCtx.fillStyle = "rgba(247, 224, 181, 0.95)";
                gCtx.font = "italic 9px 'Montserrat', sans-serif";
                gCtx.textAlign = "center";
                gCtx.fillText(lantern.text, lx, lantern.y - 6);
            }

            gCtx.restore();

            if (lantern.y + h < 0) {
                if (lantern.text) {
                    return false; 
                }
                lantern.y = galaxyCanvas.height + 20;
                lantern.x = Math.random() * galaxyCanvas.width;
            }
            return true;
        });

        // Render Glowing Jellyfish Easter Egg
        jellyfish.y -= jellyfish.vy;
        jellyfish.wobble += jellyfish.wobbleSpeed;
        jellyfish.pulse = Math.sin(jellyfish.wobble * 3.5) * 4;

        const jx = jellyfish.x + Math.sin(jellyfish.wobble) * 12;
        const jy = jellyfish.y;
        const jRadius = 26 + jellyfish.pulse; 

        if (jy + jRadius < -50) {
            jellyfish.y = galaxyCanvas.height + 150;
            jellyfish.x = Math.random() * galaxyCanvas.width;
        }

        gCtx.save();
        gCtx.shadowBlur = 20;
        gCtx.shadowColor = "rgba(244, 143, 177, 0.65)"; 

        // Bell Dome
        const jGrad = gCtx.createRadialGradient(jx, jy, 0, jx, jy, jRadius);
        jGrad.addColorStop(0, "rgba(255, 205, 225, 0.85)");
        jGrad.addColorStop(0.7, "rgba(244, 143, 177, 0.5)");
        jGrad.addColorStop(1, "rgba(244, 143, 177, 0)");
        gCtx.fillStyle = jGrad;
        gCtx.beginPath();
        gCtx.arc(jx, jy, jRadius, Math.PI, 0, false);
        gCtx.quadraticCurveTo(jx + jRadius, jy + 8, jx + jRadius * 0.8, jy + 10);
        gCtx.quadraticCurveTo(jx, jy + 15, jx - jRadius * 0.8, jy + 10);
        gCtx.quadraticCurveTo(jx - jRadius, jy + 8, jx - jRadius, jy);
        gCtx.closePath();
        gCtx.fill();

        // Baby Silhouette inside Jellyfish Bell
        gCtx.strokeStyle = "rgba(255, 235, 170, 0.8)";
        gCtx.lineWidth = 1.6;
        gCtx.beginPath();
        gCtx.arc(jx, jy - jRadius * 0.35, 4.5, 0, Math.PI * 2);
        gCtx.moveTo(jx, jy - jRadius * 0.35 + 4.5);
        gCtx.quadraticCurveTo(jx + 6, jy - 2, jx - 1, jy + 4);
        gCtx.stroke();

        // Tentacles
        gCtx.strokeStyle = "rgba(244, 143, 177, 0.35)";
        gCtx.lineWidth = 1.2;
        for (let t = -3; t <= 3; t++) {
            const txStart = jx + t * (jRadius * 0.22);
            gCtx.beginPath();
            gCtx.moveTo(txStart, jy + 8);
            gCtx.bezierCurveTo(
                txStart + Math.sin(jellyfish.wobble + t) * 10, jy + jRadius * 0.8,
                txStart - Math.cos(jellyfish.wobble + t) * 8, jy + jRadius * 1.5,
                txStart + Math.sin(jellyfish.wobble * 0.5 + t) * 12, jy + jRadius * 2.2
            );
            gCtx.stroke();
        }
        gCtx.restore();

        requestAnimationFrame(animateGalaxy);
    }
    animateGalaxy();

    // 3. Audio Context & Music Setup (7 Playlist Options)
    const tracks = [
        "https://ia801806.us.archive.org/11/items/dni.ncaa.SNA-20-ACD/SNA-20-ACD_TRACK_2.mp3",
        "https://ia801708.us.archive.org/13/items/dli.akashvani.sangeet.24/2%20Poorvi%20Dhun.mp3",
        "https://ia801708.us.archive.org/13/items/dli.akashvani.sangeet.24/1%20Raag%20Kedar.mp3",
        "https://ia801702.us.archive.org/20/items/BismillahKhanVilayatKhan-Jugalbandi/Bismillah%26Vilayat.Chaiti%20Dhun%20DN.mp3",
        "https://ia801702.us.archive.org/20/items/BismillahKhanVilayatKhan-Jugalbandi/Bismillah%26Vilayat.RGujareeTodi%20DN.mp3",
        "https://archive.org/download/lp_raga-todi-mishra-thumri_bismillah-khan_0/disc1/02.01.%20Mishra%20Thumri.mp3",
        "https://ia801806.us.archive.org/11/items/dni.ncaa.SNA-20-ACD/SNA-20-ACD_TRACK_1.mp3"
    ];
    
    const trackNames = [
        "Banarasi Dhun",
        "Poorvi Dhun",
        "Raag Kedar",
        "Chaiti Dhun",
        "Raga Gujari Todi",
        "Mishra Thumri",
        "Raga Poorvi"
    ];
    
    let currentTrackIndex = 0;
    let audioCtx = null;
    let audioSource = null;
    let filterNode = null;
    let gainNode = null;
    let isPlaying = false;
    let lastScrollY = window.scrollY;
    let scrollSpeed = 0;
    let scrollTimeout = null;
    
    const audio = new Audio();
    audio.src = tracks[0]; // Banarasi Dhun as default shehnai track
    audio.loop = true;
    audio.crossOrigin = "anonymous";
    audio.volume = 0.35;

    const btnEnter = document.getElementById("btn-enter");
    const waxSeal = document.getElementById("wax-seal");
    const envelope = document.getElementById("envelope");
    const welcomeGate = document.getElementById("welcome-gate");
    const audioPanel = document.getElementById("audio-panel");
    const btnAudioToggle = document.getElementById("btn-audio-toggle");
    const soundWave = document.getElementById("sound-wave");
    const audioStatusText = document.getElementById("audio-status-text");
    const mainContent = document.getElementById("main-content");
    const btnMusicList = document.getElementById("btn-music-list");
    const musicListDropdown = document.getElementById("music-list-dropdown");
    const trackOptions = document.querySelectorAll(".track-option");

    // Scroll sound engine - beautiful plucked piano string
    const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00]; // C4 to A5 Pentatonic
    let accumulatedScroll = 0;

    function initWebAudio() {
        if (audioCtx) return;
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn("Web Audio API not supported or blocked: ", e);
        }
    }

    // Plucked Piano Scroll sound synthesizer
    function playPianoScrollNote() {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        
        osc.type = "sine";
        const noteFreq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
        osc.frequency.setValueAtTime(noteFreq, now);
        
        // Soft pluck envelope decay
        noteGain.gain.setValueAtTime(0.05, now);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        
        osc.connect(noteGain);
        noteGain.connect(audioCtx.destination);
        
        osc.start(now);
        osc.stop(now + 0.4);
    }

    // SFX Generator 1: Elegant Wax Seal Golden Chime
    function playChimeSFX() {
        if (!audioCtx) return;
        
        const now = audioCtx.currentTime;
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const chimeGain = audioCtx.createGain();
        
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(880, now);
        osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.8);
        
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(1320, now);
        
        chimeGain.gain.setValueAtTime(0.35, now);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
        
        osc1.connect(chimeGain);
        osc2.connect(chimeGain);
        chimeGain.connect(audioCtx.destination);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.8);
        osc2.stop(now + 1.8);
    }

    // SFX Generator 2: Synthesized Firework Pops & Crackles
    function playFireworkPopSFX() {
        if (!audioCtx) return;
        
        const now = audioCtx.currentTime;
        const bufferSize = audioCtx.sampleRate * 0.35;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = buffer;
        
        const filter = audioCtx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1000 + Math.random() * 400, now);
        filter.Q.setValueAtTime(3.0, now);
        
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.4, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        
        noiseNode.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        
        noiseNode.start(now);
        
        // Haptic physical vibration synced to firework explosions
        if (navigator.vibrate) {
            navigator.vibrate([80, 40, 80]);
        }

        // Screen rumble visual shake feedback
        const varmalaStage = document.getElementById("varmala-stage");
        if (varmalaStage) {
            varmalaStage.classList.add("rumble-active");
            setTimeout(() => {
                varmalaStage.classList.remove("rumble-active");
            }, 180);
        }

        const crackleCount = 4 + Math.floor(Math.random() * 4);
        for (let j = 0; j < crackleCount; j++) {
            const crackleDelay = 0.08 + (j * 0.05) + (Math.random() * 0.03);
            const cOsc = audioCtx.createOscillator();
            const cGain = audioCtx.createGain();
            
            cOsc.type = "sine";
            cOsc.frequency.setValueAtTime(2000 + Math.random() * 1000, now + crackleDelay);
            
            cGain.gain.setValueAtTime(0.08, now + crackleDelay);
            cGain.gain.exponentialRampToValueAtTime(0.001, now + crackleDelay + 0.04);
            
            cOsc.connect(cGain);
            cGain.connect(audioCtx.destination);
            
            cOsc.start(now + crackleDelay);
            cOsc.stop(now + crackleDelay + 0.05);
        }
    }

    let heartbeatInterval = null;
    let heartbeatVolumeScale = 0.5;

    function playHeartbeatSound() {
        if (!audioCtx || audioCtx.state === "suspended") return;
        
        const now = audioCtx.currentTime;
        const vol = heartbeatVolumeScale;
        
        // Lub (First lower thump)
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, now);
        osc1.frequency.exponentialRampToValueAtTime(5, now + 0.18);
        gain1.gain.setValueAtTime(0.9 * vol, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.18);
        
        // Dub (Second thump, 220ms later, slightly higher pitch)
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(60, now + 0.22);
        osc2.frequency.exponentialRampToValueAtTime(5, now + 0.4);
        gain2.gain.setValueAtTime(0.75 * vol, now + 0.22);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(now + 0.22);
        osc2.stop(now + 0.4);
    }

    let globalHeartbeatTimeout = null;

    function globalHeartbeatLoop() {
        if (!isPlaying) {
            globalHeartbeatTimeout = null;
            return;
        }

        let inVarmala = false;
        let progress = 0;
        if (varmalaSection) {
            const rect = varmalaSection.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            inVarmala = (rect.top < viewHeight && rect.bottom > 0);
            if (inVarmala) {
                const totalScrollable = rect.height + viewHeight;
                const currentScrolled = viewHeight - rect.top;
                progress = Math.max(0, Math.min(1, currentScrolled / totalScrollable));
            }
        }

        if (inVarmala) {
            // Heartbeat sound plays in Varmala, getting louder as they come close
            heartbeatVolumeScale = Math.min(progress * 1.5, 1.2);
            playHeartbeatSound();
            
            // Shehnai volume fades out as they come close
            audio.volume = Math.max(0.02, 0.35 - (progress * 0.32));

            // Pronounced vibration synced to Varmala heartbeat
            if (navigator.vibrate) {
                navigator.vibrate([40, 30, 40]);
            }

            const nextDelay = 1000 - (620 * progress);
            globalHeartbeatTimeout = setTimeout(globalHeartbeatLoop, nextDelay);
        } else {
            // Outside Varmala: Shehnai volume is normal
            audio.volume = 0.35;

            // Sync slow background heartbeat vibration globally
            if (navigator.vibrate) {
                navigator.vibrate([20, 25, 20]);
            }

            // Slow heartbeat pattern (1.5 seconds)
            globalHeartbeatTimeout = setTimeout(globalHeartbeatLoop, 1500);
        }
    }

    function playMusic() {
        initWebAudio();
        
        if (audioCtx && audioCtx.state === "suspended") {
            try {
                audioCtx.resume();
            } catch (e) {
                console.warn("Failed to resume AudioContext: ", e);
            }
        }
        
        audio.play().then(() => {
            isPlaying = true;
            soundWave.classList.remove("muted");
            audioStatusText.textContent = trackNames[currentTrackIndex];
            
            // Start global heartbeat loop
            if (!globalHeartbeatTimeout) {
                globalHeartbeatLoop();
            }
        }).catch(err => {
            console.error("Audio playback error: ", err);
        });
    }

    function toggleMusic() {
        if (!isPlaying) {
            playMusic();
        } else {
            audio.pause();
            isPlaying = false;
            soundWave.classList.add("muted");
            audioStatusText.textContent = "Music Muted";
            if (globalHeartbeatTimeout) {
                clearTimeout(globalHeartbeatTimeout);
                globalHeartbeatTimeout = null;
            }
        }
    }

    // Playlist Events
    if (btnMusicList) {
        btnMusicList.addEventListener("click", (e) => {
            e.stopPropagation();
            musicListDropdown.classList.toggle("hidden");
        });
    }

    document.addEventListener("click", () => {
        if (musicListDropdown) {
            musicListDropdown.classList.add("hidden");
        }
    });

    trackOptions.forEach(opt => {
        opt.addEventListener("click", (e) => {
            e.stopPropagation();
            const index = parseInt(opt.getAttribute("data-index"));
            if (index === currentTrackIndex) {
                musicListDropdown.classList.add("hidden");
                return;
            }

            trackOptions.forEach(o => o.classList.remove("active"));
            opt.classList.add("active");

            currentTrackIndex = index;
            audio.pause();
            audio.src = tracks[currentTrackIndex];
            
            musicListDropdown.classList.add("hidden");
            playMusic();
        });
    });

    // 4. Interactive Auto-play Shehnai on first page interaction
    const startAudioOnInteraction = () => {
        playMusic();
        const hint = document.getElementById("audio-hint");
        if (hint) {
            hint.style.opacity = "0";
            setTimeout(() => hint.remove(), 600);
        }
        document.removeEventListener("click", startAudioOnInteraction);
        document.removeEventListener("scroll", startAudioOnInteraction);
        document.removeEventListener("touchstart", startAudioOnInteraction);
        document.removeEventListener("mousemove", startAudioOnInteraction);
        document.removeEventListener("keydown", startAudioOnInteraction);
    };
    document.addEventListener("click", startAudioOnInteraction);
    document.addEventListener("scroll", startAudioOnInteraction);
    document.addEventListener("touchstart", startAudioOnInteraction);
    document.addEventListener("mousemove", startAudioOnInteraction);
    document.addEventListener("keydown", startAudioOnInteraction);

    btnAudioToggle.addEventListener("click", toggleMusic);

    // 5. Ornate Gold Countdown Timer (Target: 31 December 2026 23:59:59)
    const targetDate = new Date("December 31, 2026 23:59:59").getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 6. Interactive Udaipur Venue Map
    const routes = {
        "1": { pathId: "route-day-1-2", nodeId: "node-udaivilas" },
        "2": { pathId: "route-day-1-2", nodeId: "node-leela" },
        "3": { pathId: "route-day-2-3", nodeId: "node-lake-palace" },
        "4": { pathId: "route-day-2-3", nodeId: "node-lake-palace" },
        "5": { pathId: "route-day-4-5", nodeId: "node-leela" }
    };

    const mapCards = document.querySelectorAll(".timeline-card");
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const dayAttr = entry.target.getAttribute("data-day");
            if (entry.isIntersecting && dayAttr) {
                entry.target.classList.add("reveal");
                
                document.querySelectorAll(".map-node").forEach(n => n.classList.remove("active"));
                document.querySelectorAll(".map-route").forEach(r => r.classList.remove("active"));

                const activeVenue = routes[dayAttr];
                if (activeVenue) {
                    const nodeEl = document.getElementById(activeVenue.nodeId);
                    const routeEl = document.getElementById(activeVenue.pathId);
                    if (nodeEl) nodeEl.classList.add("active");
                    if (routeEl) routeEl.classList.add("active");
                }
            }
        });
    }, { threshold: 0.35, rootMargin: "0px 0px -100px 0px" });

    mapCards.forEach(card => {
        cardObserver.observe(card);
    });

    // 7. Varmala Scroll Linkage
    const varmalaSection = document.getElementById("varmala-section");
    const charGroom = document.querySelector(".character.groom");
    const charBride = document.querySelector(".character.bride");
    const unionBadge = document.querySelector(".union-badge-container");
    let isUnionComplete = false;

    function handleVarmalaScroll() {
        if (!varmalaSection) return;

        const rect = varmalaSection.getBoundingClientRect();
        const viewHeight = window.innerHeight;

        const totalScrollable = rect.height + viewHeight;
        const currentScrolled = viewHeight - rect.top;

        let progress = currentScrolled / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));

        const glideOffset = Math.min(progress * 2.8, 1);
        
        const stage = document.getElementById("varmala-stage");
        const stageWidth = stage ? stage.offsetWidth : 600;
        const charWidth = charGroom ? charGroom.offsetWidth : 140;
        const maxGlide = (stageWidth / 2) - (charWidth * 0.68);

        const currentGroomX = maxGlide * glideOffset;
        const currentBrideX = -maxGlide * glideOffset;

        charGroom.style.setProperty("--groom-x", `${currentGroomX}px`);
        charBride.style.setProperty("--bride-x", `${currentBrideX}px`);

        if (glideOffset >= 0.98) {
            if (!isUnionComplete) {
                isUnionComplete = true;
                charGroom.classList.add("garland-placed");
                charBride.classList.add("garland-placed");
                unionBadge.classList.add("show");

                // Pronounced union haptic feedback: double pulse
                if (navigator.vibrate) {
                    navigator.vibrate([150, 80, 150]);
                }
            }
        } else {
            if (isUnionComplete) {
                isUnionComplete = false;
                charGroom.classList.remove("garland-placed");
                charBride.classList.remove("garland-placed");
                unionBadge.classList.remove("show");
            }
        }
    }

    // 8. Intense & Rich Fireworks Particle Simulator
    const fireworksCanvas = document.getElementById("fireworks-canvas");
    const fCtx = fireworksCanvas.getContext("2d");
    let fireworks = [];
    let particles = [];

    function resizeFireworksCanvas() {
        fireworksCanvas.width = fireworksCanvas.offsetWidth;
        fireworksCanvas.height = fireworksCanvas.offsetHeight;
    }
    window.addEventListener("resize", resizeFireworksCanvas);
    resizeFireworksCanvas();

    class FireworkRocket {
        constructor() {
            this.x = Math.random() * fireworksCanvas.width;
            this.y = fireworksCanvas.height;
            this.tx = Math.random() * fireworksCanvas.width;
            this.ty = Math.random() * (fireworksCanvas.height * 0.4) + 40;
            this.speed = 5.5; 
            this.angle = Math.atan2(this.ty - this.y, this.tx - this.x);
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
            this.trail = [];
            this.trailLength = 10;
        }

        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > this.trailLength) {
                this.trail.shift();
            }

            this.x += this.vx;
            this.y += this.vy;

            if (this.vy < 0 && this.y <= this.ty) {
                this.explode();
                return false;
            }
            return true;
        }

        draw() {
            // Draw golden rising trail
            fCtx.beginPath();
            fCtx.strokeStyle = "rgba(223, 183, 108, 0.55)";
            fCtx.lineWidth = 2.0;
            for (let i = 0; i < this.trail.length; i++) {
                const pt = this.trail[i];
                if (i === 0) fCtx.moveTo(pt.x, pt.y);
                else fCtx.lineTo(pt.x, pt.y);
            }
            fCtx.stroke();

            // Draw rocket cone on top
            fCtx.save();
            fCtx.fillStyle = "#ff5722";
            fCtx.translate(this.x, this.y);
            fCtx.rotate(this.angle + Math.PI/2);
            fCtx.beginPath();
            fCtx.moveTo(0, -6);
            fCtx.lineTo(-4, 2);
            fCtx.lineTo(4, 2);
            fCtx.closePath();
            fCtx.fill();
            fCtx.restore();
        }

        explode() {
            const colors = ["#dfb76c", "#f7e0b5", "#ff3838", "#ff7676", "#ff9f1c", "#9b5de5", "#00bbf9", "#4caf50", "#e91e63"];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const particleCount = 140 + Math.floor(Math.random() * 60); 

            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 6.5 + 2.0; 
                const isConfetti = Math.random() < 0.45; // 45% confetti squares

                particles.push({
                    x: this.x,
                    y: this.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    decay: isConfetti ? (Math.random() * 0.008 + 0.004) : (Math.random() * 0.014 + 0.007), 
                    gravity: isConfetti ? 0.035 : 0.08, // confetti drifts slower
                    friction: isConfetti ? 0.98 : 0.965,
                    color: color,
                    size: isConfetti ? (Math.random() * 4 + 2) : (Math.random() * 2.8 + 1.0),
                    isConfetti: isConfetti,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: Math.random() * 0.08 - 0.04
                });
            }
        }
    }

    function animateFireworks() {
        fCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        if (isUnionComplete && Math.random() < 0.075) {
            fireworks.push(new FireworkRocket());
        }

        fireworks = fireworks.filter(r => {
            const active = r.update();
            if (active) r.draw();
            return active;
        });

        particles = particles.filter(p => {
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) return false;

            fCtx.save();
            fCtx.globalAlpha = p.alpha;
            fCtx.fillStyle = p.color;

            if (p.isConfetti) {
                p.rotation += p.rotationSpeed;
                fCtx.translate(p.x, p.y);
                fCtx.rotate(p.rotation);
                fCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            } else {
                fCtx.shadowBlur = 6;
                fCtx.shadowColor = p.color;
                fCtx.beginPath();
                fCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                fCtx.fill();
            }
            fCtx.restore();
            return true;
        });

        requestAnimationFrame(animateFireworks);
    }
    animateFireworks();

    // Combined Scroll Actions
    window.addEventListener("scroll", () => {
        handleVarmalaScroll();

        // 1. Play scroll piano note on threshold
        if (isPlaying && audioCtx) {
            const currentScrollY = window.scrollY;
            const delta = Math.abs(currentScrollY - lastScrollY);
            accumulatedScroll += delta;
            
            if (accumulatedScroll >= 350) { // Play note every 350px of scrolling
                playPianoScrollNote();
                accumulatedScroll = 0;
            }
        }

        // 2. Adjust BGM lowpass filter frequency based on scroll speed
        if (!isPlaying || !filterNode || !audioCtx) return;

        const currentScrollY = window.scrollY;
        const delta = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;

        scrollSpeed = Math.min(delta * 20, 1500);
        const targetFrequency = Math.min(600 + scrollSpeed, 3500);
        filterNode.frequency.setTargetAtTime(targetFrequency, audioCtx.currentTime, 0.1);

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (filterNode && audioCtx) {
                filterNode.frequency.setTargetAtTime(600, audioCtx.currentTime, 0.5);
            }
        }, 150);
    });

    // 9. RSVP Submission & Lantern wishes triggers
    const rsvpForm = document.getElementById("rsvp-form");
    const rsvpSuccess = document.getElementById("rsvp-success-message");

    rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const guestName = document.getElementById("input-name").value || "Blessings";
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = "Registering...";

        setTimeout(() => {
            rsvpForm.classList.add("hidden");
            rsvpSuccess.classList.remove("hidden");

            // Spawn floating lantern particles matching guest wish
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    floatingLanterns.push({
                        x: Math.random() * (window.innerWidth - 60) + 30,
                        y: window.innerHeight + 30,
                        speed: Math.random() * 0.8 + 0.4,
                        wobbleSpeed: Math.random() * 0.02 + 0.01,
                        wobbleRange: Math.random() * 10 + 5,
                        angle: Math.random() * Math.PI,
                        scale: Math.random() * 0.5 + 1.0,
                        text: i === 0 ? guestName : "",
                        opacity: 1
                    });
                }, i * 1500);
            }
        }, 1200);
    });
});
