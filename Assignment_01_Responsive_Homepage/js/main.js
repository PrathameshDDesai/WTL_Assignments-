// Assignment 01: Client Interactions & Modal Handling
document.addEventListener('DOMContentLoaded', () => {
  // Appointment Form submission handling
  const appointmentForm = document.getElementById('appointmentForm');
  const bookingAlert = document.getElementById('bookingAlert');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('patientName').value.trim();
      const speciality = document.getElementById('specialitySelect').value;
      const date = document.getElementById('appointmentDate').value;

      if (!patientName || !speciality || !date) {
        bookingAlert.className = 'alert alert-danger small py-2 mb-3';
        bookingAlert.textContent = 'Please fill in all mandatory fields.';
        bookingAlert.classList.remove('d-none');
        return;
      }

      bookingAlert.className = 'alert alert-success small py-2 mb-3';
      bookingAlert.innerHTML = `✅ Appointment request for <strong>${patientName}</strong> in <strong>${speciality}</strong> on <strong>${date}</strong> submitted successfully! You will receive an SMS confirmation.`;
      bookingAlert.classList.remove('d-none');

      setTimeout(() => {
        appointmentForm.reset();
        const modalEl = document.getElementById('appointmentModal');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
          modalInstance.hide();
        }
        bookingAlert.classList.add('d-none');
      }, 3000);
    });
  }

  // Quick Callback Form
  const quickForm = document.getElementById('heroQuickForm');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Our emergency triage coordinator will call you back within 15 minutes.');
      quickForm.reset();
    });
  }
});
