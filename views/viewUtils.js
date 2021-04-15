export function createElement (tag, classNames) {
    const element = document.createElement(tag);
    classNames?.forEach(className => {
        element.classList.add(className);
    });

    return element;
}

export function getElement(selector) {
    return document.querySelector(selector);
}
