import { translations, projectsData } from "./translations.js";

const STORAGE_KEY = "lang";
const DEFAULT_LANG = "es";

export function getCurrentLang() {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }
  return DEFAULT_LANG;
}

export function setLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  applyTranslations(lang);
  updateLangButton(lang);
  window.dispatchEvent(new CustomEvent("lang-changed", { detail: { lang } }));
}

export function initI18n() {
  const savedLang = getCurrentLang();
  document.documentElement.lang = savedLang;
  applyTranslations(savedLang);
  updateLangButton(savedLang);
}

function updateLangButton(lang) {
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.textContent = lang === "es" ? "EN" : "ES";
  }
}

function applyTranslations(lang) {
  const t = translations[lang];

  document.querySelectorAll("[data-i18nav]").forEach((el) => {
    const key = el.getAttribute("data-i18nav");
    if (t.nav[key]) el.textContent = t.nav[key];
  });

  document.querySelectorAll("[data-i18hero]").forEach((el) => {
    const key = el.getAttribute("data-i18hero");
    if (t.hero[key]) el.textContent = t.hero[key];
  });

  document.querySelectorAll("[data-i18about]").forEach((el) => {
    const key = el.getAttribute("data-i18about");
    if (t.about[key]) el.textContent = t.about[key];
  });

  document.querySelectorAll("[data-i18skills]").forEach((el) => {
    const key = el.getAttribute("data-i18skills");
    if (t.skills[key]) el.textContent = t.skills[key];
  });

  document.querySelectorAll("[data-i18projects]").forEach((el) => {
    const key = el.getAttribute("data-i18projects");
    if (t.projects[key]) el.textContent = t.projects[key];
  });

  document.querySelectorAll("[data-i18contact]").forEach((el) => {
    const key = el.getAttribute("data-i18contact");
    if (t.contact[key]) el.textContent = t.contact[key];
  });

  document.querySelectorAll("[data-i18contact-label]").forEach((el) => {
    const key = el.getAttribute("data-i18contact-label");
    if (t.contact[key]) el.textContent = t.contact[key];
  });
}

if (typeof window !== "undefined") {
  window.initI18n = initI18n;
  window.setLang = setLang;
  window.getCurrentLang = getCurrentLang;
}