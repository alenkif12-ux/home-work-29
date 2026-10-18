function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Очікував ${expected}, отримав ${actual}`);
      }
    },
  };
}

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.log(`❌ ${name}\n   ${error.message}`);
  }
}

const getAgeCategory = (age) => {
    if (typeof age !== 'number' || age < 0 || Number.isNaN(age)) {
        return 'некоректний вік';
    }
    if (age <= 12) {
        return 'дитина';
    }
    if (age <= 17) {
        return 'підліток';
    }
    if (age <= 64) {
        return 'дорослий';
    }
    if (age >= 65) {
        return 'пенсіонер';
    }
}

test("Вік 5 має повернути 'дитина'", () => {
  const result = getAgeCategory(5);
  expect(result).toBe('дитина');
});

test("Вік 12 має повернути 'дитина'", () => {
  const result = getAgeCategory(12);
  expect(result).toBe('дитина');
});

test("Вік 13 має повернути 'підліток'", () => {
    const result = getAgeCategory(13);
    expect(result).toBe('підліток');
});

test("Вік 20 має повернути 'дитина'", () => {
  const result = getAgeCategory(20);
  expect(result).toBe('дитина'); 
});

test("Вік 17 має повернути 'підліток'", () => {
  const result = getAgeCategory(17);
  expect(result).toBe('підліток'); 
});

test("Вік 18 має повернути 'дорослий'", () => {
  const result = getAgeCategory(18);
  expect(result).toBe('дорослий'); 
});

test("Вік 64 має повернути 'дорослий'", () => {
  const result = getAgeCategory(64);
  expect(result).toBe('дорослий'); 
});

test("Вік 65 має повернути 'пенсіонер'", () => {
  const result = getAgeCategory(65);
  expect(result).toBe('пенсіонер'); 
});

test("Вік str має повернути 'некоректний вік'", () => {
  const result = getAgeCategory('str');
  expect(result).toBe('некоректний вік'); 
});

const calculateTotal = (price, quantity, discount = 0) => {
    if (price < 0 || quantity < 0 || discount < 0 || discount > 100) {
        return null;
    }
    const basePrice = price * quantity;
    const discountAmount = (basePrice * discount) / 100;
    
    return basePrice - discountAmount;
};

test("1. Без знижки (100, 3) має повернути 300", () => {
  const result = calculateTotal(100, 3);
  expect(result).toBe(300);
});

test("2. Зі знижкою 10% (100, 3, 10) має повернути 270", () => {
  const result = calculateTotal(100, 3, 10);
  expect(result).toBe(270);
});

test("3. Знижка явно 0 (100, 3, 0) має повернути 300", () => {
  const result = calculateTotal(100, 3, 0);
  expect(result).toBe(300);
});

test("4. Знижка 100% (100, 3, 100) має повернути 0", () => {
  const result = calculateTotal(100, 3, 100);
  expect(result).toBe(0);
});

test("5. Кількість 0 (100, 0, 10) має повернути 0", () => {
  const result = calculateTotal(100, 0, 10);
  expect(result).toBe(0);
});

test("6. Некоректні дані: від'ємна ціна (-50, 2) має повернути null", () => {
  const result = calculateTotal(-50, 2);
  expect(result).toBe(null);
});

test("7. Некоректні дані: знижка більше 100 (100, 2, 120) має повернути null", () => {
  const result = calculateTotal(100, 2, 120);
  expect(result).toBe(null);
});