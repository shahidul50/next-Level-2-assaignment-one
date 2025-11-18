### TypeScript এ interfaces এবং types এর মধ্যে পার্থক্য কি?

TypeScript এ interface এবং type দুটিকে Type Define করার ব্যবহার করা হয়। দুইটার মাধ্যমেই আমারা সুন্দরভাবে Type Define করতে পারি। কিন্তু এদের মধ্যে কিছু পার্থক্য আছে। যেমন:

- Type আমরা যেকোন Data এর ক্ষেত্রে ভালভাবে ব্যবহার করতে পারব। কিন্তু interface শুধুমাত্র Object type এর Data এর ক্ষেত্রে ভালভাবে ব্যবহার করতে পারব।
- Union বা intersection করার প্রয়োজন পড়লে আমরা type ব্যবহার করতে পারি। আর extends করার প্রয়োজন পড়লে আমরা interface ব্যবহার করতে পারি।
- একই নামের দুইটি type, Type Alias এর মাধ্যমে তৈরি করলে তা Merge হবে না। কিন্তু একই নামের দুইটি type, Interface এর মাধ্যমে তৈরি করলে করলে তা আগেরটার সাথে Merge হয়ে যায়।
  উদাহারণঃ

```ts
type IsAdmin = boolean;

const isAdmin: IsAdmin = true;

// interface IsAdmin1 = boolean   //! Interface দিয়ে Primitive Data এর ক্ষেত্রে আমরা এইভাবে লিখতে পারব না। তাই Primitive Data এর ক্ষেত্রে type Alias ব্যবহার করা সুবিধাজনক কারণ type Alias এর ক্ষেত্রে আমরা Equal Sign(=) দিয়ে type defined করতে পারি খুব সহজে।

//with Type Alias
type User = {
  name: string;
  age: number;
};

type Role = {
  role: "admin" | "user";
};

type UserWithRole = User & Role; // এই type টা User Type এবং Role Type এর সমন্ময়ে তৈরি হবে।

//with Interface
interface IUser {
  name: string;
  age: number;
}

interface IRole {
  role: "admin" | "user";
}

interface IUserWithRole extends IUser {
  role: "admin" | "user";
} // এই type টা User Type এবং Role Type এর সমন্ময়ে তৈরি হবে।
```

### TypeScript এ any, unknown এবং never type এর মধ্যে পার্থক্য কি?

TypeScript এ any type হচ্ছে এমন type যার মধ্যে যেকোন type এর data রাখা যায়। এই type ব্যবহার করলে TypeScript আর কোন type চেক করবে না। তখন আমরা যে variable এ any type দিয়ে define করব সেটাতে চাইলে আমারা যেকোন type এর Data রাখতে পারব। যেমন-

```ts
let number1: any = 21;
number1 = "Hello World";

console.log(number1); // 'Hello World'
```

TypeScript এ unknown type হচ্ছে এমন type যার মধ্যে যেকোন type এর ডাটা রাখা যায়। তবে ব্যবহার করার আগে অবশ্যই type চেক করে নিতে হবে কারণ TypeScript Compiler type যাচাই করার জন্য বাধ্য করে থাকে। unknown type, any type এর থেকে বেশি নিরাপদ হয়ে থাকে। যেমনঃ

```ts
let value: unknown = "Hello World";

if (typeof value === "string") {
  console.log(value.toUpperCase()); // নিরাপদ
}
```

TypeScript এ never type হচ্ছে এমন type যা কখনো কোন মান ধরে রাখে না। অর্থাৎ এমন মান যা কখনো পাওয়া সম্ভব না। এমন কিছু Function আছে যা কখনো কিছু return করে না সেই সব ক্ষেত্রে এই never type ব্যবহার করা হয়। যেমনঃ

```ts
function fail(msg: string): never {
  throw new Error(msg); //এখান থেকে কোন return মান যাওয়া সম্ভব না।
}
```

### TypeScript এ keyof keyword এর ব্যবহার কি? উদাহারণের মাধ্যমে বুঝিয়ে দাও।

TypeScript-এ keyof হলো একটি type operator যা কোনো object type-এর সকল key এর union type তৈরি করে দেয়।
এটি মূলত object এর key গুলোকে type হিসেবে ব্যবহার করতে সাহায্য করে থাকে। উদাহারণঃ

```ts
type RichPeoplesVehicle = {
  car: string;
  bike: string;
  cng: string;
};

type MyVehicle1 = "bike" | "cng" | "car";
type MyVehicle2 = keyof RichPeoplesVehicle;

const myVehicle: MyVehicle2 = "bike";
```

এছাড়া কোন একটা Function এর মধ্যে Object এর key ব্যবহার করার প্রয়োজন হলে সেক্ষেত্রে Object key ভুল না টাইপ করার জন্যও এটা ব্যবহার করা যায়। উদাহারণঃ

```ts
type User = {
  id: number;
  name: string;
  age: number;
};

function getUserValue(user: User, key: keyof User) {
  return user[key];
}

const user: User = { id: 101, name: "Mr. X", age: 29 };

getUserValue(user, "name");
getUserValue(user, "age");
getUserValue(user, "email"); // Error Provide করবে কারণ এই ্নামের কোন key নেই।
```
