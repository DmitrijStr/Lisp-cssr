/*	Этот простой интерператор имеет возможность выполнения некоторых арифмитически операций. Пример ['*', 2, 2], ['+', 2, ['*', 2, 2]];
 *	Имеет встроенные функции вывода на экран, объявления функций и переменных;
 *	Расширяемость достигается за счёт добавления методов в объект dispatcher;
 *  объявление переменных с помощью ключевого слова defvar;
 *  объявление функций с помощью ключевого слова defn;
 *  вывод в консоль с помощью функции princ;
 */

// учитываются имена параметров при вызове объявленной функции


const defn = (functionName, args, body) => {



}






const interpret = (...code) => {
	// объект для хранения глобальных переменных и функций
	const globalObj = {};

	// объект с базовыми операциями и функциями
	const dispatcher = {
		'+': (...args) => args.reduce((prev, curr) => prev + curr),
		'*': (...args) => args.reduce((prev, curr) => prev * curr),
		'-': (...args) => args.reduce((prev, curr) => prev - curr),

		'defn': (...args) => defn(...args),
		'princ': (...args) => console.log(...args),
		'defvar': (name, value) => globalObj[name] = value,

		//ect basics operators and functions
	}

	const checkGlobalObject = (arg) => {

		if (globalObj[arg]) {
			return globalObj[arg]
		} else if (dispatcher[arg]) {
			return dispatcher[arg];
		} else {
			return arg
		}
	}


	const calculate = (statement) => {

		const [operation, ...rest] = statement

		const mapped = rest.map((el) => {
			if (typeof el !== 'object') {
				// console.log('element')
				return checkGlobalObject(el)
			} else {
				return calculate(el)
			}
		})

		const res = checkGlobalObject(operation).apply(dispatcher, mapped);
		return res
	}


	code.forEach((statement) => {

		calculate(statement)

	})
}

// // Функция, используемая в runtime
// const sum = (...args) => args.reduce((prev, curr) => prev + curr)



defn('sum', ['a', 'b', 'c'], ['a' + 'b' + 'c'])


// // Пример вызова функции interpret cо всеми возмонжостями (они неограничены (шутка))
const result = interpret(
	['princ', 'Hello World,'],
	['+', 10, 20, 30, ['-', 1, 2, ['*', 2, 2]]],
	['defvar', 'x', 5],
	['defvar', 'y', 4],
	['princ', 'x', 'y'],
	['princ', ['+', 'x', 1]],
	['princ', ['+', 'x', 'y']],
	['princ', ['+', 10, 20, 30, ['-', 1, 'x', 2, ['*', 2, 2]]]] // need more brackets!

	// // [defn, "sum3", ['a', 'b', 'c'], [sum, 'a', 'b', 'c']],
	// // ['sum3', 10, 20, 30],

)

// console.log(result)
// console.assert(result === 60)
