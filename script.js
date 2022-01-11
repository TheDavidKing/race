let WIDTH = 480
let HEIGHT = 360
let draw = SVG().addTo(".game").size(WIDTH, HEIGHT)
let bg = draw.rect(WIDTH, HEIGHT).fill("#dde3e1")
let lineleft = draw.line(30, 0, 30, HEIGHT).stroke({width: 10, color: "black"})
let lineright = draw.line(WIDTH-30, 0, WIDTH-30, HEIGHT).stroke({width: 10, color: "black"})
let linemidle = draw.line(WIDTH/2, 0, WIDTH/2, HEIGHT).stroke({width: 5, color: "black", dasharray: [10, 10]})
let car = draw.image("car.png").size(30, 60).move(WIDTH/2-15, 300)
let wall = draw.image("wall.png").size(106, 20).move(WIDTH/2, 100)
let text = draw.text("0").move(WIDTH/2, 20).font({size:"44px"})
let points = 0 
let stepcar = 0
let interval = 0
function move(){
    if(linemidle.y() == 0){
        linemidle.dy(10)
    }
    else{
        linemidle.dy(-10)
    }
    wall.dy(2)
    if(wall.y() >= HEIGHT){
        wall.y(0)
        let place = get(40, 334)
        wall.x(place)
    }
    if(wall.y() > HEIGHT-3){
        points += 1
        text.text(points)
    }
    if(car.x() >= WIDTH-30){
        clearInterval(interval)
        document.removeEventListener("keydown", car_move)//Убраем слушатель события keydown. То есть отбираем возможность нажатия на клавишы
        alert("You touch the road...")

    }
    if(car.x() <= 30){
        clearInterval(interval)
        document.removeEventListener("keydown", car_move)
        alert("You touch the road...")
    }
    let collision = wall.y() > car.y() && car.x()+car.width() > wall.x() && wall.width()+wall.x() > car.x()
    if(collision){
        clearInterval(interval)
        document.removeEventListener("keydown", car_move)
        alert("You lose!")
    }
    if(points >= 25){
        clearInterval(interval)
        document.removeEventListener("keydown", car_move)
        alert("You win!!!")
    }
}
document.addEventListener("keydown", car_move)
document.addEventListener("keyup", function(event){
    let key = event.key
    if(key == "d"){
        stepcar = 0
        car.dx(stepcar)
    }
    else if(key == "a"){
        stepcar = 0
        car.dx(stepcar)
    }
})
interval = setInterval(() => {
    move()
}, 10);
function get(min, max){
    return Math.floor(Math.random()*(max-min+1))+min    
}
function car_move(event){//Вынесли функцию для движения машины из addEventListener чтобы можно было ее использовать везде в коде
    let key = event.key
    if(key == "d"){
        stepcar = 4
        car.dx(stepcar)
    }
    else if(key == "a"){
        stepcar = -4
        car.dx(stepcar)
    }
}