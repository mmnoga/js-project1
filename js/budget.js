class ListBudget {
  constructor(element, inputText, inputValue, sumNode) {
    this.listElement = element;
    this.inputText = inputText;
    this.inputValue = inputValue;
    this.sumNode = sumNode;
    this.objectList = [];
    this.edited = false;
    this.editedIndex = -1;
  }

  createListItem(object, index) {
    const li = document.createElement("li");

    li.dataset.key = index;
    li.innerHTML = `<div class="d-flex list-group-item">
             <span class="col p-2">
            <span>${object.text} -</span>
              <span>${object.value}zł</span>
            </span>
            <span class="pull-right">
              <button class="btn-edit btn btn-warning">Edytuj</button>
              <button class="btn-delete btn btn-danger">Usuń</buttton>
           </span>
           </div>
           `;

    li.querySelector("button.btn-delete").addEventListener("click", (event) => {
      const index = event.target.closest("li").dataset.key;
      this.remove(index);
    });

    li.querySelector("button.btn-edit").addEventListener("click", (event) => {
      const index = event.target.closest("li").dataset.key;
      this.edit(index);
    });

    return li;
  }

  update() {
    while (this.listElement.firstChild) {
      this.listElement.removeChild(this.listElement.firstChild);
    }

    this.objectList.forEach((object, index) => {
      this.listElement.appendChild(this.createListItem(object, index));
    });

    this.sumNode.innerHTML = `${this.getSum()}`;
  }

  add(object) {
    if (this.edited) {
      this.objectList[this.editedIndex] = object;
      this.update();
      this.edited = false;
    } else {
      this.objectList.push(object);
      this.update();
    }
  }

  edit(index) {
    this.edited = true;
    this.editedIndex = index;
    this.inputText.value = this.objectList[index].text;
    this.inputValue.value = this.objectList[index].value;
  }

  remove = (index) => {
    this.objectList.splice(index, 1);
    this.update();
  };

  getSum() {
    if (this.objectList.length > 0)
      return this.objectList
        .map((item) => Number(item.value))
        .reduce((prev, next) => prev + next, 0);
    return 0;
  }
}
