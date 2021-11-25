class Balance {
  constructor(incomes, outgoes, balanceText, balanceBanner) {
    this.incomesSum = incomes;
    this.outgoesSum = outgoes;
    this.balanceText = balanceText;
    this.balanceBanner = balanceBanner;
  }

  update() {
    if (this.incomesSum > this.outgoesSum) {
      this.balanceText.innerHTML = `Możesz jeszcze wydać: ${
        this.incomesSum - this.outgoesSum
      } złotych`;
      this.balanceBanner.classList.remove("alert-secondary");
      this.balanceBanner.classList.remove("alert-danger");
      this.balanceBanner.classList.add("alert-success");
      return;
    } else if (this.outgoesSum > this.incomesSum) {
      this.balanceText.innerHTML = `Bilans jest ujemny. Jesteś na minusie: ${Math.abs(
        this.incomesSum - this.outgoesSum
      )} złotych`;
      this.balanceBanner.classList.remove("alert-secondary");
      this.balanceBanner.classList.remove("alert-success");
      this.balanceBanner.classList.add("alert-danger");
      return;
    } else {
      this.balanceText.innerHTML = `Bilans wynosi zero`;
      this.balanceBanner.classList.remove("alert-danger");
      this.balanceBanner.classList.remove("alert-success");
      this.balanceBanner.classList.add("alert-secondary");
      return;
    }
  }
}
