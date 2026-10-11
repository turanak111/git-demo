// Ziyaretçi Defteri: mesajlar tarayıcının localStorage'ında tutulur.
const ANAHTAR = "ziyaretci-defteri";

const form = document.getElementById("form");
const isimInput = document.getElementById("isim");
const mesajInput = document.getElementById("mesaj");
const liste = document.getElementById("liste");
const sayac = document.getElementById("sayac");

function yukle() {
  try {
    return JSON.parse(localStorage.getItem(ANAHTAR)) || [];
  } catch {
    return [];
  }
}

function kaydet(kayitlar) {
  try {
    localStorage.setItem(ANAHTAR, JSON.stringify(kayitlar));
  } catch {
    // Gizli sekme vb. durumlarda kayıt yapılamazsa sayfa yine çalışır.
  }
}

let kayitlar = yukle();

function goster() {
  liste.innerHTML = "";

  if (kayitlar.length === 0) {
    const li = document.createElement("li");
    li.className = "bos";
    li.textContent = "Henüz mesaj yok. İlk sen yaz!";
    liste.appendChild(li);
  }

  kayitlar.forEach((kayit, i) => {
    const li = document.createElement("li");

    const metin = document.createElement("div");
    const isim = document.createElement("strong");
    isim.textContent = kayit.isim;
    const mesaj = document.createElement("span");
    mesaj.textContent = kayit.mesaj;
    metin.append(isim, mesaj);

    const sil = document.createElement("button");
    sil.textContent = "Sil";
    sil.addEventListener("click", () => {
      kayitlar.splice(i, 1);
      kaydet(kayitlar);
      goster();
    });

    li.append(metin, sil);
    liste.appendChild(li);
  });

  sayac.textContent = `${kayitlar.length} mesaj`;
}

form.addEventListener("submit", (olay) => {
  olay.preventDefault();
  kayitlar.unshift({
    isim: isimInput.value.trim(),
    mesaj: mesajInput.value.trim(),
  });
  kaydet(kayitlar);
  form.reset();
  isimInput.focus();
  goster();
});

goster();

document.getElementById("tema").addEventListener("click", () => {
  document.body.classList.toggle("karanlik");
});
