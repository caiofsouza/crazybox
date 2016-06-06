var vm = new Vue({
	el: "#game",
	data:{
		gameButtonStatus: "Start Game",
		initialTime: 3,
		points: 0,
		startedGame: false,
		pointRate: 1,
		startedCrazyBox: false,
		w_height: window.innerHeight  - 60, // sidebar
		w_width: window.innerWidth - 16, // scroll and other element of browser
		box_height: 230,
		box_width: 230,
		topPos: 0,
		leftPos: 0,
		cb_interval: null,
		animationTime: 1000,
		animationInterval: 1000,
		powerDuration: 3000,
		countDown: 3,
		countDownShow: false,
		resultPoints: false,
		freezed: false,
		stopTime: false,
		doubleBox: false,
		availablePowers: [
			{
				name: "Freezed Box",
				init: function(){
					var this_power = this;

					this_power.active = true;
					// console.log("vm freeze: ", vm.freezed);
					vm.freezed = true;

					// console.log("vm freeze: ", vm.freezed);
					setTimeout(function(){

						vm.freezed = false;
						this_power.active = false;

					}, vm.powerDuration);
				},
				active: false
			},
			{
				name: "Double Points",
				init: function(){
					var this_power = this; 

					this_power.active = true;
					vm.pointRate = 2;

					setTimeout(function(){

						vm.pointRate = 1;
						this_power.active = false;

					}, vm.powerDuration);
				},
				active: false
			},
			// {
			// 	name: "Double Box",
			// 	init: function(){
			// 		var this_power = this;

			// 		this_power.active = true;
			// 		vm.doubleBox = true;

			// 		setTimeout(function(){

			// 			vm.doubleBox = false;
			// 			this_power.active = false;

			// 		}, vm.powerDuration);
			// 	},
			// 	active: false
			// },
			{
				name: "Monster Box",
				init: function(){
					var this_power = this;

					this_power.active = true;
					vm.box_height = 500;
					vm.box_width = 500;

					setTimeout(function(){

						vm.box_height = 230;
						vm.box_width = 230;

						this_power.active = false;

					}, vm.powerDuration);
				},
				active: false
			},
			{
				name: "Stop Time",
				init: function(){
					var this_power = this;

					this_power.active = true;
					vm.stopTime = true;

					setTimeout(function(){

						vm.stopTime = false;

						this_power.active = false;

					}, vm.powerDuration);
				},
				active: false
			},
		]
	},

	methods: {
		startCountDown: function(){
			this.countDownShow = true;

			var middlePageX = ( this.w_width - this.box_width ) / 2;


			setTimeout(function(){
				document.getElementById("countdown").style.left = ( middlePageX - 50)  + "px";
			}, 100);


			setTimeout(function(){

				vm.startCrazyBox();
				vm.startCountTime();
					
			}, 4100);

			setInterval(function(){

				if(vm.countDown == 1){
					document.getElementById("countdown").style.left = ( middlePageX - 230 )   + "px";
					vm.countDown = "GO!";

					setTimeout(function(){
						vm.countDownShow = false;
					}, 500);
				}else{
					vm.countDown --;
				}

			}, 1000);
		},

		centralizeBox: function(){
			this.topPos = ( this.w_height - this.box_height ) / 2;
			this.leftPos = ( this.w_width - this.box_width ) / 2;
		},

		startGame: function(){
			this.resetGameSettings();
			this.startedGame = true;
			this.startCountDown();
		},

		getPoints: function(event){

			if(this.startedGame && this.countDownShow === false){
				this.newPointPlus();
				this.newPower();
				this.points += this.pointRate;
			}
		},

		newPower: function(){

			// matematicamente, 0 e 10 sao os numeros mais incomuns de sair
			// ou seja, sempre os dois da ponta de um Math.random * x
			
			var randomNumber = Math.round(Math.random() * 10);
			if(randomNumber > 6){
				var gotARandomPower = Math.round(Math.random() * 3);

				
				if(this.availablePowers[gotARandomPower].active === false){
					console.log(this.availablePowers[gotARandomPower].name);

					vm.newPowerTitle(this.availablePowers[gotARandomPower].name);
					this.availablePowers[gotARandomPower].init();
				}
				
			}

		},

		newPowerTitle: function(title){

			var pageY = event.pageY;
			var pageX = event.pageX;

			var newPowerTitle = document.createElement("div");
			newPowerTitle.className = 'power-title';
			newPowerTitle.style.top = pageY + "px";
			newPowerTitle.style.left = pageX + "px";
			newPowerTitle.innerHTML = title;
			document.getElementById("game-content").appendChild(newPowerTitle);

			setTimeout(function(){
				newPowerTitle.style.top = (pageY - 90)  + "px";
				newPowerTitle.style.left = pageX + "px";

				setTimeout(function(){

					newPowerTitle.style.top = (pageY - 120)  + "px";
					newPowerTitle.style.left = (pageX + 30) + "px";
					newPowerTitle.style.fontSize = "30px";

					setTimeout(function(){

						newPowerTitle.style.top = (pageY - 120)  + "px";
						newPowerTitle.style.left = ( pageX + 120 ) + "px";

						newPowerTitle.style.opacity = 0;
						newPowerTitle.className = 'hidden';

						setTimeout(function(){
							newPowerTitle.remove();
						}, 100);


					}, 200);
				
				}, 100);

			}, 0);
		},

		newPointPlus: function(title){

			var pageY = event.pageY;
			var pageX = event.pageX;

			var newPoint = document.createElement("div");
			newPoint.className = 'point-effect';
			newPoint.style.top = pageY + "px";
			newPoint.style.left = pageX + "px";
			newPoint.innerHTML = "+" + this.pointRate;
			document.getElementById("game-content").appendChild(newPoint);

			setTimeout(function(){
				newPoint.style.top = (pageY - 90)  + "px";
				newPoint.style.left = pageX + "px";

				setTimeout(function(){

					newPoint.style.top = (pageY - 120)  + "px";
					newPoint.style.left = (pageX - 30) + "px";
					newPoint.style.fontSize = "33px";

					setTimeout(function(){

						newPoint.style.top = (pageY - 120)  + "px";
						newPoint.style.left = ( pageX - 120 ) + "px";

						setTimeout(function(){
							newPoint.style.opacity = 0;


							setTimeout(function(){
								newPoint.style.display = "none";
								newPoint.remove();

							}, 100);

						}, 50);
						

					}, 100);
				
				}, 100);

			}, 0);
		},

		resetGameSettings: function(){

			this.initialTime =  3;
			this.points =  0;
			this.pointRate =  1;
			this.startedCrazyBox =  false;
			this.box_height =  230;
			this.box_width =  230;
			this.animationTime =  1000;
			this.animationInterval =  1000;
			this.freezed =  false;
			this.powerDuration =  5000;
			this.stopTime =  false;
			this.countDown = 3;

		},

		startCrazyBox: function(){
			this.startedCrazyBox = true; 
			if(this.startedGame){

				this.cb_interval = setInterval(function(){

					if(vm.startedGame){
						if(vm.freezed === false && vm.startedGame){
							vm.changeCrazyBoxPos();
						}
					}

				}, this.animationInterval );
			}
		},

		changeCrazyBoxPos: function(){

			var newTopPos = Math.round( ( Math.random() * ( this.w_height - this.box_height ) ) );
			var newLeftPos = Math.round( ( Math.random() * ( this.w_width - this.box_width ) ) );

			this.topPos = newTopPos;
			this.leftPos = newLeftPos; 
		},

		startCountTime: function(){

			setInterval(function(){
				if(vm.initialTime > 0){
					if(vm.stopTime === false){
						vm.initialTime --;
					}
				}else{
					vm.stopGame();
				}
			}, 1000);

		},

		stopGame: function(){
			ClearAllIntervals(function(){

				vm.resultPoints = true;
				vm.startedGame =  false;
				vm.centralizeBox();
				vm.gameButtonStatus = "Restart Game";
				
			});

		},

		hideModal: function(){

			this.resultPoints = false;
			this.resetGameSettings();

		}

	}
});

vm.centralizeBox();

Vue.config.devtools = true;

function ClearAllIntervals(callback){
	for (var i = 1; i < 100; i++){
       window.clearInterval(i);
	}

	if(callback !== undefined){
		callback();
	}
}
