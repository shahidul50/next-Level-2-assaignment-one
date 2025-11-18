const formatValue = (
  value: string | number | boolean
): string | number | boolean => {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value * 10;
  } else {
    return !value;
  }
};

const getLength = <T>(value: string | Array<T>): number => {
  if (typeof value === "string") {
    return value.length;
  } else if (Array.isArray(value)) {
    return value.length;
  }
  throw new Error("invalid type");
};

class Person {
  public name: string;
  public age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public getDetails() {
    return `'Name: ${this.name}, Age: ${this.age}'`;
  }
}

const filterByRating = (
  value: Array<{ title: string; rating: number }>
): Array<{ title: string; rating: number }> => {
  return value.filter((value) => value.rating >= 4 && value.rating <= 5);
};

const filterActiveUsers = (
  value: Array<{ id: number; name: string; email: string; isActive: boolean }>
): Array<{ id: number; name: string; email: string; isActive: boolean }> => {
  return value.filter((value) => value.isActive === true);
};

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}

const printBookDetails = (value: Book): void => {
  const availability = value.isAvailable ? "Yes" : "No";
  console.log(
    `Title: ${value.title}, Author: ${value.author}, Published: ${value.publishedYear}, Available: ${availability}`
  );
};

const getUniqueValues = (
  array1: (number | string)[],
  array2: (number | string)[]
): (number | string)[] => {
  const hashMap: any = {};
  for (let i = 0; i < array1.length; i++) {
    hashMap[`${array1[i]}`] = array1[i];
  }

  for (let i = 0; i < array2.length; i++) {
    if (!(array2[i] in hashMap)) {
      hashMap[`${array2[i]}`] = array2[i];
    }
  }

  const result: (string | number)[] = [];
  let index = 0;

  for (const value in hashMap) {
    result[index] = hashMap[value];
    index++;
  }

  return result;
};

interface Product {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
}

const calculateTotalPrice = (value: Array<Product>): number => {
  return value.reduce((totalPrice, product) => {
    const productPrice = product.price * product.quantity;
    if (product.discount && product.discount <= 100 && product.discount > 0) {
      const discountPrice = productPrice * (product.discount / 100);
      totalPrice += productPrice - discountPrice;
    } else {
      totalPrice += productPrice;
    }
    return totalPrice;
  }, 0);
};
