          /\                     /\       
         /  \    /\      /\     /  \      
        /    \  /  \    /  \   /    \     
       /      \/    \  /    \ /      \    
      /                \/                 \
     /      _.-"""""-._       /\          \
    /   _.-'           '-._  /  \          \
   /_.-'                   '-._\_\__________\

         "Her dolaşan kaybolmuş değildir." 
                          — Bilbo Baggins

                          

# Bilet Satın Alma Projesi 🚌💻

> Bu proje **Sibervatan Yavuzlar Takımı** için yapılan ödev çalışmasıdır.

Online otobüs bileti satın alma ve yönetim uygulaması. Kullanıcılar bilet arar ve satın alır, firmalar sefer ve otobüs yönetir.

---

## 🚀 Özellikler

| Özellik | Açıklama |
|---------|----------|
| 👤 Kullanıcı Rolleri | Gezgin kullanıcılar için bilet arama ve satın alma |
| 🏢 Firma Rolleri | Sefer ve otobüs yönetimi |
| 🔍 Sefer Arama | Tarih, kalkış-varış ve saat filtreleme |
| 💺 Koltuk Seçimi | Dinamik koltuk seçimi ve rezervasyon |
| ⚙️ Yönetici Paneli | Kullanıcı ve firma yönetimi |
| 💻 Docker Destekli | Bağımlılıklar olmadan hızlı kurulum |

---

## 🧪 Proje Test Hesapları

### Admin Hesabı (admin)

| E-mail                | Şifre      |
|-----------------------|------------|
| `admin@galileoff.com` | `faulkner` |

### Gezgin (user) Hesapları

| Kullanıcı Adı      | E-mail          | Şifre    |
|--------------------|-----------------|----------|
| Thranduil Ayışığı  | `moon@user.com` | `gezgin` |
| Vaerion Duskmantle | `vae@user.com`  | `gezgin` |

### Firma (company) Hesapları

| Firma Adı          | Yetkili Adı       | E-mail                 | Şifre      |
|--------------------|-------------------|------------------------|------------|
| Shadowfax Express  | Morwen Yolışığı   | `morwen@shadowfax.com` | `shadow`   |
| Lothlórien Glide   | Elenwë Mithrellas | `elenwe@loth.com`      | `lothlor`  |
| Lothlórien Glide   | Thalion Eärendur  | `thalion@loth.com`     | `lothlor`  |
| Mount Doom Transit | Dûrinel Forgevein | `duri@doom.com`        | `mount`    |
| Minas Tirith Lines | Míriel Anorwen    | `miri@minas.com`       | `minas`    |
| Khazad-dûm Coach   | Borin Granitehelm | `borin@khazad.com`     | `coach`    |
| Hobbiton Hopper    | Frodan Tealeaf    | `frodan@hopper.com`    | `hobbiton` |

---

## ⚙️ Nasıl Kullanılır (Docker)

| Adım | Açıklama | Komut |
|------|----------|-------|
| 1️⃣ Klonla | Depoyu yerel bilgisayara al | `git clone https://github.com/galile0ff/bilet-satin-alma.git`<br>`cd bilet-satin-alma` |
| 2️⃣ Docker İmajı Oluştur | Uygulama imajını hazırla | `docker compose up --build` |
| 3️⃣ Konteyneri Çalıştır | Uygulamayı başlat | `docker run -d -p 3000 bilet-satin-alma` |
| 4️⃣ Aç | Tarayıcıda projeyi aç | [http://localhost:3000](http://localhost:3000) |

> 🔹 Test kullanıcılarıyla giriş yaparak tüm rolleri deneyebilirsiniz.

---

## Star History

<a href="https://www.star-history.com/#galile0ff/bilet-satin-alma&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=galile0ff/bilet-satin-alma&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=galile0ff/bilet-satin-alma&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=galile0ff/bilet-satin-alma&type=date&legend=top-left" />
 </picture>
</a>

## 📝 Notlar

- Bu proje eğitim amacıyla hazırlanmıştır.  
- Docker sayesinde bağımlılıklarla uğraşmadan çalıştırabilirsiniz.  
- Test hesapları önceden hazırlanmıştır.

---
