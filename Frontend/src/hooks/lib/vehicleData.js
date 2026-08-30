// 18 veículos elétricos + 21 veículos a combustão

export const electricVehicles = [
  { id: "ev1",  brand: "Mercedes-Benz", model: "EQE SUV",      year: 2026, price: "R$ 729.900",   consumptionNum: 18.9, category: "SUV",   ... },
  { id: "ev2",  brand: "Mercedes-Benz", model: "EQS SUV",      year: 2026, price: "R$ 1.199.900", consumptionNum: 20.5, category: "SUV",   ... },
  { id: "ev3",  brand: "Seres",         model: "Seres 3",       year: 2026, price: "R$ 199.900",   consumptionNum: 15.5, category: "SUV",   ... },
  { id: "ev4",  brand: "Tesla",         model: "Model Y",       year: 2026, price: "R$ 429.900",   consumptionNum: 16.1, category: "SUV",   ... },
  { id: "ev5",  brand: "Nissan",        model: "Leaf",          year: 2026, price: "R$ 299.900",   consumptionNum: 15.8, category: "Hatch", ... },
  // ... 18 veículos elétricos no total
];

export const combustionVehicles = [
  { id: "cv1",  brand: "Volkswagen",    model: "UP",            year: 2026, price: "R$ 63.000",    consumptionNum: 12.9, category: "Hatch", ... },
  { id: "cv2",  brand: "Renault",       model: "Kwid 1.0",      year: 2026, price: "R$ 67.490",    consumptionNum: 13.5, category: "Hatch", ... },
  // ... 21 veículos a combustão no total
];

export const allVehicles = [...electricVehicles, ...combustionVehicles];
export const categories = ["Todos", "Hatch", "Sedan", "SUV", "Pickup"];