
function getRandomColor() {
    var r = Math.floor(Math.random() * 128) + 128;
    var g = Math.floor(Math.random() * 128) + 128;
    var b = Math.floor(Math.random() * 128) + 128;
    return "rgb(" + r + "," + g + "," + b + ")";
}


function addCard() {
    var truckNamePlaceholder = "License Plate Number";
    var mileagePlaceholder = "Enter Mileage";
    var datePlaceholder = "Select Date";
    var driverName = "Enter Driver Name"; 
    var randomColor = getRandomColor();
    var card = `
        <div class="col-md-4">
            <div class="card" data-toggle="modal" data-target="#cardDetailsModal" style="background-color: ${randomColor};">
                <div class="card-body">
                    <h5 class="card-title">${truckNamePlaceholder}</h5>
                    <p class="card-text driver-text">Driver: ${driverName}</p> <!-- Show driver name -->
                    <p class="card-text mileage-text">Mileage: ${mileagePlaceholder}</p>
                    <p class="card-text date-text">Date: ${datePlaceholder}</p>
                </div>
            </div>
        </div>
    `;
    $("#cardContainer").append(card);
}


$("#addCardBtn").click(addCard);


$("#cardDetailsForm").submit(function(event) {
    event.preventDefault();
    var truckName = $("#truckName").val();
    var mileage = $("#mileage").val();
    var date = $("#date").val();
    var driverName = $("#driverName").val();
    var editedCard = $(".card.editing");

    if (editedCard.length > 0) {
        
        var existingCard = editedCard.parent();
        existingCard.find(".card-title").text(truckName);
        existingCard.find(".mileage-text").text("Mileage: " + mileage);
        existingCard.find(".date-text").text("Date: " + date);
        existingCard.find(".driver-text").text("Driver: " + driverName); 
        existingCard.removeClass("editing");
    } else {
        var randomColor = getRandomColor();
        var card = `
            <div class="col-md-4">
                <div class="card" data-toggle="modal" data-target="#cardDetailsModal" style="background-color: ${randomColor};">
                    <div class="card-body">
                        <h5 class="card-title">${truckName}</h5>
                        <p class="card-text mileage-text">Mileage: ${mileage}</p>
                        <p class="card-text date-text">Date: ${date}</p>
                        <p class="card-text driver-text">Driver: ${driverName}</p> <!-- Add driver name -->
                    </div>
                </div>
            </div>
        `;
        $("#cardContainer").append(card);
    }

    $("#cardDetailsForm")[0].reset();
    $('#cardDetailsModal').modal('hide'); 
});


$("#cardContainer").on("click", ".card", function() {
    $(".card").removeClass("editing");
    $(this).addClass("editing");
    
    var truckName = $(this).find(".card-title").text();
    var mileage = $(this).find(".mileage-text").text().split(":")[1].trim();
    var date = $(this).find(".date-text").text().split(":")[1].trim();
    var driverName = $(this).find(".driver-text").text().split(":")[1].trim(); 
    $("#truckName").val(truckName);
    $("#mileage").val(mileage);
    $("#date").val(date);
    $("#driverName").val(driverName); 
});


$("#deleteCardBtn").click(function() {
    var editedCard = $(".card.editing");
    editedCard.parent().remove();
    $("#cardDetailsForm")[0].reset();
    $('#cardDetailsModal').modal('hide');
});


$("#deliverTruckBtn").click(function() {
    $('#cardDetailsModal').modal('hide'); 
    $('#deliverTruckModal').modal('show'); 
});


$("#goBackBtn").click(function() {
    $('#cardDetailsModal').modal('show'); 
    $('#deliverTruckModal').modal('hide'); 
});




document.getElementById("calculateBtn").addEventListener("click", function() {
    
    $('.modal').modal('hide');

    
    $('#calculationResultModal').modal('show').css('display', 'block');
});




$(document).ready(function() {
    
    $("#goBackBtn").click(function() {
        
        $("#deliverTruckModal").modal("hide");
        
    });

    
});

document.getElementById("calculateBtn").addEventListener("click", function() {
    
    var currentMileage = parseFloat($("#Cmileage").val());
    var fuelAdded = parseFloat($("#AddedFuel").val());
    var mileage = parseFloat($("#mileage").val());
    var ratePerGallon = parseFloat(document.getElementById("FuelPriceRate").value);

    
    var result = (fuelAdded - ((currentMileage - mileage) / 3))*ratePerGallon;

     
     var message;
     if (result >= 0) {
        message = $("#driverName").val() + " You will get " + result.toFixed(2) + "$ from the company.";
    } else {
        message = $("#driverName").val() + " You have to pay " + Math.abs(result).toFixed(2) + "$ for the company.";
    }

    
    $("#calculationResult").text(message);
    $('#calculationResultModal').modal('show');
});




