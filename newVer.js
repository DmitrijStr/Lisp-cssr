/*	Этот простой интерператор имеет возможность выполнения некоторых арифмитически операций. Пример ['*', 2, 2], ['+', 2, ['*', 2, 2]];
 *	Имеет встроенные функции вывода на экран, объявления функций и переменных;
 *	Расширяемость достигается за счёт добавления методов в объект dispatcher;
 *  объявление переменных с помощью ключевого слова defvar;
 *  объявление функций с помощью ключевого слова defn;
 *  вывод в консоль с помощью функции princ;
 */

// учитываются имена параметров при вызове объявленной функции




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

// const defn = (functionName, args, body) => {
// 	// требуется реализация
// 	const [fn, ...fnArgs] = body;

// 	const arrangeArgs = (unorderedArgs) =>
// 		fnArgs.map((a) => unorderedArgs[args.indexOf(a)]);

// 	globalObj[functionName] = (...args) => fn(...arrangeArgs(args))
// };






// const parseBody = (expression) => {

// 	const [operator, ...exp] = expression;

// 	exp.map((each) => {
// 		if (globalObj[each]) {
// 			return globalObj[each]
// 		}
// 	})
// }

const defn = (functionName, args, body) => {

	const [operation, ...rest] = body

	globalObj[functionName] = (...calledArguments) => {



		// const newArgs = rest.map((a) => calledArguments[args.indexOf(a)]);


		const newArgs = rest.map((a) => {
			console.log(a)
			if (calledArguments[args.indexOf(a)]) {
				return calledArguments[args.indexOf(a)]
			}
			return checkGlobalObject(a)



		})



		console.log(newArgs)
		// const params = rest.map((ar) => ar[args.indexOf(ar)])

		return checkGlobalObject(operation).apply(dispatcher, newArgs)
	}

}


const calculate = (statement) => {

	const [operation, ...rest] = statement

	if (operation === 'defn') {
		checkGlobalObject(operation).apply(dispatcher, rest)
	} else {
		const mapped = rest.map((el) => {
			if (typeof el !== 'object') {
				return checkGlobalObject(el)
			} else {
				return calculate(el)
			}
		})

		const res = checkGlobalObject(operation).apply(dispatcher, mapped);

		// console.log(res)
		return res
	}



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




const interpret = (...code) => {

	code.forEach((statement) => {

		calculate(statement)

	})
}





// // Функция, используемая в runtime
// const sum = (...args) => args.reduce((prev, curr) => prev + curr)


// // Пример вызова функции interpret cо всеми возмонжостями (они неограничены (шутка))
const result = interpret(
	// ['princ', 'Hello World,'],
	// ['+', 10, 20, 30, ['-', 1, 2, ['*', 2, 2]]],
	// ['defvar', 'x', 5],
	// ['defvar', 'y', 4],
	// ['princ', 'x', 'y'],
	// ['princ', ['+', 'x', 1]],
	// ['princ', ['+', 'x', 'y']],
	// ['princ', ['+', 10, 20, 30, ['-', 1, 'x', 2, ['*', 2, 2]]]], // need more brackets!

	// ['defn', "sum3", ['a', 'b', 'c'], ['+', 'c', 'b', 'x']],  // x глобальная переменная, определена выше
	// ['princ', ['sum3', 10, 20, 30]],  // cuz c=30, b=20, x=5
	// ['defn', 'subtract', ['a', 'b', 'c'], ['-', 'c', 'b', 'a']],
	// ['princ', ['subtract', 1, 2, 3]],

	// ['sum3', 10, 20, 30],

)

// console.log(globalObj.sum3(3, 7, 5))  
// console.log(result)
// console.assert(result === 60)
