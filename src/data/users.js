// src/data/users.js

// Пользователи Swag Labs в декларативном виде.
// Эту структуру легко использовать в генерации тестов.

export const users = {
	// основной валидный пользователь
	standard: {
		username: "standard_user",
		password: "secret_sauce",
	},

	// пользователь, у которого логин должен падать
	lockedOut: {
		username: "locked_out_user",
		password: "secret_sauce",
	},

	// заведомо неверные креды
	invalid: {
		username: "invalid_user",
		password: "wrong_password",
	},
};
