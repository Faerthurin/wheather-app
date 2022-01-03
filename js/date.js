function setDate() {
  let date = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "WednesDay",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  let formatDate = document.querySelector("h3");
  formatDate.innerHTML = `${day} ${hour}:${minute}`;

  return formatDate;
}
setDate();
