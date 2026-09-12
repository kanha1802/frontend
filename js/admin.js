document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('appointmentTableBody');
  const refreshBtn = document.getElementById('refreshBtn');

  async function loadAppointments() {
    try {
      const res = await fetch('/api/appointments');
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Could not fetch data');
      }

      if (json.data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding: 2rem;">No appointments booked yet.</td></tr>';
        return;
      }

      tableBody.innerHTML = json.data.map(item => `
        <tr>
          <td>#${item.id}</td>
          <td><strong>${escapeHtml(item.patient_name)}</strong></td>
          <td>${escapeHtml(item.patient_mobile)}</td>
          <td>${escapeHtml(item.problem_type)}</td>
          <td>${item.appointment_date}</td>
          <td>${escapeHtml(item.time_slot)}</td>
          <td><span class="badge badge-${item.status}">${item.status}</span></td>
          <td>
            <select onchange="updateStatus(${item.id}, this.value)" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; width: auto;">
              <option value="Confirmed" ${item.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${item.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
        </tr>
      `).join('');

    } catch (err) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; color: red;">${err.message}</td></tr>`;
    }
  }

  window.updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      loadAppointments();
    } catch (err) {
      alert('Status update failed: ' + err.message);
    }
  };

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  refreshBtn.addEventListener('click', loadAppointments);
  loadAppointments();
});
