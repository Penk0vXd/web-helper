document.addEventListener('DOMContentLoaded', function() {
    // Handle copy button clicks
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonType = this.dataset.code;
            const codeElement = this.parentElement.querySelector('code');
            const codeText = codeElement.textContent;

            // Copy to clipboard
            navigator.clipboard.writeText(codeText).then(() => {
                // Show success feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Копирано!';
                this.style.background = 'rgba(46, 204, 113, 0.2)';

                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                // Show error feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-times"></i> Грешка!';
                this.style.background = 'rgba(231, 76, 60, 0.2)';

                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            });
        });
    });
});
