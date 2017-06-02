// Класс СНИЛС
function snilsChecker() {
    // функция считающая степени числа 10
    function st10(n) {
        var b = 1;
        for (var i = 1; i < n; i++) {
            b *= 10;
        }
        return b;
    }
    // Замена цифры на b в числе a в позиции i
    function changeDigit(a, b, i) {
        function st10(n) {
            var b = 1;
            for (var i = 1; i < n; i++) {
                b *= 10;
            }
            return b;
        }
        return (((a / st10(i + 2) | 0) * 10) + b) * st10(i + 1) + (a % st10(i + 1));
    }
    var snils;
    // Номер Снилс
    this.setSnils = function (nom, sum) {
        snils = {
            "nomer": nom,
            "summa": sum
        };
    }
    // Метод считающий контрольную сумму
    this.calcSumm = function (nomer) {
        if (!(nomer)) {
            nomer = this.snils.nomer;
        }
        function checkSumm(s) {
            if (s < 100) {
                return s;
            }
            if (s === 100 || s === 101) {
                return 0;
            }
            if (s > 101) {
                return checkSumm(s % 101);
            }
        }
        var summ = 0;
        for (var i = 0; i < 9; i++) {
            summ += (9 - i) * ((nomer / (st10(9 - i)) | 0) % 10);
        }
        return checkSumm(summ);
    }
    // Метод проверяющий номер СНИЛС на корректность
    this.check = function () {
        if (this.calcSumm() === snils.summa) {
            return true;
        } else {
            return false;
        }
    }
    // Поиск корректных значений
    this.searchCorrect = function () {
        var correctedSnils = [];
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 10; j++) {
                var temp = changeDigit(snils.nomer, j, i);
                if (this.calcSumm(temp) === snils.summa) {
                    correctedSnils.push((temp) * 100 + snils.summa);
                }
            }
        }
        return correctedSnils;
    }
}



$(document).ready(function () {



    // Замена цифры на b в числе a в позиции i
    function changeDigit(a, b, i) {
        function st10(n) {
            var b = 1;
            for (var i = 1; i < n; i++) {
                b *= 10;
            }
            return b;
        }
        return (((a / st10(i + 2) | 0) * 10) + b) * st10(i + 1) + (a % st10(i + 1));
    }
    // Подсчёт контрольного числа
    // Возврат INT
    function calcControlSummSnils(snils) {
        // Проверка суммы
        function checkSumm(s) {
            if (s < 10) {
                return "0" + s;
            }
            if (s < 100) {
                return s;
            }
            if (s === 100 || s === 101) {
                return "00";
            }
            if (s > 101) {
                return checkSumm(s % 101);
            }
        }
        // Расчёт суммы
        var summ = 0;
        for (var i = 0; i < 9; i++) {
            summ += (9 - i) * parseInt(snils[i]);
        }
        console.log(summ);
        return checkSumm(summ);
    }
    // Перевод массива в строку
    function arr2str(arr) {
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            str += arr[i];
        }
        return str;
    }
    // Убирает из строки лишние символы - возврат массива цифр
    function validateSnils(str) {
        var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var correctStr = [];
        for (var i = 0; i < str.length; i++) {
            if (str[i] in digits) {
                correctStr.push(parseInt(str[i]));
            }
        }
        //console.log(correctStr);
        return arr2str(correctStr);
    }
    // Проверка на совпадание контрольной суммы
    function checkSnils(snils) {
        if (parseInt(calcControlSummSnils(snils.substring(0, 9))) === parseInt(snils.substring(9, 11))) {
            return true;
        } else {
            return false;
        }
    }
    // 
    function showAlert(str, type) {
        $("#alertDiv").remove();
        $("#formMain").prepend("<div id=\"alertDiv\"></div>");
        $("#alertDiv").append("<div class=\"alert alert-" + type + "\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button><strong>Внимание! </strong>" + str + "</div>");
    }
    // поиск корректных значений
    function searchCorrectSnils(snils) {
        var correctedSnils = [];
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 10; j++) {
                var temp = changeDigit(snils.substring(0, 9), j, i).toString();
                if (temp.length === 8) {
                    temp = '0' + temp;
                }
                if (checkSnils(temp + snils.substring(9, 11))) {
                    correctedSnils.push(temp + snils.substring(9, 11));
                }
            }
        }
        return correctedSnils;
    }
    // сабмит
    $('#enterSnils').submit(function () {
        $("#alertDiv").remove();
        var snils = validateSnils($("#appendedPrependedInput").val());
        var correctSnils = []; // Список потенциально правильных корректных СНИЛСов
        switch (snils.length) {
            case 9: {
                console.warn("Не полный номер");
                var temp = snils + calcControlSummSnils(snils);
                correctSnils.push(temp);
                showAlert("В номере нет контрольного числа!", "block");
                break;
            }
            case 11: {
                console.log("Обработка");
                if (checkSnils(snils)) {
                    showAlert('Введён корректный номер СНИЛС!', "success");
                } else {
                    var temp = snils.substring(0, 9) + calcControlSummSnils(snils.substring(0, 9));
                    correctSnils.push(temp);
                    correctSnils = correctSnils.concat(searchCorrectSnils(snils));
                };
                // alert(snils + calcControlSummSnils(snils) );
                break;
            }
            default: {
                console.warn("Не правильный номер СНИЛС");
                showAlert('Введён не корректный номер СНИЛС!', "error");
                break;
            }
        }
        $("#snilsTable").remove();
        $("#main").append("<table id='snilsTable' class=\"table table-striped table-hover \"></table>");
        if (correctSnils.length !== 0) {
            $("#snilsTable").append("<thead><tr><th class=\"row1\">#</th><th>Номер</th></tr></thead>");
            $("#snilsTable").append("<tbody></tbody>");
            //
            for (var i = 0; i < correctSnils.length; i++) {
                $("#snilsTable > tbody").append("<tr><td>" + (i + 1) + "</td><td>" + correctSnils[i].substring(0, 3) + "-" + correctSnils[i].substring(3, 6) + "-" + correctSnils[i].substring(6, 9) + " " + correctSnils[i].substring(9, 11) + "</td></tr>");
            }
        }
        return false;
    }
);
});