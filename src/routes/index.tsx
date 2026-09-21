import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  ShoppingBag,
  X,
} from "lucide-react";

import heroImage from "../assets/joker-hero.jpg";
import fadeImage from "../assets/joker-fade.jpg";
import beardImage from "../assets/joker-beard.jpg";
import equipmentImage from "../assets/joker-equipment.jpg";

type Language = "en" | "fr" | "ar";

const phoneDisplay = "06 84 42 39 74";
const whatsappNumber = "212684423974";
const instagramUrl = "https://www.instagram.com/1joker_barber?stkn=aDlsbXUycjBzZXJ0";
const mapUrl = "https://www.google.com/maps/search/?api=1&query=Joker+Barber+Hay+Al+Wahda+Rabat";

const copy = {
  en: {
    nav: ["Services", "Our work", "Equipment", "About"],
    book: "Book now",
    eyebrow: "BARBERING — RABAT",
    titleA: "Sharp cuts.",
    titleB: "Made personal.",
    intro: "Precision barbering in Hay Al Wahda, Rabat. Clean fades, sharp lines and an experience built around your style.",
    bookChair: "Book a chair",
    location: "HAY AL WAHDA · RABAT",
    direct: "DIRECT BOOKING",
    whatsapp: "CONFIRMED ON WHATSAPP",
    services: "Services & prices",
    menu: "MENU",
    askPrice: "Ask for price",
    serviceNames: ["Classic cut", "Skin fade", "Beard sculpt", "Cut + beard", "Hot towel shave", "Kids cut"],
    gallery: "The work",
    galleryText: "A closer look at the detail, finish and craft behind every appointment.",
    instagram: "See more on Instagram",
    equipment: "Barber equipment",
    equipmentText: "Professional essentials selected for barbers who care about clean tools and consistent results.",
    products: ["Clippers & trimmers", "Scissors & combs", "Brushes & accessories"],
    askWhatsapp: "Ask on WhatsApp",
    about: "About",
    aboutTitle: "One chair. One standard.",
    aboutText: "Joker Barber is a neighborhood barbershop in Hay Al Wahda, Rabat, focused on precise work, personal service and a clean finish.",
    reviewTitle: "Already visited us?",
    reviewText: "Share your latest cut and tag @1joker_barber. Your look could be featured here.",
    follow: "Follow Joker Barber",
    booking: "BOOKING",
    reserve: "Reserve your chair.",
    reserveText: "Choose your service and preferred time. Your request opens in WhatsApp for quick confirmation.",
    name: "Name",
    phone: "Phone",
    service: "Service",
    date: "Date",
    time: "Time",
    choose: "Choose a service",
    send: "Send booking request",
    find: "Find us",
    address: "Hay Al Wahda, Rabat",
    directions: "Open in Google Maps",
    contact: "CONTACT",
    visit: "VISIT",
    rights: "All rights reserved.",
    bookingMessage: "Hello Joker Barber, I would like to book an appointment.",
    customer: "Name",
    preferred: "Preferred",
    shopMessage: "Hello Joker Barber, I would like information about",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  fr: {
    nav: ["Services", "Nos réalisations", "Équipement", "À propos"],
    book: "Réserver",
    eyebrow: "BARBIER — RABAT",
    titleA: "Coupes nettes.",
    titleB: "Style personnel.",
    intro: "Barbier de précision à Hay Al Wahda, Rabat. Dégradés nets, contours soignés et service adapté à votre style.",
    bookChair: "Réserver un fauteuil",
    location: "HAY AL WAHDA · RABAT",
    direct: "RÉSERVATION DIRECTE",
    whatsapp: "CONFIRMATION SUR WHATSAPP",
    services: "Services & tarifs",
    menu: "MENU",
    askPrice: "Demander le prix",
    serviceNames: ["Coupe classique", "Dégradé à blanc", "Taille de barbe", "Coupe + barbe", "Rasage serviette chaude", "Coupe enfant"],
    gallery: "Nos réalisations",
    galleryText: "Un aperçu du détail, de la finition et du savoir-faire derrière chaque rendez-vous.",
    instagram: "Voir plus sur Instagram",
    equipment: "Équipement de barbier",
    equipmentText: "Des essentiels professionnels pour les barbiers qui exigent des outils propres et des résultats réguliers.",
    products: ["Tondeuses & finitions", "Ciseaux & peignes", "Brosses & accessoires"],
    askWhatsapp: "Demander sur WhatsApp",
    about: "À PROPOS",
    aboutTitle: "Un fauteuil. Un standard.",
    aboutText: "Joker Barber est un salon de quartier à Hay Al Wahda, Rabat, consacré au travail précis, au service personnalisé et aux finitions nettes.",
    reviewTitle: "Déjà venu chez nous ?",
    reviewText: "Partagez votre dernière coupe et identifiez @1joker_barber. Votre look pourra apparaître ici.",
    follow: "Suivre Joker Barber",
    booking: "RÉSERVATION",
    reserve: "Réservez votre fauteuil.",
    reserveText: "Choisissez votre service et l’horaire souhaité. La demande s’ouvre sur WhatsApp pour une confirmation rapide.",
    name: "Nom",
    phone: "Téléphone",
    service: "Service",
    date: "Date",
    time: "Heure",
    choose: "Choisir un service",
    send: "Envoyer la demande",
    find: "Nous trouver",
    address: "Hay Al Wahda, Rabat",
    directions: "Ouvrir dans Google Maps",
    contact: "CONTACT",
    visit: "ADRESSE",
    rights: "Tous droits réservés.",
    bookingMessage: "Bonjour Joker Barber, je souhaite réserver un rendez-vous.",
    customer: "Nom",
    preferred: "Créneau souhaité",
    shopMessage: "Bonjour Joker Barber, je souhaite des informations sur",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
  },
  ar: {
    nav: ["الخدمات", "أعمالنا", "معدات الحلاقة", "من نحن"],
    book: "احجز الآن",
    eyebrow: "حلاقة احترافية — الرباط",
    titleA: "حلاقة دقيقة.",
    titleB: "أسلوبك الخاص.",
    intro: "حلاقة احترافية في حي الوحدة بالرباط. تدرجات نظيفة، تحديد دقيق، وتجربة تناسب أسلوبك.",
    bookChair: "احجز موعدك",
    location: "حي الوحدة · الرباط",
    direct: "حجز مباشر",
    whatsapp: "التأكيد عبر واتساب",
    services: "الخدمات والأسعار",
    menu: "القائمة",
    askPrice: "اسأل عن السعر",
    serviceNames: ["حلاقة كلاسيكية", "تدرج زيرو", "تهذيب اللحية", "حلاقة ولحية", "حلاقة بالمنشفة الساخنة", "حلاقة الأطفال"],
    gallery: "أعمالنا",
    galleryText: "نظرة أقرب على الدقة واللمسات النهائية والمهارة في كل موعد.",
    instagram: "شاهد المزيد على إنستغرام",
    equipment: "معدات الحلاقة",
    equipmentText: "أساسيات احترافية للحلاقين الذين يهتمون بجودة الأدوات وثبات النتائج.",
    products: ["ماكينات الحلاقة والتحديد", "المقصات والأمشاط", "الفُرش والإكسسوارات"],
    askWhatsapp: "اسأل عبر واتساب",
    about: "من نحن",
    aboutTitle: "كرسي واحد. معيار واحد.",
    aboutText: "جوكر باربر صالون حلاقة في حي الوحدة بالرباط، يهتم بالدقة والخدمة الشخصية والنتيجة النظيفة.",
    reviewTitle: "زرتنا من قبل؟",
    reviewText: "شارك حلاقتك الجديدة واذكر @1joker_barber. قد نعرض إطلالتك هنا.",
    follow: "تابع جوكر باربر",
    booking: "الحجز",
    reserve: "احجز كرسيك.",
    reserveText: "اختر الخدمة والوقت المناسب. سيفتح طلبك في واتساب للتأكيد السريع.",
    name: "الاسم",
    phone: "الهاتف",
    service: "الخدمة",
    date: "التاريخ",
    time: "الوقت",
    choose: "اختر خدمة",
    send: "إرسال طلب الحجز",
    find: "موقعنا",
    address: "حي الوحدة، الرباط",
    directions: "فتح في خرائط Google",
    contact: "اتصل بنا",
    visit: "العنوان",
    rights: "جميع الحقوق محفوظة.",
    bookingMessage: "مرحباً جوكر باربر، أود حجز موعد.",
    customer: "الاسم",
    preferred: "الموعد المفضل",
    shopMessage: "مرحباً جوكر باربر، أود معلومات عن",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
  },
} as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Joker Barber Rabat | Barber Shop in Hay Al Wahda" },
      { name: "description", content: "Book a precision haircut at Joker Barber in Hay Al Wahda, Rabat. Explore our work and professional barber equipment." },
      { property: "og:title", content: "Joker Barber — Rabat" },
      { property: "og:description", content: "Precision cuts, beard care and professional barber equipment in Hay Al Wahda, Rabat." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function SectionHeading({ title, code }: { title: string; code: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
      <h2 className="font-display text-3xl uppercase leading-none md:text-4xl">{title}</h2>
      <span className="font-mono text-[10px] uppercase text-muted md:text-xs">({code})</span>
    </div>
  );
}

function Index() {
  const [language, setLanguage] = useState<Language>("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const isArabic = language === "ar";

  const sectionLinks = useMemo(
    () => [
      ["#services", t.nav[0]],
      ["#gallery", t.nav[1]],
      ["#equipment", t.nav[2]],
      ["#about", t.nav[3]],
    ],
    [t],
  );

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      t.bookingMessage,
      `${t.customer}: ${String(form.get("name") ?? "")}`,
      `${t.phone}: ${String(form.get("phone") ?? "")}`,
      `${t.service}: ${String(form.get("service") ?? "")}`,
      `${t.preferred}: ${String(form.get("date") ?? "")} ${String(form.get("time") ?? "")}`,
    ].join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <div dir={isArabic ? "rtl" : "ltr"} lang={language} className={isArabic ? "font-ar" : "font-body"}>
      <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-5">
          <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="Joker Barber home">
            <span className="grid size-8 place-items-center rounded-md bg-accent font-display text-lg text-accent-foreground">J</span>
            <span className="leading-none">
              <span className="block font-display text-lg uppercase text-frost">Joker Barber</span>
              <span className="mt-0.5 block font-mono text-[8px] text-muted">RABAT · MA</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-muted lg:flex" aria-label="Primary navigation">
            {sectionLinks.map(([href, label]) => <a key={href} href={href} className="transition-colors hover:text-frost">{label}</a>)}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-line bg-panel p-0.5 text-[11px] font-semibold" aria-label="Language">
              {(["fr", "en", "ar"] as Language[]).map((code) => (
                <button key={code} type="button" onClick={() => setLanguage(code)} aria-pressed={language === code} className={`min-w-8 rounded px-2 py-1.5 uppercase transition-colors ${language === code ? "bg-frost text-ink" : "text-muted hover:text-frost"}`}>{code === "ar" ? "ع" : code}</button>
              ))}
            </div>
            <a href="#book" className="hidden rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-colors hover:bg-frost sm:inline-flex">{t.book}</a>
            <button type="button" className="grid size-9 place-items-center rounded-md border border-line text-frost lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? t.menuClose : t.menuOpen}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-line bg-ink px-4 py-4 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-6xl gap-1">
              {sectionLinks.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-sm text-muted hover:bg-panel hover:text-frost">{label}</a>)}
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-line/70">
          <div className="ambient-light" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-5 pb-14 pt-14 lg:grid-cols-12 lg:pt-20">
            <div className="lg:col-span-7">
              <p className="reveal font-mono text-[10px] uppercase text-accent md:text-xs">{t.eyebrow}</p>
              <h1 className="reveal delay-1 mt-5 font-display text-[clamp(4.2rem,11vw,8rem)] uppercase leading-[0.84] text-frost">
                {t.titleA}<br /><span className="text-accent">{t.titleB}</span>
              </h1>
              <p className="reveal delay-2 mt-7 max-w-xl text-base leading-7 text-muted">{t.intro}</p>
              <div className="reveal delay-3 mt-8 flex flex-wrap gap-3">
                <a href="#book" className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-bold text-accent-foreground transition-colors hover:bg-frost"><CalendarDays size={17} />{t.bookChair}</a>
                <a href="tel:0684423974" className="inline-flex items-center gap-2 rounded-md border border-line bg-panel/60 px-5 py-3 font-mono text-sm text-accent transition-colors hover:border-frost/50"><Phone size={16} />{phoneDisplay}</a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase text-muted md:text-xs">
                <span>{t.location}</span><span>{t.direct}</span><span className="text-accent">{t.whatsapp}</span>
              </div>
            </div>
            <div className="reveal delay-2 lg:col-span-5">
              <div className="relative overflow-hidden rounded-xl border border-frost/10 bg-panel">
                <img src={heroImage} alt="Barber giving a precise fade haircut in a dark Rabat barbershop" width={1024} height={1280} fetchPriority="high" className="aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-lg border border-frost/10 bg-ink/80 px-4 py-3 backdrop-blur-md">
                  <span className="font-mono text-[9px] uppercase text-muted">Joker Barber</span>
                  <span className="font-mono text-[9px] uppercase text-accent">Hay Al Wahda · Rabat</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
          <SectionHeading title={t.services} code={`A · ${t.menu}`} />
          <div className="mt-7 grid md:grid-cols-2 md:gap-x-12">
            {t.serviceNames.map((service, index) => (
              <a key={service} href={whatsappUrl(`${t.bookingMessage}\n${t.service}: ${service}`)} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-5 border-b border-line/70 py-4">
                <span className="flex items-center gap-3 font-medium text-frost"><span className="font-mono text-[10px] text-muted">0{index + 1}</span>{service}</span>
                <span className="flex items-center gap-2 text-xs text-accent">{t.askPrice}<ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </a>
            ))}
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20">
          <SectionHeading title={t.gallery} code="B · INSTAGRAM" />
          <div className="mt-7 grid gap-4 md:grid-cols-12">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-lg md:col-span-7">
              <img src={fadeImage} alt="Joker Barber inspired skin fade portfolio" width={768} height={960} loading="lazy" className="aspect-[5/4] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-md bg-ink/80 px-3 py-2 text-xs text-frost backdrop-blur"><Instagram size={15} />@1joker_barber</span>
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-lg md:col-span-5">
              <img src={beardImage} alt="Joker Barber inspired beard shaping portfolio" width={768} height={960} loading="lazy" className="aspect-[5/4] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
            </a>
          </div>
          <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-6 text-muted">{t.galleryText}</p>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-frost"><Instagram size={17} />{t.instagram}<ArrowUpRight size={15} /></a>
          </div>
        </section>

        <section id="equipment" className="border-y border-line/70 bg-panel/45">
          <div className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
            <SectionHeading title={t.equipment} code="C · SHOP" />
            <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:items-stretch">
              <div className="overflow-hidden rounded-lg lg:col-span-7">
                <img src={equipmentImage} alt="Professional barber clippers, scissors, comb and brush" width={1024} height={768} loading="lazy" className="h-full min-h-72 w-full object-cover" />
              </div>
              <div className="flex flex-col lg:col-span-5">
                <p className="mb-5 text-sm leading-6 text-muted">{t.equipmentText}</p>
                <div className="border-t border-line">
                  {t.products.map((product, index) => (
                    <a key={product} href={whatsappUrl(`${t.shopMessage} ${product}.`)} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 border-b border-line py-5">
                      <span><span className="mb-1 block font-mono text-[9px] text-muted">0{index + 1}</span><span className="font-semibold text-frost">{product}</span></span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground transition-colors group-hover:bg-frost"><MessageCircle size={17} /></span>
                    </a>
                  ))}
                </div>
                <a href={whatsappUrl(`${t.shopMessage} ${t.equipment}.`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-accent px-5 py-3 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"><ShoppingBag size={17} />{t.askWhatsapp}</a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-6xl scroll-mt-24 gap-5 px-5 py-20 lg:grid-cols-12">
          <div className="border-t border-line pt-6 lg:col-span-7">
            <p className="font-mono text-[10px] uppercase text-accent">(D) {t.about}</p>
            <h2 className="mt-4 max-w-xl font-display text-5xl uppercase leading-none text-frost md:text-6xl">{t.aboutTitle}</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted">{t.aboutText}</p>
          </div>
          <div className="rounded-lg border border-line bg-panel p-6 lg:col-span-5">
            <Instagram className="text-accent" size={23} />
            <h3 className="mt-5 text-xl font-semibold text-frost">{t.reviewTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{t.reviewText}</p>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-frost">{t.follow}<ArrowUpRight size={15} /></a>
          </div>
        </section>

        <section id="book" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20">
          <div className="relative overflow-hidden rounded-xl border border-frost/10 bg-panel p-6 md:p-10">
            <div className="booking-light" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="font-mono text-[10px] uppercase text-accent">(E) {t.booking}</span>
                <h2 className="mt-4 font-display text-5xl uppercase leading-none text-frost md:text-6xl">{t.reserve}</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-muted">{t.reserveText}</p>
              </div>
              <form onSubmit={submitBooking} className="grid gap-4 rounded-lg border border-line bg-ink/60 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="field-label">{t.name}<input name="name" required autoComplete="name" className="field" /></label>
                  <label className="field-label">{t.phone}<input name="phone" type="tel" required autoComplete="tel" className="field" /></label>
                </div>
                <label className="field-label">{t.service}<span className="relative mt-2 block"><select name="service" required defaultValue="" className="field mt-0 appearance-none pr-10"><option value="" disabled>{t.choose}</option>{t.serviceNames.map((service) => <option key={service}>{service}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" /></span></label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="field-label">{t.date}<input name="date" type="date" required className="field" /></label>
                  <label className="field-label">{t.time}<input name="time" type="time" required className="field" /></label>
                </div>
                <button type="submit" className="mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 font-bold text-accent-foreground transition-colors hover:bg-frost"><MessageCircle size={18} />{t.send}</button>
              </form>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-panel/40">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:items-center">
            <div>
              <span className="font-mono text-[10px] uppercase text-accent">(F) {t.find}</span>
              <h2 className="mt-4 font-display text-5xl uppercase leading-none text-frost">{t.address}</h2>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-accent-foreground hover:bg-frost"><MapPin size={17} />{t.directions}</a>
                <a href="tel:0684423974" className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 font-mono text-sm text-frost hover:border-frost"><Phone size={16} />{phoneDisplay}</a>
              </div>
            </div>
            <a href={mapUrl} target="_blank" rel="noreferrer" className="map-grid group relative grid min-h-64 place-items-center overflow-hidden rounded-lg border border-line bg-ink">
              <span className="absolute size-36 rounded-full border border-accent/20" /><span className="absolute size-20 rounded-full border border-accent/40" />
              <span className="relative grid size-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-accent"><MapPin size={22} /></span>
              <span className="absolute bottom-4 inline-flex items-center gap-2 text-xs font-semibold text-frost">Hay Al Wahda, Rabat<ArrowUpRight size={14} /></span>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-ink">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-3">
          <div><p className="font-display text-2xl uppercase text-frost">Joker Barber</p><p className="mt-2 font-mono text-[10px] text-muted">jokerbarber.ma</p></div>
          <div><p className="font-mono text-[10px] text-muted">{t.contact}</p><a href="tel:0684423974" className="mt-2 block text-sm text-frost hover:text-accent">{phoneDisplay}</a><a href={instagramUrl} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-2 text-sm text-muted hover:text-accent"><Instagram size={14} />@1joker_barber</a></div>
          <div><p className="font-mono text-[10px] text-muted">{t.visit}</p><p className="mt-2 text-sm text-frost">{t.address}</p><p className="mt-5 text-xs text-muted">© {new Date().getFullYear()} Joker Barber. {t.rights}</p></div>
        </div>
      </footer>
    </div>
  );
}