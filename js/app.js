//INCOMES
const incomesListNode = document.getElementById("incomesList");
const incomeText = document.getElementById("incomeName");
const incomeValue = document.getElementById("incomeValue");
const btnAddIncome = document.getElementById("btn-add-income");
const incomesSumNode = document.getElementById("incomesSum");

const incomesList = new ListBudget(
  incomesListNode,
  incomeText,
  incomeValue,
  incomesSumNode
);

//INCOMES SAMPLE DATA
incomesList.add({
  text: "Przychód 1",
  value: 400,
});
incomesList.add({
  text: "Przychód 2",
  value: 200,
});
incomesList.add({
  text: "Przychód 3",
  value: 300,
});
//END SAMPLE DATA

function addIncomesItem() {
  incomesList.add({
    text: `${incomeText.value}`,
    value: `${incomeValue.value}`,
  });
  incomeText.value = "";
  incomeValue.value = "";
}

btnAddIncome.addEventListener("click", addIncomesItem);

//OUTGOES
const outgoesListNode = document.getElementById("outgoesList");
const outgoText = document.getElementById("outgoName");
const outgoValue = document.getElementById("outgoValue");
const btnAddOutgo = document.getElementById("btn-add-outgo");
const outgoesSumNode = document.getElementById("outgoesSum");

const outgoesList = new ListBudget(
  outgoesListNode,
  outgoText,
  outgoValue,
  outgoesSumNode
);

//OUTGOES SAMPLE DATA
outgoesList.add({
  text: "Wydatek 1",
  value: 300,
});
outgoesList.add({
  text: "Wydatek 2",
  value: 200,
});
outgoesList.add({
  text: "Wydatek 3",
  value: 100,
});
//END OUTGOES SAMPLE DATA

function addOutgoesItem() {
  outgoesList.add({
    text: `${outgoText.value}`,
    value: `${outgoValue.value}`,
  });
  outgoText.value = "";
  outgoValue.value = "";
}

btnAddOutgo.addEventListener("click", addOutgoesItem);

//BALANCE
const balanceText = document.getElementById("balance-text");
const balanceBanner = document.getElementById("balance-banner");

function updateBalance() {
  const compare = new Balance(
    incomesList.getSum(),
    outgoesList.getSum(),
    balanceText,
    balanceBanner
  );
  compare.update();
}

updateBalance();

incomesSumNode.addEventListener("DOMSubtreeModified", updateBalance);
outgoesListNode.addEventListener("DOMSubtreeModified", updateBalance);
