export const categories = [
  { name: "Nasional", keyword: ["nasional", "indonesia", "dpr", "presiden"] },
  { name: "Internasional", keyword: ["amerika", "israel", "cina", "dunia"] },
  { name: "Ekonomi", keyword: ["ekonomi", "rupiah", "bisnis", "bursa", "investasi"] },
  { name: "Olahraga", keyword: ["bola", "timnas", "olahraga", "liga", "fifa"] },
  { name: "Teknologi", keyword: ["teknologi", "gadget", "ai", "internet", "startup"] },
  { name: "Hiburan", keyword: ["film", "musik", "selebriti", "drama", "hiburan"] },
  { name: "Gaya Hidup", keyword: ["gaya hidup", "kesehatan", "kuliner", "travel", "lifestyle"] },
];

export const getCategoryFromTitle = (title) => {
  const lowerTitle = title.toLowerCase();
  for (const category of categories) {
    if (category.keyword.some((kw) => lowerTitle.includes(kw))) {
      return category.name;
    }
  }
  return "Lainnya";
};
