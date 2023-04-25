const {
  User,
  Bike,
  Ticket,
  Labor,
  Product,
  Order,
  Todo,
  Cart,
  TicketLabor,
  TicketProduct,
  OrderProduct,
} = require("./models");

const users = [
  {firstname: "Tobin", lastname: "Waters", email: "tobinsemail@email.com", phone: "1111111111", address: "123 some street, some town, UT 12345", employee: "true"},
  {firstname: "Billy", lastname: "Bobby", email: "billyemail@email.com", phone: "2222222222", address: "123 some street, some town, UT 12345", employee: "false"},
  {firstname: "Bobby", lastname: "Billy", email: "bobbyemail@email.com", phone: "3333333333", address: "123 some street, some town, UT 12345", employee: "false"},
  {firstname: "Bill", lastname: "BillyBob", email: "billemail@email.com", phone: "4444444444", address: "123 some street, some town, UT 12345", employee: "false"},
  {firstname: "Bob", lastname: "BobbyBill", email: "bobemail@email.com", phone: "5555555555", address: "123 some street, some town, UT 12345", employee: "false"},
  {firstname: "Timmy", lastname: "Tommy", email: "timmyemail@email.com", phone: "6666666666", address: "123 some street, some town, UT 12345", employee: "false"},
  {firstname: "Tommy", lastname: "Timmy", email: "tommyemail@email.com", phone: "7777777777", address: "123 some street, some town, UT 12345", employee: "false"},
  {firstname: "Tim", lastname: "TommyTim", email: "timemail@email.com", phone: "8888888888", address: "123 some street, some town, UT 12345", employee: "false"},
  {firstname: "Tom", lastname: "TimmyTom", email: "tomemail@email.com", phone: "9999999999", address: "123 some street, some town, UT 12345", employee: "false"},
  {firstname: "Leeroy", lastname: "Jenkins", email: "leeroyemail@email.com", phone: "0000000000", address: "123 some street, some town, UT 12345", employee: "true"},
]
const bikes = [
  {userId: "1", brand: "Santa Cruz", model: "Bronson", color: "Black/Pink", size: "small", type: "Full Suspension"},
  {userId: "2", brand: "Cannondale", model: "F29", color: "Green", size: "small", type: "Hardtail"},
  {userId: "3", brand: "Ritchey", model: "Outback", color: "Red", size: "small", type: "Gravel"},
  {userId: "4", brand: "Pinarello", model: "F12", color: "Silver", size: "medium", type: "Road"},
  {userId: "5", brand: "Salsa", model: "Vaya", color: "Yellow", size: "medium", type: "Commuter"},
  {userId: "6", brand: "Orbea", model: "Gain", color: "Blue", size: "medium", type: "E-Bike"},
  {userId: "7", brand: "Giant", model: "Trance", color: "Grey", size: "large", type: "Full Suspension"},
  {userId: "8", brand: "Scott", model: "Scale", color: "Black", size: "large", type: "Hardtail"},
  {userId: "9", brand: "Open", model: "UPPER", color: "Purple", size: "large", type: "Gravel"},
  {userId: "10", brand: "Time", model: "Scylon", color: "Pink", size: "XL", type: "Road"},
]
const tickets = [
  {userId: "1", bikeId: "1", externalNotes: "get this bike fixed up", internalNotes: "fix up the bike", dueDate: '2024-01-12', location: 'Storage', status: 'Checked In', total: '39.99'},
  {userId: "2", bikeId: "2", externalNotes: "get this bike fixed up", internalNotes: "fix up the bike", dueDate: '2024-02-12', location: 'Storage', status: 'Finished', total: '29.99'},
  {userId: "3", bikeId: "3", externalNotes: "get this bike fixed up", internalNotes: "fix up the bike", dueDate: '2024-03-12', location: 'Storage', status: 'Done and Paid', total: '49.99'},
  {userId: "4", bikeId: "4", externalNotes: "get this bike fixed up", internalNotes: "fix up the bike", dueDate: '2024-04-12', location: 'Storage', status: 'Waiting for Parts', total: '59.99'},
  {userId: "5", bikeId: "5", externalNotes: "get this bike fixed up", internalNotes: "fix up the bike", dueDate: '2024-05-12', location: 'Storage', status: 'Not Here', total: '69.99'},
  {userId: "6", bikeId: "6", externalNotes: "get this bike fixed up", internalNotes: "fix up the bike", dueDate: '2024-06-12', location: 'Storage', status: 'Checked In', total: '79.99'},
  {userId: "7", bikeId: "7", externalNotes: "get this bike fixed up", internalNotes: "fix up the bike", dueDate: '2024-07-12', location: 'Storage', status: 'Finished', total: '89.99'},
  {userId: "8", bikeId: "8", externalNotes: "get this bike fixed up", internalNotes: "fix up the bike", dueDate: '2024-08-12', location: 'Storage', status: 'Checked In', total: '99.99'},
  {userId: "9", bikeId: "9", externalNotes: "get this bike fixed up", internalNotes: "fix up the bike", dueDate: '2023-09-12', location: 'Storage', status: 'Finished', total: '129.99'},
  {userId: "10", bikeId: "10", externalNotes: "get this bike fixed up", internalNotes: "fix up the bike", dueDate: '2023-1-12', location: 'Storage', status: 'Done and Paid', total: '229.99'},
]
const labor = [
  {laborTitle: 'LABOR BASIC TUNE', laborDescription: 'basic tune', laborPrice: '85.00', laborTime: '45'},
  {laborTitle: 'LABOR MAJOR TUNE', laborDescription: 'major tune', laborPrice: '150.00', laborTime: '90'},
  {laborTitle: 'LABOR WHEEL TRUE', laborDescription: 'true wheel', laborPrice: '20.00', laborTime: '15'},
  {laborTitle: 'LABOR DERAILLEUR ADJUSTMENT', laborDescription: 'adjust derailleur', laborPrice: '15.00', laborTime: '15'},
  {laborTitle: 'LABOR BRAKE ADJUSTMENT', laborDescription: 'adjust brake', laborPrice: '15.00', laborTime: '15'},
  {laborTitle: 'LABOR INSTALL NEW CHAIN', laborDescription: 'install new chain', laborPrice: '15.00', laborTime: '15'},
  {laborTitle: 'LABOR INSTALL NEW GRIPS', laborDescription: 'install new grips', laborPrice: '10.00', laborTime: '15'},
  {laborTitle: 'LABOR INSTALL NEW SADDLE', laborDescription: 'install new saddle', laborPrice: '10.00', laborTime: '15'},
  {laborTitle: 'LABOR HUB ADJUSTMENT', laborDescription: 'adjust hub', laborPrice: '15.00', laborTime: '15'},
  {laborTitle: 'LABOR HEADSET ADJUSTMENT', laborDescription: 'adjust headset', laborPrice: '15.00', laborTime: '15'},
]
const products = [
  {productTitle: 'Shimano Chain', productDescription: '', productPrice: '25.99', productImage: 'some image'},
  {productTitle: 'Rear Shifter', productDescription: '', productPrice: '39.99', productImage: 'some image'},
  {productTitle: 'Pro Saddle', productDescription: '', productPrice: '15.99', productImage: 'some image'},
  {productTitle: 'DT Swiss Wheel', productDescription: '', productPrice: '100.99', productImage: 'some image'},
  {productTitle: 'Carbon Bar', productDescription: '', productPrice: '75.99', productImage: 'some image'},
]
const orders= [
  {userId: "1", orderTotal: '25.99'},
  {userId: "2", orderTotal: '39.99'},
  {userId: "3", orderTotal: '15.99'},
  {userId: "4", orderTotal: '100.99'},
  {userId: "5", orderTotal: '75.99'},
]
const todo = [
  {complete: "false", description: 'Flush out labor items'},
  {complete: "false", description: 'do something with your day'},
  {complete: "false", description: 'clean up some stuff'},
  {complete: "true", description: 'wipe down some stuff'},
]
const carts = [
  {userId: '1', productId: '1', quantity: "1"},
  {userId: '2', productId: '2', quantity: "1"},
  {userId: '3', productId: '3', quantity: "1"},
  {userId: '4', productId: '4', quantity: "1"},
  {userId: '5', productId: '5', quantity: "1"},
]
const ticketLabor = [
  {ticketId: "1", laborId: "1"},
  {ticketId: "2", laborId: "2"},
  {ticketId: "3", laborId: "3"},
  {ticketId: "4", laborId: "4"},
  {ticketId: "5", laborId: "5"},
]
const ticketProduct = [
  {ticketId: "1", productId: "1"},
  {ticketId: "2", productId: "2"},
  {ticketId: "3", productId: "3"},
  {ticketId: "4", productId: "4"},
  {ticketId: "5", productId: "5"},
]
const orderProduct = [
  {orderId: "1", productId: "1", quantity: "1"},
  {orderId: "2", productId: "2", quantity: "1"},
  {orderId: "3", productId: "3", quantity: "1"},
  {orderId: "4", productId: "4", quantity: "1"},
  {orderId: "5", productId: "5", quantity: "1"},
]

const seed = async () => {
  try {
    await User.bulkCreate(users);
    await Bike.bulkCreate(bikes);
    await Ticket.bulkCreate(tickets);
    await Labor.bulkCreate(labor);
    await Product.bulkCreate(products);
    await Order.bulkCreate(orders);
    await Todo.bulkCreate(todo);
    await Cart.bulkCreate(carts);
    await TicketLabor.bulkCreate(ticketLabor);
    await TicketProduct.bulkCreate(ticketProduct);
    await OrderProduct.bulkCreate(orderProduct);
  }
  catch(err) {
    console.log(err)
  }
};

module.exports = seed;

