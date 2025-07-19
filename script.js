const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://registration-backend-pfjf.onrender.com/list", requestOptions)
  .then(response => response.json())
  .then(data => renderMembers(data))
  .catch(error => {
    document.getElementById('member-list').innerHTML = `<p style="color:red;">Failed to load members.</p>`;
    console.error(error);
  });

function renderMembers(members) {
  const container = document.getElementById('member-list');
  container.innerHTML = '';

  if (!members || members.length === 0) {
    container.innerHTML = '<p>No members found.</p>';
    return;
  }

  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';

    // Handle photo: fallback if not present
    let photo = member.photo || '';
    if (photo === '' || !photo.startsWith('data:image')) {
      photo = 'https://via.placeholder.com/90?text=No+Photo';
    }

    card.innerHTML = `
      <img class="member-photo" src="${photo}" alt="Member Photo" />
      <div class="member-info">
        <p><b>Name:</b> ${member.name}</p>
        <p><b>Email:</b> ${member.email}</p>
        <p><b>Phone:</b> ${member.phone}</p>
        <p><b>Alternate Phone:</b> ${member.alternate_phone}</p>
        <p><b>Address:</b> ${member.address.replace(/\n/g, '<br>')}</p>
        <p><b>Age:</b> ${member.age}</p>
        <p><b>DOB:</b> ${member.dob}</p>
        <p><b>Occupation:</b> ${member.occupation}</p>
        <p><b>Membership:</b> ${member.membership_mode} (${member.looking_for})</p>
        <p><b>Joined:</b> ${member.date_of_joining}</p>
        <p><b>Membership Ends:</b> ${member.end_of_membership}</p>
        <p><b>Height:</b> ${member.height} cm</p>
        <p><b>Weight:</b> ${member.weight} kg</p>
        <p><b>Physical Problems:</b> ${member.physical_problems}</p>
        <p><b>Fractures:</b> ${member.fractures}</p>
        <p><b>Agreed to Terms:</b> ${member.agreed_to_terms ? 'Yes' : 'No'}</p>
        <p><b>Submitted At:</b> ${member.submitted_at}</p>
      </div>
    `;
    container.appendChild(card);
  });
}
