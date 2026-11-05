import type { Holiday } from "@/types/holiday";

type HolidayDefinition = Omit<Holiday, "date"> & {
  month: number;
  day: number;
};

const holidays: HolidayDefinition[] = [
  {
    day: 1,
    month: 1,
    name: "Ano Novo",
    nameEn: "New Year's Day",
    description: "Celebração do início do ano.",
    type: "national",
    countryCode: "MZ",
  },
  {
    day: 3,
    month: 2,
    name: "Dia dos Heróis Moçambicanos",
    nameEn: "Mozambican Heroes' Day",
    description: "Homenagem aos heróis nacionais.",
    type: "national",
    countryCode: "MZ",
  },
  {
    day: 7,
    month: 4,
    name: "Dia da Mulher Moçambicana",
    nameEn: "Mozambican Women's Day",
    description: "Homenagem à mulher moçambicana.",
    type: "national",
    countryCode: "MZ",
  },
  {
    day: 1,
    month: 5,
    name: "Dia Internacional dos Trabalhadores",
    nameEn: "Labour Day",
    description: "Celebração dos trabalhadores.",
    type: "national",
    countryCode: "MZ",
  },
  {
    day: 25,
    month: 6,
    name: "Dia da Independência Nacional",
    nameEn: "Independence Day",
    description: "Independência de Moçambique em 1975.",
    type: "national",
    countryCode: "MZ",
  },
  {
    day: 7,
    month: 9,
    name: "Dia dos Acordos de Lusaka",
    nameEn: "Lusaka Accords Day",
    description: "Assinatura dos Acordos de Lusaka.",
    type: "national",
    countryCode: "MZ",
  },
  {
    day: 25,
    month: 9,
    name: "Dia das Forças Armadas",
    nameEn: "Armed Forces Day",
    description: "Início da Luta Armada de Libertação Nacional.",
    type: "national",
    countryCode: "MZ",
  },
  {
    day: 4,
    month: 10,
    name: "Dia da Paz e Reconciliação Nacional",
    nameEn: "Peace and National Reconciliation Day",
    description: "Celebração do Acordo Geral de Paz.",
    type: "national",
    countryCode: "MZ",
  },
  {
    day: 25,
    month: 12,
    name: "Dia da Família",
    nameEn: "Family Day",
    description: "Celebração da família.",
    type: "national",
    countryCode: "MZ",
  },
];

export default holidays;
