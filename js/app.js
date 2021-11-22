class Budget {
  constructor() {
    this.nodesList = [];
    this.elementsList = [];
  }

  addNode(item) {
    this.nodesList.push(item);
  }

  removeNode(itemId) {
    if (itemId >= 0 && itemId < this.nodesList.length) {
      this.nodesList.splice(itemId, 1);
    }
  }

  getNodesList() {
    return this.nodesList;
  }

  getNodeById(index) {
    return this.nodesList[index];
  }

  addElement(name, value) {
    this.elementsList.push({ name, value });
  }

  getElements() {
    return this.elementsList;
  }

  removeElement(elementId) {
    this.elementsList.splice(elementId, 1);
  }

  getElementById(index) {
    return this.elementsList[index];
  }

  editElement(index, name, value) {
    this.elementsList[index] = { name, value };
  }

  getSum() {
    if (this.elementsList.length > 0)
      return this.elementsList
        .map((item) => item.value)
        .reduce((prev, next) => prev + next, 0);
    return 0;
  }

  getElementList() {
    return this.elementsList;
  }
}

//INCOMES VARAIABLES
const incomes = new Budget();
const incomeName = document.getElementById("incomeName");
const incomeValue = document.getElementById("incomeValue");
const btnAddIncome = document.getElementById("btn-add-income");
const incomesListNode = document.getElementById("incomesList");
const incomesList = document.getElementsByClassName("income");
let incomeEdit = false;
let incomeEditIndex = 0;
const incomesSum = document.getElementById("incomesSum");

//OUTGOES VARAIABLES
const outgoes = new Budget();
const outgoName = document.getElementById("outgoName");
const outgoValue = document.getElementById("outgoValue");
const btnAddOutgo = document.getElementById("btn-add-outgo");
const outgoesListNode = document.getElementById("outgoesList");
const outgoesList = document.getElementsByClassName("outgo");
let outgoEdit = false;
let outgoEditIndex = 0;
const outgoesSum = document.getElementById("outgoesSum");

//COMMON VARAIABLES
const balanceText = document.getElementById("balance-text");
const balanceBanner = document.getElementById("balance-banner");

//INCOMES FUNCTIONS
const removeIncomeItem = (e) => {
  const index = e.target.parentNode.parentNode.parentNode.dataset.key;

  incomes.removeNode(index);
  incomes.removeElement(index);

  updateIncomesList();
  updateIncomesSum();
  getBalance();
};

const editIncomeItem = (e) => {
  const index = e.target.parentNode.parentNode.parentNode.dataset.key;

  incomeEditIndex = index;

  incomeName.value = incomes.getElementById(index).name;
  incomeValue.value = incomes.getElementById(index).value;

  outgoEdit = true;
};

const addIncomeItem = () => {
  if (incomeName.value === "") return;

  if (!incomeEdit) {
    const liNode = document.createElement("li");
    liNode.className = "income";
    liNode.innerHTML = `
      <div class="d-flex list-group-item">
        <span class="col p-2">
          <span>${incomeName.value} -</span>
          <span>${incomeValue.value}zł</span>
        </span>
        <span class="pull-right">
          <button class="btn-edit btn btn-warning">Edytuj</button>
          <button class="btn-delete btn btn-danger">Usuń</buttton>
        </span>
      </div>
      `;
    incomes.addNode(liNode);
    incomes.addElement(incomeName.value, Number(incomeValue.value));
    incomesListNode.appendChild(liNode);

    incomeName.value = "";
    incomeValue.value = "";

    liNode
      .querySelector("button.btn-delete")
      .addEventListener("click", removeIncomeItem);
    liNode
      .querySelector("button.btn-edit")
      .addEventListener("click", editIncomeItem);
  } else {
    incomes.editElement(
      incomeEditIndex,
      incomeName.value,
      Number(incomeValue.value)
    );

    const liNode = incomes.getNodeById(incomeEditIndex);

    liNode.innerHTML = `
    <div class="d-flex list-group-item">
      <span class="col p-2">
        <span>${incomeName.value} -</span>
        <span>${incomeValue.value}zł</span>
      </span>
      <span class="pull-right">
        <button class="btn-edit btn btn-warning">Edytuj</button>
        <button class="btn-delete btn btn-danger">Usuń</buttton>
      </span>
    </div>
    `;

    incomeEdit = false;

    incomeName.value = "";
    incomeValue.value = "";

    liNode
      .querySelector("button.btn-delete")
      .addEventListener("click", removeIncomeItem);
    liNode
      .querySelector("button.btn-edit")
      .addEventListener("click", editIncomeItem);
  }

  updateIncomesList();
  updateIncomesSum();
  getBalance();
};

