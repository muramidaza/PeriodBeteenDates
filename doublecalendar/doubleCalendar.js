function getDoubleCalendar(targetStart, targetEnd, targetResult) {
	
	function cloneDate(date) {
		return new Date(date.getTime());			
	}
	
	var monthWords = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	
	var dateCalendar1;//месяц отображаемый в первом календаре
	var dateCalendar2;//месяц отображаемый во втором календаре
	
	var flagSelect = false;
	
	var doubleCalendar = $('<div>', {class: 'doubleCalendar'});
	var calendarElem1 = $(generateCalendar()).addClass('calendarstart');
	var calendarElem2 = $(generateCalendar()).addClass('calendarend');
	doubleCalendar.append(calendarElem1);
	doubleCalendar.append(calendarElem2);			
	
	var $targetStart = $(targetStart);
	var $targetEnd = $(targetEnd);
	var $targetResult = $(targetResult);

	function fulldate(num) {
		if(num > 0 && num < 10) return '0' + num; else return num;
	}
	
	function makeDate(datestr) {
		var datearr = datestr.split('.');
		var dateresult = new Date(datearr[2], datearr[1], datearr[0], 0, 0, 0);	
		if(dateresult == 'Invalid Date') return null; else return dateresult;
	}
	
	function compareDateMonth(dateA, dateB) {
		dateA.setDate(1);
		dateB.setDate(1);
		dateA.setHours(0, 0, 0, 0);
		dateB.setHours(0, 0, 0, 0);			

		if(dateA < dateB) return 1;
		if(dateA > dateB) return -1;
		return 0;
	}			

	function compareDateDay(dateA, dateB) {
		dateA.setHours(0, 0, 0, 0);
		dateB.setHours(0, 0, 0, 0);				
		if(dateA > dateB) return false;
		return true;
	}
	
	function resetMark() {
		$('.day').removeClass('select start end');
		$targetStart.val('');
		$targetEnd.val('');
		$targetResult.html('');				
	}
	
	function markPeriod(startElem, endElem, diff) {
		
		var startCal1 = $(startElem).parent().parent().hasClass('calendarstart');
		var startCal2 = $(startElem).parent().parent().hasClass('calendarend');
		var endCal1 = $(endElem).parent().parent().hasClass('calendarstart');
		var endCal2 = $(endElem).parent().parent().hasClass('calendarend');
		
		var start = $(startElem).html();
		var end = $(endElem).html();
		
		console.log('StartCal1:' + startCal1);
		console.log('StartCal2:' + startCal2);
		console.log('EndCal1:' + endCal1);
		console.log('EndCal2:' + endCal2);
		
		if(startCal1 && endCal1) {
			start = start - 1;
			end = end - 1;
			console.log(start + '-' + end);
			$('.calendarstart .day:gt(' + start + ')').addClass('select');
			$('.calendarstart .day:gt(' + end + ')').removeClass('select');
		}
		if(startCal1 && endCal2) {
			start = start - 1;
			end = end - 1;
			console.log(start + '-' + end);
			$('.calendarstart .day:gt(' + start + ')').addClass('select');
			$('.calendarend .day:lt(' + end + ')').addClass('select');
		}
		if(startCal2 && endCal2) {
			start = start - 1;
			end = end - 1;
			console.log(start + '-' + end);
			$('.calendarend .day:gt(' + start + ')').addClass('select');
			$('.calendarend .day:gt(' + end + ')').removeClass('select');
		}				
	}
	
	function generateCalendar() {
		return $('<div>', {class: 'calendar'}).html(`<div class="controls">
			<div class="date"></div>
			<div class="buttons">
				<a class="button prev">&larr;</a>
				<a class="button next">&rarr;</a>
			</div>
		</div>
		<div class="daysofweek">
			<div class="dayofweek">Пн</div><div class="dayofweek">Вт</div><div class="dayofweek">Ср</div><div class="dayofweek">Чт</div><div class="dayofweek">Пт</div><div class="dayofweek">Сб</div><div class="dayofweek">Вс</div>
		</div>
		<div class="days"></div>`);
	}
	
	function getDoubleCalendarElem() {
		console.log('calendar');
		console.log(targetStart);
		console.log(targetEnd);
		console.log(targetResult);
		
		var date1 = makeDate(targetStart.val());  
		var date2 = makeDate(targetEnd.val()); 
		
		//если в обоих инпутах есть правильные даты и вторая дата больше первой то в календарях указываем выбранные месяцы и рисуем период, 
		//если обе даты в пределах одного месяца то во втором месяце показываем следующий месяц
		if(date1 && date2 && compareDateDay(cloneDate(date1), cloneDate(date2))) {
			switch (compareDateMonth(cloneDate(date1), cloneDate(date2))) {
				case 1:
					dateCalendar1 = cloneDate(date1);
					dateCalendar2 = cloneDate(date2);
					var dateStart = cloneDate(date1);
					var dateEnd = cloneDate(date2);
					break;
				case 0: 
					dateCalendar1 = cloneDate(date1);
					dateCalendar2 = cloneDate(date2);;
					dateCalendar2.setMonth(dateStart.getMonth + 1);
					var dateStart = cloneDate(date1);
					var dateEnd = cloneDate(date2);
					break;
			}
		} else {	
			console.log('Inputs empty');
			var dateStart = null;//дата начала выбранного периода
			var dateEnd = null;//дата конца выбранного периода
			dateCalendar1 = new Date();
			dateCalendar2 = cloneDate(dateCalendar1);
			dateCalendar2.setMonth(dateCalendar1.getMonth() + 1);
							
			console.log(dateCalendar1);
			console.log(dateCalendar2);
		}
		
		calendarElem1.find('.prev').click(prev1);
		calendarElem1.find('.next').click(next1);
		calendarElem2.find('.prev').click(prev2);
		calendarElem2.find('.next').click(next2);
		
		console.log(calendarElem1);
		console.log(dateCalendar1);
		console.log(calendarElem2);
		console.log(dateCalendar2);				
		
		create(calendarElem1, dateCalendar1);//создаем дни в первом календаре
		create(calendarElem2, dateCalendar2);//создаем дни во втором календаре
		
		markPeriod(dateStart, dateEnd);//рисуем выбранный период
		
		return doubleCalendar;
	}
	
	function prev1() {			
		resetMark();
		dateCalendar1.setMonth(dateCalendar1.getMonth() - 1);
		create(calendarElem1, dateCalendar1);
	}
	
	function next1() {
		resetMark();
		dateCalendar1.setMonth(dateCalendar1.getMonth() + 1);
		create(calendarElem1, dateCalendar1);
		if(compareDateMonth(cloneDate(dateCalendar1), cloneDate(dateCalendar2)) === 0 || compareDateMonth(cloneDate(dateCalendar1), cloneDate(dateCalendar2)) === -1) {
			dateCalendar2.setMonth(dateCalendar2.getMonth() + 1);
			create(calendarElem2, dateCalendar2);
		}
	}

	function prev2() {
		dateCalendar2.setMonth(dateCalendar2.getMonth() - 1);
		if(compareDateMonth(cloneDate(dateCalendar1), cloneDate(dateCalendar2)) === 1) {
			resetMark();
			create(calendarElem2, dateCalendar2);
		} else {
			dateCalendar2.setMonth(dateCalendar2.getMonth() + 1);
		}
	}
	
	function next2() {
		resetMark();
		dateCalendar2.setMonth(dateCalendar2.getMonth() + 1);
		create(calendarElem2, dateCalendar2);
	}
	
	function create(calendarElem, d) {
		var dateNow = new Date();
		
		var year = d.getFullYear();
		var month = d.getMonth();
		var dayCount = (new Date(year, month + 1, 0)).getDate();
		var dayStart = (new Date(year, month, 1)).getDay();
		if(dayStart == 0) dayStart = 7;
		//если месяц и год в d совпадет с текущим то ищем и отмечаем сегодняшний день
		
		console.log('create');
		console.log(dateNow);
		console.log(d);
		console.log(compareDateMonth(cloneDate(dateNow), cloneDate(d)));
		if (compareDateMonth(cloneDate(dateNow), cloneDate(d)) === 0) {var today = dateNow.getDate();} else {var today = null};
		console.log(today);
		
		printDate(calendarElem, d);
		
		generateDays(calendarElem, d, dayCount, today, dayStart);
	}
	
	function generateDays(calendarElem, d, dayCount, today, dayStart) {
		var $days = calendarElem.find('.days');
		$days.html('');
		for (var i = 1; i < dayStart; i++) {
			var $cell = $('<div>', {class: 'emptycell'});	
			$days.append($cell);
		}
		for (var i = 1; i <= dayCount; i++) {
			var datestr = fulldate(i) + '.' + fulldate(d.getMonth()) + '.' + d.getFullYear(); //записывам в data элемента day
			var $day = $('<div>', {class: 'day'}).data('date', datestr).click(setdate);
			if (i === today) {$day.addClass('today');}
			$day.html(i);
			$days.append($day);
		}
	}
	
	function printDate(calendarElem, d) {
		calendarElem.find('.date').html(d.getFullYear() + ' ' + monthWords[d.getMonth()]);
	}
	
	function getCountDays(dateStart, dateEnd) {
		var diff = Math.ceil((dateEnd.getTime() - dateStart.getTime())/(1000 * 60 * 60 * 24)) + 1;
		return diff;
	}
	
	function setdate () {
		var $elem = $(event.target);
		if(flagSelect) {
			var dateEnd = makeDate($elem.data('date'));
			var $elemStart = $('.start')
			var dateStart = makeDate($elemStart.data('date'));
			console.log(dateStart);
			console.log(dateEnd);
			console.log(compareDateDay(cloneDate(dateStart), cloneDate(dateEnd)));
			if(compareDateDay(cloneDate(dateStart), cloneDate(dateEnd))) {
				$targetEnd.val($elem.data('date'));
				$elem.addClass('select');
				$elem.addClass('end');
				var diffDays = getCountDays(dateStart, dateEnd);
				$targetResult.html('Продолжительность периода дней: ' + diffDays);
				markPeriod($elemStart, $elem, diffDays);
				flagSelect = false;						
			}
			
		} else {
			resetMark();
			$targetStart.val($elem.data('date'));
			$('.day').removeClass('select start end');
			$elem.addClass('select');
			$elem.addClass('start');
			flagSelect = true;
		}
	}			
	
	return getDoubleCalendarElem();
}