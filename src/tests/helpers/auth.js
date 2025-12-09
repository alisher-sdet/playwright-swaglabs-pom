// src/tests/helpers/auth.js

import { users } from "../../data/users.js";
import { LoginPage } from "../../pages/LoginPage.js";

/**
 * Базовый helper: залогиниться с произвольными кредами.
 */
export async function loginWithCredentials(page, username, password) {
	const loginPage = new LoginPage(page);

	await loginPage.goto();
	await loginPage.expectLoaded();

	await loginPage.typeUserName(username);
	await loginPage.typePassword(password);
	await loginPage.submit();

	return loginPage;
}

/**
 * Happy-path логин стандартным пользователем.
 */
export async function loginAsStandardUser(page) {
	return loginWithCredentials(
		page,
		users.standard.username,
		users.standard.password
	);
}

/**
 * Логин заблокированным пользователем (ожидаем ошибку).
 */
export async function loginAsLockedOutUser(page) {
	return loginWithCredentials(
		page,
		users.lockedOut.username,
		users.lockedOut.password
	);
}
