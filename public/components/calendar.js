function calendar(users) {
  for (var i = 1; i <= 12; i++) {
    let months =`<div id="calendarBox">
                  <div class="content">
                    <div class="profiledate m${i}">
                    </div>
                    <div id="person${i}" class="persons">
                    </div>
                  </div>
                </div>`
    $('#calendar').append(months)
    users.forEach((e) => {
      if (e.birthday.slice(0, 2) == i) {
        $(`#person${i}`).append(`<p>• ${e.birthday.slice(3, 5)} - ${e.name}</p>`)
      }
    })
  }
}
