const container = document.querySelector(".container");
const result = document.querySelector(".result");

let firstNum = "";
let secondNum = "";
let action = "";

const clickHandler = (e) => {
    const button = e.target;
    console.log(button);
    if (button.classList.contains("result")) {
        return;
    }
    if (button.innerHTML === "C" || button.innerHTML === "CE") {
        result.innerHTML = "";
        firstNum = "";
        secondNum = "";
        action = "";
        return;
    }

    if (button.dataset.num) {
        const num = button.dataset.num;
        if (action) {
            if (num === "." && secondNum.includes(".")) {
                return;
            }
            secondNum += num;
        } else {
            if (num === "." && firstNum.includes(".")) {
                return;
            }
            firstNum += num;
        }
        result.innerHTML += button.innerHTML;
    }

    if (button.dataset.ops && firstNum) {
        if (secondNum) {
            const resultNum = counting(firstNum, secondNum, action);
            result.innerHTML = resultNum;
            secondNum = "";
            firstNum = resultNum + "";
            result.innerHTML += button.innerHTML;
        }
        if (action) {
            const str = result.innerHTML;
            result.innerHTML = str.substring(0, str.length - 1);
        } else {
            result.innerHTML += button.innerHTML;
        }
        action = button.dataset.ops;

    } else if (button.dataset.result) {
        if (firstNum && secondNum && action) {
            const resultNum = counting(firstNum, secondNum, action);
            result.innerHTML = resultNum;
            secondNum = "";
            action = "";
            firstNum = resultNum + "";
            return;
        }
    }

}

container.addEventListener("click", clickHandler);

const counting = (firstNum, secondNum, action) => {
    const first = parseFloat(firstNum);
    const second = parseFloat(secondNum);
    switch (action) {
        case "plus":
            return first + second;
        case "minus":
            return first - second;
        case "divide":
            return first / second;
        case "times":
            return first * second;
    }
}