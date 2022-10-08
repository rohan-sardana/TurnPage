console.log("https://github.com/gcivil-nyu-org/team-3-inperson")

let startingPosition;
let currentPosition;

$('.draggable').draggable({
    drag: function (e, ui) {
        startingPosition = ui.originalPosition;
        currentPosition = ui.position;
        // console.log(currentPosition)
        if (currentPosition.left > 700) {
            console.log("Swiped right")
        }
        else if (currentPosition.left < 50) {
            console.log("Swiped left")
        }
        else if (currentPosition.top > 300) {
            console.log("Swiped down")
        }


    },
    // axis: 'x',
    cursor: "grabbing"
});

