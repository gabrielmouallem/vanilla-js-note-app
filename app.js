window.onload = function () {
    var card = document.getElementById('list'),
        buttonDeleteAll = document.getElementById("delete-all"),
        buttonAdd = document.getElementById("add");

    buttonAdd.onclick = function () {
        addCard(card);
    }

    buttonDeleteAll.onclick = function () {
        card.innerHTML = "";
    }
};

var count = 0;

function addCard(targetComponent) {
    var inputTitle = document.getElementById('title').value,
        inputText = document.getElementById('text').value;

    inputText = inputText.replace(/(.{30})/g, "$1\r\n");

    if (inputTitle.length === 0) {
        alert('Title and Text field must be filled.');
        return false;
    } else if (inputTitle.length > 20) {
        alert('');
        return false;
    }

    var card = document.createElement('div');
    card.className = 'card';
    card.id = `card-id--${count}`;

    var cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    var h2 = document.createElement("h2");
    var titleNode = document.createTextNode(inputTitle);

    var cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    var cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    var textNode = document.createTextNode(inputText);

    var cardActions = document.createElement('div');
    cardActions.className = 'card-actions';

    var buttonEdit = document.createElement('BUTTON');
    buttonEdit.className = 'button-edit';
    buttonEdit.innerHTML = 'EDIT';
    buttonEdit.setAttribute("onclick", `editMe('card-id--${count}')`);

    var buttonDelete = document.createElement('BUTTON');
    buttonDelete.className = 'button-delete';
    buttonDelete.innerHTML = 'DELETE';
    buttonDelete.setAttribute("onclick", `removeMe('card-id--${count}')`);

    cardActions.appendChild(buttonEdit);
    cardActions.appendChild(buttonDelete);
    cardContent.appendChild(textNode);
    cardContainer.appendChild(cardContent);
    cardContainer.appendChild(cardActions);
    h2.appendChild(titleNode);
    cardHeader.appendChild(h2);
    card.appendChild(cardHeader);
    card.appendChild(cardContainer);

    document.getElementById('title').value = "";
    document.getElementById('text').value = "";

    targetComponent.appendChild(card);
    count++;
}

function removeMe(id) {
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
}

function editMe(id) {

    if(document.getElementById("enter-tip")) return;

    var element = document.getElementById(id);
    var children = element.children;
    var content = children[1].firstChild;
    text = content.lastChild.nodeValue;
    content.removeChild(content.lastChild);

    var input = document.createElement('textarea');
    input.setAttribute('rows', '8');
    input.setAttribute('cols', '25');
    input.setAttribute('placeholder', '');
    input.value = text;
    input.id = 'input-text';

    var tip = document.createElement('div');
    tip.className = 'card-tip';
    tip.id = 'enter-tip';
    tip.innerHTML = '*Press ctrl+s to save.';

    content.appendChild(tip);

    content.appendChild(input);

    document.querySelector('#input-text').addEventListener('keypress', function (e) {

        var isCtrl = false;
        document.onkeyup = function (e) {
            if (e.keyCode == 17) isCtrl = false;
        }

        document.onkeydown = function (e) {
            if (e.keyCode == 17) isCtrl = true;
            if (e.keyCode == 83 && isCtrl == true) {
                var editedInput = input.value;
                if (editedInput.length === 0) {
                    alert('Text field must be filled.');
                } else {
                    editedInput = editedInput.replace(/(.{29})/g, "$1\r\n");
                    content.removeChild(content.lastChild);
                    editedInput = document.createTextNode(editedInput);
                    content.appendChild(editedInput);
                    content.removeChild(tip);
                };
                return false;
            }
        }
    });
}