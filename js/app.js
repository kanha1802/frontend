document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');
  const alertBox = document.getElementById('feedbackAlert');
  const dateInput = document.getElementById('appointment_date');

  // Prevent booking past dates
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showAlert('', 'none');

    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const problem_type = document.getElementById('problem_type').value;
    const appointment_date = document.getElementById('appointment_date').value;
    const time_slot = document.getElementById('time_slot').value;
    const notes = document.getElementById('notes').value.trim();

    try {
      // 1. Register or retrieve user
      const userRes = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile })
      });
      const userData = await userRes.json();

      if (!userRes.ok || !userData.success) {
        throw new Error(userData.message || 'Failed to complete patient registration.');
      }

      const userId = userData.user.id;

      // 2. Book appointment
      const apptRes = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          problem_type,
          appointment_date,
          time_slot,
          notes
        })
      });

      const apptData = await apptRes.json();

      if (!apptRes.ok || !apptData.success) {
        throw new Error(apptData.message || 'Appointment booking failed.');
      }

      showAlert(`Success! Appointment confirmed for ${name} on ${appointment_date} (${time_slot}).`, 'success');
      form.reset();

    } catch (err) {
      showAlert(err.message, 'error');
    }
  });

  function showAlert(message, type) {
    alertBox.className = 'alert';
    if (type === 'none') {
      alertBox.style.display = 'none';
      return;
    }
    alertBox.textContent = message;
    alertBox.classList.add(type);
  }
});
