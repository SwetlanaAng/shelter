`use strict`;
let bombs = 0;
const createNewMatrix = () => {
    let matrix = [
        new Array(11).fill(0),
        new Array(11).fill(0),
        new Array(11).fill(0),
        new Array(11).fill(0),
        new Array(11).fill(0),
        new Array(11).fill(0),
        new Array(11).fill(0),
        new Array(11).fill(0),
        new Array(11).fill(0),
        new Array(11).fill(0),
        new Array(11).fill(0),
    ];

    matrix.forEach(() => {
        matrix[Math.floor(Math.random() * 9) + 1][Math.floor(Math.random() * 9) + 1] = -9;
    });
    for (let i = 1; i < 10; i++) {
        matrix[0][0] = 1;
        matrix[i][0] = 1;
        matrix[i][10] = 1;
        matrix[0][10] = 1;
        for (let j = 1; j < 10; j++) {
            matrix[0][j] = 1;
            matrix[10][j] = 1;
            matrix[10][10] = 1;
            matrix[10][0] = 1;
            if (matrix[i][j] < 0) {
                bombs++;
                matrix[i][j - 1]++;
                matrix[i][j + 1]++;
                matrix[i - 1][j - 1]++;
                matrix[i - 1][j]++;
                matrix[i - 1][j + 1]++;
                matrix[i + 1][j - 1]++;
                matrix[i + 1][j]++;
                matrix[i + 1][j + 1]++;
            }
        }
    }
    return matrix;
};
document.addEventListener("DOMContentLoaded", function () {
    let counter = 0;
    let start;
    let fail = true;
    let explosion = false;
    let storageKey = 0;
    let pauseTimer = false;
    let closedCells = 81;
    let timerInterval;
    let pauseInterval;
    let winLooseLockField = false;
    const matrix = createNewMatrix();
    const field = document.querySelector(".playing_field"),
        hidingField = document.querySelector(".hiding_field"),
        hours = document.querySelector(".hours"),
        minutes = document.querySelector(".minutes"),
        seconds = document.querySelector(".seconds"),
        startOver = document.querySelector(".start_over"),
        pause = document.querySelector(".pause"),
        rules = document.querySelector(".rules"),
        score = document.querySelector(".score"),
        modal = document.querySelector(".modal"),
        modalBG = document.querySelector(".modal_bg"),
        wrapper = document.querySelector(".wrapper");

    const audioClick = new Audio("./sounds/69880c1f5e57698.mp3");
    const audioBoom = new Audio("./sounds/zvuki_iz_igry_saper_minesweeper_xMh.mp3");
    const audioWinner = new Audio("./sounds/4cccc379d8da21a.mp3");

    const renderNewField = (arr) => {
        arr.forEach((item, i) => {
            if (i != 0 && i != 10) {
                for (let j = 1; j < 10; j++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");
                    cell.classList.add(`c${i}${j}`);
                    if (item[j] != 0) {
                        cell.innerHTML = `${item[j]}`;
                        if (item[j] === 1) cell.style.textShadow = "rgb(0 22 255) 1px 0 10px";
                        if (item[j] === 2) cell.style.textShadow = "rgb(77 255 0) 1px 0 10px";
                        if (item[j] === 3) cell.style.textShadow = "rgb(217, 0, 255) 1px 0 10px";
                    }
                    if (item[j] < 0)
                        cell.innerHTML = '<img src="./img/explosion_5512962.png" alt="explosion">';
                    field.append(cell);
                    const hideCell = document.createElement("div");
                    hideCell.classList.add("hiding_cell");
                    hideCell.id = `c${i}${j}`;
                    hidingField.append(hideCell);
                }
            }
        });
    };

    const checkWinning = (point, bomb) => {
        if (point === bomb) {
            audioWinner.play();
            let time = getTime();
            fail = false;
            showModal();
            modal.innerHTML = `<div><img src="./img/map_13899955.png"></div>
            <div class="winner">Congratulations!<br> time : ${addZero(time.hours)}:${addZero(
                time.minutes
            )}:${addZero(time.seconds)}
            <br> steps: ${counter}`;
            modal.style.backgroundColor = "rgb(0 250 3 / 50%)";
            modal.style.height = "58vh";
            hidingField.style.pointerEvents = "none";
            field.style.pointerEvents = "none";
            winLooseLockField = true;
            setDataToLocalStorage();
        }
    };

    const addZero = (number) => {
        if (number < 10) return "0" + number;
        return number;
    };

    const setTimer = (timeArg) => {
        function updateTimer() {
            let time;
            if (timeArg) time = getTime(timeArg);
            else time = getTime();
            hours.innerHTML = `${addZero(time.hours)}<span>h</span> `;
            minutes.innerHTML = `${addZero(time.minutes)}<span>m</span> `;
            seconds.innerHTML = `${addZero(time.seconds)}<span>s</span>`;
            if (fail === false || explosion === true) clearInterval(timerInterval);
        }
        if (!timeArg) timerInterval = setInterval(updateTimer, 1000);
    };

    const getTime = (timeArg) => {
        let time = Date.parse(new Date()) - start;
        if (timeArg) time = timeArg;
        if (timeArg === 0) {
            return {
                time: 0,
                seconds: "0",
                minutes: "0",
                hours: "0",
            };
        }
        const seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor((time / 1000 / 60) % 60),
            hours = Math.floor((time / (1000 * 60 * 60)) % 60);
        return {
            time: time,
            seconds: seconds,
            minutes: minutes,
            hours: hours,
        };
    };

    const putInQ = (queue, i, j) => {
        queue.push([i, j + 1]);
        queue.push([i, j - 1]);
        queue.push([i + 1, j]);
        queue.push([i + 1, j + 1]);
        queue.push([i + 1, j - 1]);
        queue.push([i - 1, j - 1]);
        queue.push([i - 1, j]);
        queue.push([i - 1, j + 1]);
    };

    const formQ = (queue) => {
        while (queue.length != 0) {
            if (queue[0][0] < 10 && queue[0][0] > 0 && queue[0][1] < 10 && queue[0][1] > 0) {
                const hidingCell = document.querySelector(`#c${queue[0][0]}${queue[0][1]}`);
                if (hidingCell.style.backgroundColor !== "rgba(255, 227, 194, 0)") {
                    hidingCell.style.backgroundColor = "rgba(255, 227, 194, 0)";
                    closedCells--;
                    checkWinning(closedCells, bombs);
                    if (matrix[queue[0][0]][queue[0][1]] === 0) {
                        putInQ(queue, queue[0][0], queue[0][1]);
                    }
                }
            }
            queue.shift();
        }
    };

    const findArea = (i, j) => {
        let queue = [[i, j]];
        formQ(queue);
    };

    const showModal = () => {
        modalBG.style.top = `${document.documentElement.scrollTop}px`;
        document.body.classList.toggle("scroll_blocked");
        wrapper.classList.toggle("hide");
        modal.style.backgroundColor = "#FAFAFA";
        modal.style.height = "80vh";
    };

    const pauseFunc = () => {
        pauseTimer = true;
        hidingField.style.pointerEvents = "none";
        hidingField.style.cursor = "not-allowed";
        start = start + 1000;
        pauseInterval = setInterval(() => {
            start = start + 1000;
        }, 1000);
    };

    const setDataToLocalStorage = () => {
        myStorage = window.localStorage;
        const duration = Date.parse(new Date()) - start;
        const results = {
            duration: duration,
            steps: counter,
            victory: !fail,
        };
        let keys = Object.keys(myStorage);
        let keysNum = keys
            .filter((item) => {
                const arr = item.split("-");
                if (arr.length > 0 && arr[0] === "sapper") {
                    return item;
                }
            })
            .map((item) => Number(item.split("-")[1]));
        if (keysNum.length > 9) {
            myStorage.removeItem(`sapper-${Math.min(...keysNum)}`);
        }
        storageKey = Date.parse(new Date());
        myStorage.setItem(`sapper-${storageKey}`, JSON.stringify(results));
    };

    renderNewField(matrix);
    console.log(matrix);
    const hidingCells = document.querySelectorAll(".hiding_cell");
    hidingField.addEventListener("click", (e) => {
        audioClick.play();
        if (e.shiftKey) {
            if (e.target.alt === "flag") {
                const clickedCell = document.querySelector(`#${e.target.parentElement.id}`);
                clickedCell.innerHTML = "";
            } else {
                const clickedCell = document.querySelector(`#${e.target.id}`);
                clickedCell.innerHTML =
                    '<img src="./img/map_13899955.png" alt="flag" style="width: 4vw">';
            }
        } else {
            if (counter === 0) {
                start = Date.parse(new Date());
                setTimer();
            }
            counter++;
            if (e.target.id) {
                const clickedCell = document.querySelector(`#${e.target.id}`);
                const underCell = document.querySelector(`.${e.target.id}`);
                if (Number(underCell.innerHTML) > 0 && underCell.innerHTML != "") {
                    clickedCell.style.backgroundColor = "rgba(255, 227, 194, 0)";
                    closedCells--;
                    checkWinning(closedCells, bombs);
                } else if (underCell.innerHTML === "") {
                    let ij = e.target.id.slice(1);
                    findArea(+ij[0], +ij[1]);
                } else if (
                    underCell.innerHTML ===
                    '<img src="./img/explosion_5512962.png" alt="explosion">'
                ) {
                    audioBoom.volume = 0.5;
                    audioBoom.play();

                    hidingCells.forEach((item) => {
                        item.style.backgroundColor = "rgba(255, 227, 194, 0)";
                    });
                    explosion = true;
                    fail = true;
                    let time = getTime();
                    showModal();
                    modal.innerHTML = `<div><img src="./img/explosion_5512962.png"></div>
                    <div class="looser">You have lost! <br> time : ${addZero(time.hours)}:${addZero(
                        time.minutes
                    )}:${addZero(time.seconds)}
                    <br> steps: ${counter}</div>`;
                    modal.style.backgroundColor = "rgb(255 255 255 / 50%)";
                    modal.style.height = "54vh";
                    hidingField.style.pointerEvents = "none";
                    winLooseLockField = true;
                    setDataToLocalStorage();
                }
            }
        }
    });

    startOver.addEventListener("click", () => {
        if (start && fail && !explosion) setDataToLocalStorage();
        window.location.reload();
    });

    pause.addEventListener("click", () => {
        if (!pauseTimer) pauseFunc();
        else if (!winLooseLockField) {
            pauseTimer = false;
            hidingField.style.pointerEvents = "auto";
            hidingField.style.cursor = "pointer";
            clearInterval(pauseInterval);
        }
    });

    rules.addEventListener("click", () => {
        showModal();
        modal.innerHTML = `<h3>Правила игры <span>САПЁР</span></h3>
        <p>На поле размером 9x9 (в данной реализации) в некоторых ячейках спрятано 11 мин. Цель игры - найти все мины на поле.</p>
    <p>Игра начинается с первого клика по любой ячейке на поле. При клике на ячейке она открывается. Если в ней находится мина, то на поле открываются все ячейки и игра заканчивается проигрышем. Если в самой ячейке мины нет, но есть мины в соседних ячеках, то отображается число, соответствующее количеству мин в соседних ячейках. Если ни в самой ячейке, ни в соседних мин нет, то ячейка остается пустой и открываются все соседние пустые яйчеки до тех пор, пока не будут достигнуты ячейки с ненулевой информацией о количестве мин.</p>
    <p>С помощью клика с нажатым Shift можно пометить ячейку флажком (т.е. как содержащую мину).</p>
    <p>После того, как на игровом поле останутся неоткрытыми только ячейки, предположительно содержащие мины, то игра проверит результат и выведет сообщение о успешности или ошибочности предложенного варианта размещения мин.</p>`;
    });
    modalBG.addEventListener("click", () => {
        modal.innerHTML = "";
        showModal();
    });
    score.addEventListener("click", () => {
        showModal();
        let gameNumber = 1;
        const myStorage = window.localStorage;
        let keys = Object.keys(myStorage);
        let keysNum = keys
            .filter((item) => {
                const arr = item.split("-");
                if (arr.length > 0 && arr[0] === "sapper") {
                    return item;
                }
            })
            .map((item) => Number(item.split("-")[1]));
        keysNum = keysNum.sort((a, b) => b - a);
        keys = keysNum.map((item) => {
            return String(`sapper-${item}`);
        });
        keys.forEach((item) => {
            const timeData = getTime(JSON.parse(myStorage.getItem(`${item}`)).duration);
            const element = document.createElement("div");
            element.classList.add("game_info");
            element.innerHTML = `<p><span class="color"> ${gameNumber}. </span>
            <span>game duration: <span class="color">${addZero(timeData.hours)}:${addZero(
                timeData.minutes
            )}:${addZero(timeData.seconds)}</span> </span>
            <span>steps:<span class="color">
            ${JSON.parse(myStorage.getItem(`${item}`)).steps}
            </span></span><span>outcome of the game: <span class="color">
            ${JSON.parse(myStorage.getItem(`${item}`)).victory ? "victory" : "defeat"}
            </span></span></p>`;
            gameNumber++;
            modal.append(element);
        });
    });
});
console.log(`

Для удобства проверки в консоль выводится матрица(массив массивов), на основе которого строится игровое поле. Не учитывается первый и последний массивы, а также первые и последние элементы во всех остальных массивах.чтобы проверить выйгрыш,
 нужно открыть все ячейки соответствующие неотрицательным элементам в массивах, надеюсь понятнно описала!
  Спасибо за проверку!
  Вёрстка +10
  Приложение хорошо выглядит при ширине страницы от 1920рх до 768рх
реализован интерфейс игры +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10
Реализовано завершение игры при достижении игровой цели +10
По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10
Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом (лучшим временем и т.п.) или просто 10 последних игр (хранится в local storage) +10
Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо.
`);
