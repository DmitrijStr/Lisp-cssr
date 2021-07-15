/* Этот простой интерператор имеет возможность выполнения некоторых арифмитически операций.
   Пример ['*', 2, 2], ['+', 2, ['*', 2, 2]];
 * Имеет встроенные функции вывода на экран, объявления функций и переменных;
 * Расширяемость достигается за счёт добавления методов в объект dispatcher;
 * объявление глобальных переменных с помощью ключевого слова defvar;
 * объявление функций с помощью ключевого слова defn;
 * вывод в консоль с помощью функции princ;
 * учитываются имена параметров при вызове объявленной функции;
 */

// объект для хранения глобальных переменных и функций
const globalObj = {
  'sum3': (...calledArguments) => checkList(body, args, calledArguments),


};

// объект с базовыми операциями и функциями использующимеся в runtime
const dispatcher = {
  '+': (...args) => args.reduce((prev, curr) => prev + curr),
  '*': (...args) => args.reduce((prev, curr) => prev * curr),
  '-': (...args) => args.reduce((prev, curr) => prev - curr),

  defn: (...args) => defn(...args),
  princ: (...args) => console.log(...args),
  defvar: (name, value) => { globalObj[name] = value; },
  // ect basics operators and functions
};

const lookEnviroment = (arg) => {
  if (globalObj[arg]) {
    return globalObj[arg];
  } if (dispatcher[arg]) {
    return dispatcher[arg];
  } return arg;
};

const checkList = (body, argList = [], params = []) => {
  const [operation, ...rest] = body;
  if (operation === 'defn') { // guard exp for defn func
    lookEnviroment(operation).apply(dispatcher, rest);
  } else {
    const parsedArgs = rest.map((a) => {
      if (params[argList.indexOf(a)]) {
        return params[argList.indexOf(a)];
      }
      if (typeof a === 'object') {
        return checkList(a, argList, params);
      }
      return lookEnviroment(a);
    });

    return lookEnviroment(operation).apply(dispatcher, parsedArgs);
  }
};

const defn = (functionName, args, body) => {
  globalObj[functionName] = (...calledArguments) => checkList(body, args, calledArguments);
};

const interpret = (...code) => {
  code.forEach((list) => checkList(list));
};

// // Функция, используемая в runtime
// const sum = (...args) => args.reduce((prev, curr) => prev + curr)

// // Пример вызова функции interpret cо всеми возмонжостями
const result = interpret(
  //   ['princ', 'Hello World,'], // пример: вывод на экран
  //   ['+', 10, 20, 30, ['-', 1, 2, ['*', 2, 2]]], // пример: базовые арифметические операции
  ['defvar', 'x', 5], // пример: объявление переменных
  //   ['defvar', 'y', 4],
  //   ['princ', 'x', 'y'], // пример: вывод значений переменных на экран
  //   ['princ', ['+', 'x', 1]],
  //   ['princ', ['+', 'x', 'y']],
  //   ['princ', ['+', 10, 20, 30, ['-', 1, 'x', 2, ['*', 2, 2]]]], // need more brackets!
  //   // работа с функциями
  //   ['defn', 'sum3', ['a', 'b', 'c'], ['+', 'c', 'b', 'x']], // пример: объявление функции. x глобальная переменная, определена выше
  //   ['princ', ['sum3', 10, 20, 30]], // пример: вызов функции.
  //   ['defn', 'subtract', ['a', 'b', 'c'], ['-', 'c', 'b', 'a']],
  //   ['princ', ['subtract', 1, 2, ['sum3', 10, 20, 'y']]], // c - b - a. a- результат вып. функции sum3
  //   ['defn', 'someFunc', ['a', 'b', 'c', 'd', 'e', 'f'], ['+', 'x', 'c', 'b', 'd', ['-', 'a', 'e', ['*', 'f', 'b']]]],
  //   ['princ', ['someFunc', 1, 2, 3, 4, 5, 6]],

  // - Не учитываются имена параметров при вызове объявленной функции

  ['defn', 'subtract2', ['a', 'b', 'c'], ['-', 'a', 'b', 'c']],
  // ['defn', 'subtract3', ['a', 'b', 'c'], ['-', 'c', 'b', 'a']],

  ['subtract2', 5, 4, 'x'],
  // ['princ', ['subtract3', 5, 4, 3]],

  // если бы не учитывались имена параметров то мы бы ожидали всегда a-b-c
  // фактически в качестве параметра можно передать любое выражение( теоретически ),
  // которое в момент вызова будет высчитано.
  // ['princ', ['subtract3', 5, 4, 'x']],  когда значение x будет высчитано, результат будет присвоен c
  // или я не понял того, что мы ожидаем от интерпетатора?
);
