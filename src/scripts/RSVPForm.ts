// Form Validation

export class RSVPForm {
    private form: HTMLFormElement;

    constructor(formId: string) {
        this.form = document.getElementById(formId) as HTMLFormElement;
        if (!this.form) throw new Error(`Form with id ${formId} not found`);
        this.init();
    }

    private init(): void {
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();

        if (!this.form.checkValidity()) {
            event.stopPropagation();
            this.form.classList.add("was-validated");
            return;
        }

        this.showSuccessMessage();
        this.form.reset();
        this.form.classList.remove("was-validated");
    }

    private showSuccessMessage(): void {
        alert("Спасибо за ваш ответ! Мы сохранили ваши данные.");
    }
}
