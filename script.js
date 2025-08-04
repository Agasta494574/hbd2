document.addEventListener('DOMContentLoaded', () => {
    const blowOutButton = document.getElementById('blow-out-button');
    const flame = document.getElementById('flame');
    const birthdayMessageDiv = document.querySelector('.birthday-message');
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    let fireworks = [];

    // Mengatur ukuran canvas agar sesuai dengan jendela
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Fungsi untuk membuat kembang api
    function createFirework(x, y) {
        const particleCount = 50;
        const colors = ['#FF0043', '#14FC56', '#1E7FFF', '#E60AFF', '#FFBF36', '#FFFFFF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const spread = 2;
        const speed = Math.random() * 2 + 1;
        const life = 100;

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            fireworks.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed * spread,
                vy: Math.sin(angle) * speed * spread,
                color: color,
                life: life,
                gravity: 0.05
            });
        }
    }

    // Fungsi untuk memperbarui dan menggambar kembang api
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = fireworks.length - 1; i >= 0; i--) {
            const p = fireworks[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.life--;

            if (p.life <= 0) {
                fireworks.splice(i, 1);
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
        }
        requestAnimationFrame(draw);
    }

    blowOutButton.addEventListener('click', () => {
        // Matikan api lilin
        flame.classList.add('flame-off');

        // Sembunyikan tombol "Tiup Lilin!" dan pesan sebelumnya
        blowOutButton.style.display = 'none';
        birthdayMessageDiv.style.opacity = '0';

        // Tampilkan pesan baru setelah api mati
        setTimeout(() => {
            birthdayMessageDiv.innerHTML = '<span>Happy Birthday!</span>';
            birthdayMessageDiv.style.fontSize = '3em';
            birthdayMessageDiv.style.top = '50%';
            birthdayMessageDiv.style.transform = 'translate(-50%, -50%)';
            birthdayMessageDiv.style.opacity = '1';
        }, 500);

        // Mulai animasi kembang api dari atas kue
        setTimeout(() => {
            const cake = document.querySelector('.cake');
            const cakeRect = cake.getBoundingClientRect();
            const cakeX = cakeRect.left + cakeRect.width / 2;
            const cakeY = cakeRect.top;

            createFirework(cakeX, cakeY);
            draw();
        }, 1000); // Kembang api akan muncul 1 detik setelah tombol diklik
    });
});