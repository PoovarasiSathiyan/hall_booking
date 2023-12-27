let rooms = [{
    roomId:"0",
    seatsAvailable:"4",
    amenities:"TV,AC",
    pricePerhr:"100"
},
{
    roomId:"1",
    seatsAvailable:"10",
    amenities:"TV,Non-AC",
    pricePerhr:"200"
}
];

let bookings = [{
    customer: "poovarasi",
    bookingDate: "17/10/2023",
    startTime: "12:00pm",
    endTime: "11:59am",
    bookingID: "B1",
    roomId: "0",
    status: "booked",
    booked_On: "11/10/2023"
},
{
    customer: "priyu",
    bookingDate: "18/10/2023",
    startTime: "12:00pm",
    endTime: "11:59am",
    bookingID: "B2",
    roomId: "1",
    status: "booked",
    booked_On: "11/10/2023"
}
];
let customers = [
    { name: 'poovarasi',
     bookings: [ 
        {
            customer: 'poovarasi',
            bookingDate: '17/10/2023',
            startTime: '12:00pm',
            endTime: '11:59am',
            bookingID: 'B1',
            roomId: '0',
            status: 'booked',
            booked_On: '11/10/2023'
          }
      ] },
      {
         name: 'priyu',
        bookings: [ 
           {
            customer: 'priyu',
            bookingDate: '18/10/2023',
            startTime: '12:00pm',
            endTime: '11:59am',
            bookingID: 'B2',
            roomId: '1',
            status: 'booked',
            booked_On: '11/10/2023'
            }
         ] }     
];

// View Rooms

const getRooms = async(req,res)=>{
    try {
            res.status(200).send({
                message:"Room List",
                rooms
            })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

// Create Rooms

const create = async(req,res)=>{
    try {
            let data = req.body
            let filteredData = rooms.filter((e)=>e.roomId==data.roomId)
            if(filteredData.length===0)
            {
                rooms.push(data)
                res.status(201).send({
                    message:"Room created successfully"
                })
            }
            else
            {
                res.status(400).send({
                    message:"Room Already Exists" 
                })
            }

    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
//Book Room
const bookRooms = async(req,res)=>{
    try {
        const id =req.params.id;
        let bookRoom = req.body;
        let date = new Date();
        let dateFormat = date.toLocaleDateString();
        let idExist = rooms.find((e)=>e.roomId === id)
        if(idExist === undefined){
            res.status(400).send({
                message:"Room Does Not Exist.",
                RoomList:rooms
            })
        }
        let matchID = bookings.filter((b)=>b.roomId === id)
        console.log(matchID)
        if(matchID.length===0)
        {
            let dateCheck = matchID.filter((m)=> m.bookingDate === bookRoom.bookingDate)
            console.log(dateCheck)
            if(dateCheck.length===0){
                let newID = "B"+(bookings.length+1)
                let newBooking = {...bookRoom, bookingID:newID, roomdID:id, status:"booked", booked_On: dateFormat}
                bookings.push(newBooking)
                res.status(201).send({
                    message:"Hall Booked",
                    Booking:bookings,
                    added:newBooking
                })
            }
            else{
                res.status(400).send({
                    message:"Hall already booked for this date, Choose another hall",
                    Bookings:bookings
                })
            }
           
        }
        else{
            let newID = "B"+(bookings.length + 1);
            let newbooking = {...bookRoom, bookingID: newID, roomId:id, status:"booked",booked_On: dateFormat}
            bookings.push(newbooking);
            const customerdetails = customers.find(cust => 
              cust.name === newbooking.customer);
              if (customerdetails) {
                  customerdetails.bookings.push(newbooking);
              } else {
                  customers.push({ name:newbooking.customer,bookings:[newbooking]});
              }
             res.status(201).send({
                message:"hall booked", 
                Bookings:bookings, 
                added:newbooking});
    }
    } catch (error) {
        res.status(400).send({
            message:"Error in Booking Room",
            Error:error,
            date:bookings
        })
    }
}
// View Booking
const viewBooking = async(req,res)=>{
    try {
        const bookedRooms = bookings.map(booking => {
            const {roomId ,Status,customer,bookingDate,startTime,endTime} = booking;
            return {roomId ,Status,customer,bookingDate,startTime,endTime} 
        });
        res.status(201).send({
            Message:bookedRooms
    })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
// View Costomer with Booking Details

const getCustomer = async(req,res)=>{
    try {
        const customerBookings = customers.map(customer => {
            const { name, bookings } = customer;
            const customerDetails = bookings.map(bookings => {
              const { roomId, bookingDate, startTime, endTime } = bookings;
              return { name, roomId, bookingDate, startTime, endTime };
            });
            return customerDetails;
          })
          res.send({customerBookings});
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
// View Bookings by Customer name
const getByCustomername = async(req,res)=>{
    try {
        const { name } = req.params;
    const customer = customers.find(cust => cust.name === name);
    if (!customer) {
      res.status(404).send({ error: 'Customer not found' });
      return;
    }
    const customerBookings = customer.bookings.map(booking => {
      const { customer,roomId, startTime, endTime, bookingID, status, bookingDate,booked_On } = booking;
      return { customer, roomId, startTime, endTime, bookingID, status, bookingDate,booked_On };
    });
    count = customerBookings.length;
    res.send({
        Message:`${name} booked ${count} time(s)`,
        Customer:customerBookings
    });
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export default{
    getRooms,
    create,
    bookRooms,
    viewBooking,
    getCustomer,
    getByCustomername
}