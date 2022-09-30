<!-- source:https://codepen.io/ShortCode/pen/PoeWjPJ -->

<template>
  <a>
	<span> </span>
	<span> </span>
	<span> </span>
	<span> </span>
	{{name}}
</a>
 </template>
 
 <script>
 
 export default {
    name: 'TakeOrderBtn',
	props: ['name']
 }
 
 </script>
 
 
 <style lang="scss" scoped>
 
 body {
	margin: 0;
	background: #171618;
	height: 100vh;
	display: grid;
	place-items: center;
}

a {
	position: relative;
    top:50px;
	padding: 3vh 8vw;
	box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);
	color: #6c757d !important;
	text-decoration: none;
	text-transform: uppercase;
	letter-spacing: 4px;
	font: 700 30px consolas;
	overflow: hidden;
}

a span:nth-child(1) {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 3px;
	background: linear-gradient(to right, #0078D4, #bdd9ee);
	animation: animate1 2s linear infinite;
}

@keyframes animate1 {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(100%);
	}
}

a span:nth-child(2) {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 3px;
	background: linear-gradient(to right, #0078D4, #bdd9ee);
	animation: animate2 2s linear infinite;
	animation-delay: 1s;
}
@keyframes animate2 {
	0% {
		transform: translateY(-100%);
	}
	100% {
		transform: translateY(100%);
	}
}

a span:nth-child(3) {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 3px;
	background: linear-gradient(to right, #0078D4, #bdd9ee);
	animation: animate3 2s linear infinite;
}

@keyframes animate3 {
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(-100%);
	}
}

a span:nth-child(4) {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 3px;
	background: linear-gradient(to right, #0078D4, #bdd9ee);
	animation: animate4 2s linear infinite;
	animation-delay: 1s;
}

@keyframes animate4 {
	0% {
		transform: translateY(100%);
	}
	100% {
		transform: translateY(-100%);
	}
}

 </style>