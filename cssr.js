const defn = (functionName, args, body) => {
	const requiredFunction = body[0];
	const func = function func() {
		return requiredFunction(...this);
	};
	return func;
};

const interpret = (...code) => {
	// объект в свойствах которого будем хранить наши функции;
	const obj = {};

	code.forEach((el) => {
		// Если встречаем ключевое слово, записываем вызов defn в наш объект.
		if (el.includes(defn)) {
			const [, functionName, args, body] = el;
			obj[functionName] = defn(functionName, args, body);
			// Если это не объявление то вызов
		} else {
			const [calledFunction, ...args] = el;
			obj[calledFunction].call(args);
			// эта строка проверяет работоспособность вызовов при помощи "синтаксиса лиспа"
			console.log(obj[calledFunction].call(args));
		}
	});
};

// Функция, используемая в runtime
const sum = (...args) => args.reduce((prev, curr) => prev + curr);

// Пример вызова функции interpret
const result = interpret(
	[defn, "sum3", ['a', 'b', 'c'], [sum, 'a', 'b', 'c']],
	[defn, "sum4", ['a', 'b', 'c', 'd'], [sum, 'a', 'b', 'c', 'd']],
	['sum3', 10, 20, 30],
	['sum4', 10, 20, 30, 40],
	['sum3', 1, 2, 3],
);


/**
* Представим, что на одном из проектов нам потребовался DSL для решения бизнес-задачи. Наши пользователи - большие поклонники Lisp, поэтому синтаксис этого языка им более привычен, чем синтаксис JS.
* Парсер оригинального синтаксиса Lisp нам написать хоть и не так сложно, но все же для MVP это может быть неразумно, а вот простенький интерпретатор нам точно будет полезен.
*
* Что мы хотим получить:
* 1. Возможность объявлять функции таким образом: [defn, 'funcName', ['a', 'b'], ['sum', 'a', 'b']], где
*      defn - ключевое слово для определения функции
*      'funcName' - имя функции
*      ['a', 'b'] - перечисление аргументов функции
*      ['sum', 'a', 'b'] - тело функции (т. е. вызов функции sum с аргументами a и b)
* 2. Соответственно вызов функции должен быть таким ['funcName', 'a', 'b']
*
* Ниже уже реализован некоторый runtime и есть пример вызова interpret. Необходимо имплементировать interpret и defn.
* 
* P.S.
* Даже если не получится выполнять задание в полной мере (например, где-то застряли), все равно скидывайте в качестве решения то, что получилось.
*/

const defn = (functionName, args, body) => {
	// требуется реализация
}

const interpret = (...code) => {
	// требуется реализация
}

// Функция, используемая в runtime
const sum = (...args) => args.reduce((prev, curr) => prev + curr)

// Пример вызова функции interpret
const result = interpret(
	[defn, "sum3", ['a', 'b', 'c'], [sum, 'a', 'b', 'c']],
	['sum3', 10, 20, 30]
)

console.log(result)
console.assert(result === 60)