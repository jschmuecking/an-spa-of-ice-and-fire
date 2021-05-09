import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appTitle: "An SPA of Ice and Fire",
      overview: {
        header: "Houses Overview",
      },
      houseDetail: {
        region: "Region",
        coatOfArms: "Coat of Arms",
        words: "Words",
        titles: "Titles",
        seats: "Seats",
        currentLord: "Current Lord",
        heir: "Heir",
        overlord: "Overlord",
        founder: "Founder",
        founded: "Founded",
        diedOut: "Died out",
        ancestralWeapons: "Ancestral Weapons",
        cadetBranches: "Cadet Branches",
        ui: {
          backButton: "Back to Overview",
        },
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
