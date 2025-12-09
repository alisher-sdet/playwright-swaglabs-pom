// src/locators/inventoryPage.js

export const inventoryLocators = {
	// основной контейнер списка товаров
	container: "[data-test='inventory-container']",
	list: "[data-test='inventory-list']",
	item: "[data-test='inventory-item']",

	// части карточки товара
	itemName: "[data-test='inventory-item-name']",
	itemDesc: "[data-test='inventory-item-desc']",
	itemPrice: "[data-test='inventory-item-price']",

	// кнопки добавления/удаления в корзину
	addToCartButtonPrefix: "button[id^='add-to-cart-']",
	removeFromCartButtonPrefix: "button[id^='remove-']",

	// бейджик корзины в хедере (можно дублировать из homeLocators)
	cartBadge: ".shopping_cart_badge",

	// селектор сортировки (дублируем, чтобы InventoryPage был самодостаточным)
	sort: {
		select: "[data-test='product-sort-container']",
	},
};
