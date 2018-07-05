const models = require('./models');
const Reservation = models.Reservation;

const reservationQueries = [];

for (let i = 10; i <= 20; i += 2) {

    const query = models.Reservation
                    .findAndCountAll({
                        where : {
                            RestaurantId : 2,
                            time : i
                        },
                        raw: true
                    })

    reservationQueries.push(query);

}

Promise
    .all(reservationQueries)
    .then(function (reservations) {
        console.log(reservations);
    });