const updateIncomeList = () => {
  outgoesListNode.textContent = "";

  outgoes.getNodesList().forEach((item, index) => {
    item.dataset.key = index;
    outgoesListNode.appendChild(item);
  });
};

const updateIncomesSum = () => {
  const incomesSumNode = document.getElementById("incomesSum");

  incomesSumNode.innerHTML = incomes.getSum();
};

//OUTGOES FUNCTION
const removeOutgoItem = (e) => {
  const index = e.target.parentNode.parentNode.parentNode.dataset.key;

  outgoes.removeNode(index);
  outgoes.removeElement(index);

  updateIncomeList();
  updateOutgoesSum();
  getBalance();
};

const editOutgoItem = (e) => {
  const index = e.target.parentNode.parentNode.parentNode.dataset.key;

  outgoEditIndex = index;

  outgoName.value = outgoes.getElementById(index).name;
  outgoValue.value = outgoes.getElementById(index).value;

  outgoEdit = true;
};

const addOutgoItem = () => {
  if (outgoName.value === "") return;

  if (!outgoEdit) {
    const liNode = document.createElement("li");
    liNode.className = "outgo";
    liNode.innerHTML = `
      <div class="d-flex list-group-item">
        <span class="col p-2">
          <span>${outgoName.value} -</span>
          <span>${outgoValue.value}zł</span>
        </span>
        <span class="pull-right">
          <button class="btn-edit btn btn-warning">Edytuj</button>
          <button class="btn-delete btn btn-danger">Usuń</buttton>
        </span>
      </div>
      `;
    outgoes.addNode(liNode);
    outgoes.addElement(outgoName.value, Number(outgoValue.value));
    outgoesListNode.appendChild(liNode);

    outgoName.value = "";
    outgoValue.value = "";

    liNode
      .querySelector("button.btn-delete")
      .addEventListener("click", removeOutgoItem);
    liNode
      .querySelector("button.btn-edit")
      .addEventListener("click", editOutgoItem);
  } else {
    outgoes.editElement(
      outgoEditIndex,
      outgoName.value,
      Number(outgoValue.value)
    );

    const liNode = outgoes.getNodeById(outgoEditIndex);

    liNode.innerHTML = `
    <div class="d-flex list-group-item">
      <span class="col p-2">
        <span>${outgoName.value} -</span>
        <span>${outgoValue.value}zł</span>
      </span>
      <span class="pull-right">
        <button class="btn-edit btn btn-warning">Edytuj</button>
        <button class="btn-delete btn btn-danger">Usuń</buttton>
      </span>
    </div>
    `;

    outgoEdit = false;

    outgoName.value = "";
    outgoValue.value = "";

    liNode
      .querySelector("button.btn-delete")
      .addEventListener("click", removeOutgoItem);
    liNode
      .querySelector("button.btn-edit")
      .addEventListener("click", editOutgoItem);
  }

  updateIncomeList();
  updateOutgoesSum();
  getBalance();
};

const updateIncomesList = () => {
  incomesListNode.textContent = "";

  incomes.getNodesList().forEach((item, index) => {
    item.dataset.key = index;
    incomesListNode.appendChild(item);
  });
};

const updateOutgoesSum = () => {
  const outgoesSumNode = document.getElementById("outgoesSum");

  outgoesSumNode.innerHTML = outgoes.getSum();
};

//COMMON FUNCTION
const getBalance = () => {
  if (incomes.getSum() > outgoes.getSum()) {
    balanceText.innerHTML = `Możesz jeszcze wydać: ${
      incomes.getSum() - outgoes.getSum()
    } złotych`;
    balanceBanner.classList.remove("alert-secondary");
    balanceBanner.classList.remove("alert-danger");
    balanceBanner.classList.add("alert-success");
    return;
  } else if (outgoes.getSum() > incomes.getSum()) {
    balanceText.innerHTML = `Bilans jest ujemny. Jesteś na minusie: ${Math.abs(
      incomes.getSum() - outgoes.getSum()
    )} złotych`;
    balanceBanner.classList.remove("alert-secondary");
    balanceBanner.classList.remove("alert-success");
    balanceBanner.classList.add("alert-danger");
    return;
  } else {
    balanceText.innerHTML = `Bilans wynosi zero`;
    balanceBanner.classList.remove("alert-danger");
    balanceBanner.classList.remove("alert-success");
    balanceBanner.classList.add("alert-secondary");
    return;
  }
};

btnAddOutgo.addEventListener("click", addOutgoItem);
btnAddIncome.addEventListener("click", addIncomeItem);
