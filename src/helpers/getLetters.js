function getLetters(element, className) {
    element.innerHTML = element.textContent.replace(/\S/g, `<span class="${className}">$&</span>`);
}

export default getLetters;