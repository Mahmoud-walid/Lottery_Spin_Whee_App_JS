"use strict"
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const numOfInputs = parseInt(prompt("Enter the number of inputs:"));
function displayInputsValues() {
    const dataValues = [];

    if (isNaN(numOfInputs)) {
        location.reload();
        return;
    }

    for (let i = 0; i < numOfInputs; i++) {
        const inputValue = prompt(`Enter a value for Input ${i + 1}`);

        if (inputValue === "" || !inputValue) {
            location.reload();
            return;
        }

        dataValues.push(inputValue);
    }
    myChart.data.labels = dataValues;
    myChart.update();
}

const data = [];
for (let i = 0; i < numOfInputs; i++) {
    const randomNumber = Math.floor(Math.random() * (16 - 7 + 1) + 7);
    data.push(randomNumber);
}

var pieColors = [
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
];

let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: [],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: {
                display: false,
            },
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) =>
                    context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});

const valueGenerator = (angleValue) => {
    finalValue.innerHTML = `
    <p class ="finalValue heart">Good</p>
    `;
    spinBtn.disabled = false;

};

let count = 0;
let resultValue = 101;

window.addEventListener("load", () => {
    displayInputsValues();
});

spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 50);
});

var animateButton = function (e) {

    e.preventDefault;
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function () {
        e.target.classList.remove('animate');
    }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}