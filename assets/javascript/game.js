

function chooseRandom(w_Array) {
    return w_Array[Math.floor(Math.random() * w_Array.length)];
}

function createContainers(w) {
    var divArray = [];
    var len = w.length;
    for (let i = 0; i < len; i++) {
        var div = document.createElement('div');
        if (w[i] === ' ') {
            //console.log('space found at index: ', i)
            div.style.borderBottom = "0px solid ";
            div.style.backgroundColor = "grey";
        } else {
            div.style.borderBottom = "1px solid black";
            div.style.backgroundColor = "yellow";
        }
        div.style.height = "50px";
        div.style.width = "50px";
        div.style.display = "inline-flex";
        div.style.margin = "3px";
        div.setAttribute('id', 'l' + i);
        divArray.push(div);
    }
    return divArray;
}


function displayContainer(w) {
    var conArray = createContainers(w);
    for (let i = 0; i < conArray.length; i++) {
        document.getElementById("main").appendChild(conArray[i]);
    }
}


function updateDomWithKeyOccurence(occurence_key) {
    document.getElementById("frequency").textContent = occurence_key;
}



/*This function will check index of key in word and display there */

//look for single/multiple occurences of letter in words and display 
//crete an array of occurences of index and fill those index

function findKeyInWord(input_key, w) {
    var occurence = 0;
    var indices = [];
    var selector_array = [];

    for (let i = 0; i < w.length; i++) {

        if (w[i] === input_key) {
            // replace with key captured frorm key event
            var id = "l" + i;
            selector_array.push(id);
            occurence++;
            indices.push(i);
            console.log("indices array: ", indices);
            console.log("id selector array:", selector_array);

        }
    }
    for (let i = 0; i < selector_array.length; i++) {
        document.getElementById(selector_array[i]).textContent = input_key;
    }
    return occurence;
}


function startGame(word_random_array) {

    var word = chooseRandom(word_random_array);

    var word_length = word.length;

    var chances4guess = word_length;

    var failure_str = "try again...";
    var success_str = "good job guessing!";
    console.log("word is: " + word + " -> length of word -> " + word_length + " chances allowed -> " + chances4guess);

    createContainers(word);
    displayContainer(word);

    document.getElementById("msg").textContent = "Start guessing ... :)";
    document.getElementById("bal_guess").textContent = chances4guess;
    var keys_guessed_str = [];
    var remaining_letters = word_length;
    document.getElementById("bal_letter").textContent=remaining_letters;
    document.onkeyup = function (event) {
        var input = event.key;
        keys_guessed_str.push(input);
        
        var keyFound = findKeyInWord(input, word);
        if (keyFound > 0) {
            document.getElementById("msg").textContent = success_str;
        } else {
            chances4guess--;
            document.getElementById("msg").textContent = failure_str;
        }
        remaining_letters = remaining_letters - keyFound;
        console.log("remaining letters: " + remaining_letters)
        updateDomWithKeyOccurence(keyFound)
        document.getElementById("guess").textContent = keys_guessed_str.toString();
        document.getElementById("bal_guess").textContent = chances4guess;
        document.getElementById("bal_letter").textContent=remaining_letters;

            if (remaining_letters === 0) {
                document.getElementById("result_str").textContent = "You Win";   
            }
            else if (chances4guess===0){
                document.getElementById("result_str").textContent = "You loose!!!!";
            }

    }
}
//-----------------Script starts -----------------------------//



//----------------- Global ----------------------------------
var wordArray = ["algorithm", "api", "browser", "data structure", "documentation", "git", "javascript", "responsive"];


startGame(wordArray);

//--------Start game-------------------------------------------------

//TODO:
//TODO:
//TODO:
//TODO:
//TODO:
//TODO:

