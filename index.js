function checkLeapYear(year) {
	return (
		(year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
		(year % 100 === 0 && year % 400 === 0)
	);
}

function getFebDays(year) {
	return checkLeapYear(year) ? 29 : 28;
}
let monthPickerClick = 0;

const monthsName = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const monthPicker = document.getElementById("month-picker");
const dayFormate = document.getElementById("day");
const timeFormate = document.getElementById("time");
const dateFormate = document.getElementById("date");
const headerContainer = document.querySelector(".calendar-container");
console.log(monthPicker, dateFormate, timeFormate, dayFormate);
monthPicker.addEventListener("click", function () {
	if (monthPickerClick % 2 === 0) {
		gsap.to(".day-time-date-container", {
			left: "-150%",
			duration: 1.8,
			ease: Expo.inOut,
		});
		gsap.to(".months_list", {
			x: 0,
			duration: 1.8,
			ease: Expo.inOut,
		});
	} else {
		gsap.to(".day-time-date-container", {
			left: "21%",
			duration: 1.8,
			ease: Expo.inOut,
		});
		gsap.to(".months_list", {
			x: "150%",
			duration: 1.8,
			ease: Expo.inOut,
		});
	}
	monthPickerClick++;
});
function generateCalendar(month, year) {
	const calendarDays = document.querySelector(".calendar_days");
	calendarDays.innerHTML = "";
	const firstDay = new Date(year, month);

	const headerYear = document.querySelector(".year");
	const daysInMonth = [
		31,
		getFebDays(year),
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31,
	];
	monthPicker.innerHTML = monthsName[month];
	headerYear.innerHTML = year;

	let currDate = new Date();
	for (i = 0; i <= daysInMonth[month] + firstDay.getDay() - 1; i++) {
		let day = document.createElement("div");

		if (i >= firstDay.getDay()) {
			// console.log(i - firstDay.getDay() + 1);
			day.innerHTML = i - firstDay.getDay() + 1;
			if (
				i - firstDay.getDay() + 1 === currDate.getDate() &&
				year === currDate.getFullYear() &&
				month === currDate.getMonth()
			) {
				day.classList.add("current-date");
			}
		}
		// console.log(day);
		calendarDays.appendChild(day);
	}
}

const tl = gsap.timeline();
tl.from(".calendar-header", {
	y: "-370%",
	duration: 1.6,
	ease: Expo.inOut,
})
	.from(".calendar-week-days", {
		x: "-370%",
		opacity: 0,
		duration: 1.6,
		ease: Expo.inOut,
	})
	.from(".calendar_days", {
		x: "370%",
		opacity: 0,
		duration: 1.6,
		ease: Expo.inOut,
	})
	.from([".day-container", ".time-date-container"], {
		scale: "0",
		duration: 1.5,
		ease: Expo.inOut,
	});
const currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

console.log(currentMonth.value);

const monthList = document.querySelector(".months_list");
monthsName.forEach((m, index) => {
	const month = document.createElement("div");
	month.innerHTML = `${m}`;
	monthList.append(month);

	month.addEventListener("click", function () {
		monthPickerClick++;
		currentMonth.value = index;
		generateCalendar(currentMonth.value, currentYear.value);
		gsap.to(".day-time-date-container", {
			left: "21%",
			duration: 1.8,
			ease: Expo.inOut,
		});
		gsap.to(".months_list", {
			x: "150%",
			duration: 1.8,
			ease: Expo.inOut,
		});
		gsap.from(".calendar_days", {
			y: "-50%",
			opacity: 0,
			duration: 0.7,
		});
	});
});
headerContainer.addEventListener("click", function (e) {
	if (e.target.classList.contains("year-prev")) {
		currentYear.value--;
		const year = currentYear.value;
		const month = currentMonth.value;
		generateCalendar(month, year);

		gsap.from(".calendar_days", {
			y: "-50%",
			opacity: 0,
			duration: 0.7,
			ease: Expo.inOut,
		});
	} else if (e.target.classList.contains("year-next")) {
		currentYear.value++;
		const year = currentYear.value;
		const month = currentMonth.value;
		generateCalendar(month, year);

		gsap.from(".calendar_days", {
			y: "-150%",
			opacity: 0,
			duration: 0.7,
			ease: Expo.inOut,
		});
		console.log(currentYear.value);
	} else return;
});
const dateShow = document.getElementById("date");
const timeShow = document.getElementById("time");
const todayDate = new Date();
const showDateOption = {
	day: "numeric",
	month: "numeric",
	year: "numeric",
};
const date = new Intl.DateTimeFormat("in-IN", showDateOption).format(todayDate);
dateShow.textContent = date;
setInterval(() => {
	const timer = new Date();
	const timerOption = {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	};
	const showTimer = new Intl.DateTimeFormat("in-In", timerOption).format(timer);
	// timeShow.textContent = "";
	timeShow.textContent = showTimer;
}, 1000);
