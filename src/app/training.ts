// Задание №3

function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(10, 15));

// Задание №4

let newStatus: 'loading' | 'success' | 'error';

newStatus = 'loading';

// Задание №5

let textFormat: 'uppercase' | 'lowercase' | 'capitalize';

textFormat = "lowercase";

// Задание №6

interface IUser {
  id: number;
  name: string;
  surname: string;
  email?: string;
}

// Задание №7

interface IPerson extends IUser {
  age: number;
  telephoneNumber: number;
}

// Задание №8

function formatText(
  text: string,
  format: 'uppercase' | 'lowercase' | 'capitalize'
): string {
  switch(format) {
    case 'uppercase':
      return text.toUpperCase();

    case 'lowercase':
      return text.toLowerCase();

    case 'capitalize':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  
    default:
      return text;
  }
}

// Задание №9

function removeSymbol(text: string, symbol: string): string {
  return text.replaceAll(symbol, "");
}

console.log(removeSymbol("class!", "!"));

// Задание №10

const users: IUser[] = [
  {
    id: 1,
    name: "Алексей",
    surname: "Петров"
  },
  {
    id: 2,
    name: "Игорь",
    surname: "Смирнов"
  },
  {
    id: 3,
    name: "Олег",
    surname: "Дятлов",
    email: "oleg.7@example.com"
  }
];

const filteredUsers = users.filter(user => user.id >= 2);

console.log(filteredUsers);