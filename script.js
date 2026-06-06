document.addEventListener("DOMContentLoaded", () => {
  // ===================================================
  // 1️⃣ افکت تایپ خودکار نام و توضیحات
  // ===================================================
  const nameElement = document.getElementById("typing-name");
  const descElement = document.querySelector("header p");

  // آرایه نام‌ها (تغییر بین نام شما و حالت سایبری)
  const namePhrases = ["Mohammad Edris", "Cyber_Sec_Student", "Ethical_Hacker"];
  // آرایه توضیحات
  const descPhrases = [
    "محصل و پژوهشگر حوزه امنیت سایبری و شبکه",
    "علاقه‌مند به تست نفوذ و هک قانون‌مند (Pentesting)",
    "متخصص و توسعه‌دهنده سیستم‌عامل لینوکس (Linux)",
    "در حال یادگیری مکانیزم‌های دفاعی شبکه",
  ];

  let nameIndex = 0,
    nameCharIndex = 0,
    nameDeleting = false;
  let descIndex = 0,
    descCharIndex = 0,
    descDeleting = false;

  // تابع تایپ خودکار نام
  function typeName() {
    const currentName = namePhrases[nameIndex];
    if (nameDeleting) {
      nameElement.textContent = currentName.substring(0, nameCharIndex - 1);
      nameCharIndex--;
    } else {
      nameElement.textContent = currentName.substring(0, nameCharIndex + 1);
      nameCharIndex++;
    }

    let speed = nameDeleting ? 40 : 80;

    if (!nameDeleting && nameCharIndex === currentName.length) {
      speed = 3000; // ۳ ثانیه ماندن روی نام اصلی
      nameDeleting = true;
    } else if (nameDeleting && nameCharIndex === 0) {
      nameDeleting = false;
      nameIndex = (nameIndex + 1) % namePhrases.length;
      speed = 500;
    }
    setTimeout(typeName, speed);
  }

  // تابع تایپ خودکار توضیحات پایین
  function typeDesc() {
    const currentDesc = descPhrases[descIndex];
    if (descDeleting) {
      descElement.textContent = currentDesc.substring(0, descCharIndex - 1);
      descCharIndex--;
    } else {
      descElement.textContent = currentDesc.substring(0, descCharIndex + 1);
      descCharIndex++;
    }

    let speed = descDeleting ? 20 : 50;

    if (!descDeleting && descCharIndex === currentDesc.length) {
      speed = 2500;
      descDeleting = true;
    } else if (descDeleting && descCharIndex === 0) {
      descDeleting = false;
      descIndex = (descIndex + 1) % descPhrases.length;
      speed = 500;
    }
    setTimeout(typeDesc, speed);
  }

  // اجرای توابع تایپ
  if (nameElement) typeName();
  if (descElement) typeDesc();

  // ===================================================
  // 2️⃣ افکت تغییر خودکار لوگوی هکری
  // ===================================================
  const logoElement = document.getElementById("hacker-logo");
  if (logoElement) {
    setInterval(() => {
      // ایجاد یک افکت فلاش یا خاموش روشن شدن قبل از تغییر لوگو
      logoElement.style.opacity = "0";

      setTimeout(() => {
        if (logoElement.classList.contains("fa-user-shield")) {
          logoElement.className = "fa-solid fa-skull-crossbones"; // تبدیل به جمجمه هکری
        } else {
          logoElement.className = "fa-solid fa-user-shield"; // برگشت به سپر امنیتی
        }
        logoElement.style.opacity = "1";
      }, 200);
    }, 4000); // هر ۴ ثانیه یک‌بار لوگو تغییر می‌کند
  }

  // ===================================================
  // 3️⃣ انیمیشن باران کدهای ماتریکسی در پس‌زمینه هدر
  // ===================================================
  const canvas = document.getElementById("matrix-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const katakana = "01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const alphabet = katakana.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff66";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    }
    setInterval(drawMatrix, 30);
  }
});
