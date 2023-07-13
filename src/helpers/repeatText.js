function repeater(element, times) {
    let text = "  " + element.innerText + "  ";
    element.innerText = ` ${text.repeat(times)} `;
}

export default repeater;