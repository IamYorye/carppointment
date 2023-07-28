# CarCar

Project Beta is an an application for managing the aspects of an automobile dealership.

Team:

* Parsa Abdizadeh - Sales
* Jaspreet Sangha - Service

## Getting Started

1. Fork and clone this repository on to your local machine:
You can clone this machine by going to your terminal and typing - git clone <<repository url>>

2. Boot up Docker

3. Run the following commands on your computer (Make sure you are in the project directory):
```
docker volume create beta-data
docker-compose build
docker-compose up

```
4. After you have ran these commands, take a look at Docker and check to see if the containers are running:

If the containers are running, on your browser copy paste this url to see the front end React app, http://localhost:3000/

![Img](/ghi/app/public/project-beta.png)

## Design

Project Beta is made up of 3 microservices, which interact with one another.

- **Inventory**

What the Inventory microservice does is gather data to be used in each individual microservice, i.e. the Automobile data.  The inventory microservice consists of three classes in the models.py, the most important, the Automobile, the VehicleModelm and the Manufacturer.  All models have their own fields that gets showcased on the frontend.  When you want  to create a manufacturer, you must enter it's one field it owns, which is the name of the manufacturer.  Doing so puts it in a manufacturers list. Same goes for the other models, put in their respective fields to create them, and once you do they get showcased on the front end in a table of data.

- **Services**

What the Services microservice does is allow a user to add a technician to the technicians list, and then create an appointment or keep track of their appointments for their respective automobiles.  Giving them the ability to either cancel their appointment or finish their appointment to be tracked into a seperate page on the front end that showcases all of their service history with the exact automobile - showcased by vin and polled for by the automobile poller, the date and time the appointment occurred, the reason for the appointment, who the customer was, whether or not the automobile was purchased from the inventory, the technician who did it, being showcased as the technicians first and last name, and finally the status of all of the appointments they've created.

- **Sales**

The Sales microservice offers users a comprehensive set of functionalities. Users can add Customer information and Salesperson details, log sales, create new sales, and view lists of customers, salespeople, and sales.

To create a new salesperson, users can enter their first name, last name, and a unique employee ID. The list of all salespeople is accessible via the salesperson list tab.

Additionally, users have the ability to create a new customer by providing their first and last name, phone number, and address. To view the list of customers, users can navigate to the customer list tab.

Users are permitted to create new sales, but they can only make sales for cars that have not been sold yet. This involves selecting a customer from the customer list, the salesperson closing the sale from the salespeople list and an automobile VIN number from the inventory of unsold cars as well as entering the price of the automobile.

The sales list contains a comprehensive history of all sales made on the site, and users can use live filters to narrow down sales by specific salespeople's first names.


## Accessing Endpoints to Send, Create and View Data through Insomnia and your browser

### Manufacturers:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |

Manufacturer Sample Requests you could send through Insomnia -

Create("POST") a manufacturer -
```
{
  "name": "Dodge"
}

```
List("GET") - Get a list of the manufacturer/manufacturers you've created -
```
{
	"manufacturers": [
		{
			"href": "/api/manufacturers/5/",
			"id": 5,
			"name": "Dodge"
		}
	]
}

```
### Vehicle Models:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/id/

Vehicle Model Sample Requests you could send through Insomnia -

Create("POST") a vehicle model -

```
{
  "name": "Charger",
  "picture_url": "https://alcf.s3.us-west-1.amazonaws.com/_custom/2023/dodge/charger/2023-dodge-charger%20%281%29.png",
  "manufacturer_id": 5
}

```

List("GET") - Get a list of the vehicle model/models you've created -

```
{
	"models": [
		{
			"href": "/api/models/4/",
			"id": 4,
			"name": "Charger",
			"picture_url": "https://alcf.s3.us-west-1.amazonaws.com/_custom/2023/dodge/charger/2023-dodge-charger%20%281%29.png",
			"manufacturer": {
				"href": "/api/manufacturers/5/",
				"id": 5,
				"name": "Dodge"
			}
		}
	]
}
```
Updating("PUT") - Updating the vehicle model you've created(Remember to pass in the id to the vehicle model to update the one you want) -

In this instance, you could either update the name of the vehicle model or update the picture_url of the vehicle model -
```
{
  "name": "Charger",
  "picture_url": "https://hips.hearstapps.com/hmg-prod/images/2021-dodge-charger-srt-hellcat-redeye-103-1593634315.jpg?crop=0.769xw:0.577xh;0.0977xw,0.205xh&resize=1200:*"
}

```

### Automobiles:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Create an automobile | POST | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/vin/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/vin/

Automobile sample requests you could send through Insomnia -

Create("POST") an automobile -

```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}

```

List("GET") - Get a list of all of the automobiles you've created -

```
{
	"autos": [
		{
			"href": "/api/automobiles/1C3CC5FB2AN120174/",
			"id": 1,
			"color": "red",
			"year": 2012,
			"vin": "1C3CC5FB2AN120174",
			"model": {
				"href": "/api/models/1/",
				"id": 1,
				"name": "Sebring",
				"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Chrysler"
				}
			},
			"sold": true
		},
    ]
}
```
List("GET") - Get a specific automobile by passing in the automobiles VIN in the URL -
http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "1C3CC5FB2AN120174",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Sebring",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		}
	},
	"sold": false
}

```
Update("PUT") - Update an automobile by passing in any one of these values and changing them -
Rememeber if you want to update an automobile, pass that automobiles VIN to get that specific instance of an automobile -
http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

```
{
  "color": "red",
  "year": 2012,
  "sold": false
}

```

Return Value -

```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "1C3CC5FB2AN120174",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Sebring",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		}
	},
	"sold": false
}
```

# Service Microservice

Now that we've explained the basics of sending, creating, updating or even deleting data through our Inventory microservice and through Insomnia, you can perform the same methods to our Service microservice and start creating technicians, getting the details of techncians in a list or getting the details of a specfic techncician.  As well as updating a technician, (maybe they're last nam changed), as well as deleting a technician, however I designed my models in a way to where if you delete a technician it would protect the whole class and not delete the appointment so we won't be going over deleting a technician.  However we'll perform those delete functions through appointments and showcase all of the inputs you could perform to see this data.

### Technicians:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Technician detail | GET | http://localhost:8080/api/technicians/<int:pk>/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:pk>/
| Update a technician | PUT | http://localhost:8080/api/technicians/<int:pk>/

Create a Technician ("POST") -

```
{
	"first_name": "Joe",
	"last_name": "Biden",
	"technician_id": 9
}

```

Return Value after you've created a new technician -

```
{
	"href": "/api/technicians/9/",
	"id": 9,
	"first_name": "Joe",
	"last_name": "Biden",
	"technician_id": 9
}

```

List all technicians ("GET") -

```
{
	"technicians": [
		{
			"href": "/api/technicians/9/",
			"id": 9,
			"first_name": "Joe",
			"last_name": "Biden",
			"technician_id": 9
		}
	]
}
```
Getting the data of a specific technician ("GET") -
Make sure you pass in the id for the technician you want to get the details about -

```
{
	"href": "/api/technicians/9/",
	"id": 9,
	"first_name": "Joe",
	"last_name": "Biden",
	"technician_id": 9
}

```

Update the information of a technician ("PUT") -
Once again make sure you pass in the id for the technician you want to update -

Inputting updated information - (Changing last name) -

```
{
	"last_name": "Buck"
}

```

Return Value - (Updated Technician) -

```
{
	"href": "/api/technicians/9/",
	"id": 9,
	"first_name": "Joe",
	"last_name": "Buck",
	"technician_id": 9
}

```

Deleting a technician - ("DEL") -
Once again pass in the id for the technician you want to delete -


Return Value after you delete a technician -

```
{
	"DELETED": true
}

```

Now when you go back to your list of technicians or if you try to get the specific details of that technician you will either not see the technician in the list or if you go the route of passing in the id of the technician to get the details of him or her you will get this return value -

```
{
	"MESSAGE": "TECHNICIAN DOES NOT EXIST"
}

```

With a 404 not found Error code .

### Appointments:

Now the whole point of our microservice, we want to be able to create appointments with a specific technician, as well as inputting other fields to create the appointment.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List appointments | GET | http://localhost:8080/api/appointments/
| Appointment detail | GET | http://localhost:8080/api/appointments/<int:pk>/
| Create appointment | POST | http://localhost:8080/api/appointments/
| Delete appointment | DELETE | http://localhost:8080/api/appointments/<int:pk>/
| Update appointment | DELETE | http://localhost:8080/api/appointments/<int:pk>/

Create an appointment - ("POST") -
When you create an appointment you'll enter a 17 character VIN, a date for the appointment, reason for the appointment, your name foir customer, vip can be left blank because it goes through our API to determine if your vehicle should have a vip status and status will be left blank to where the work will be done by the front end, and lastly you pick the technician via their ID on Insomnia, on the front end it would be their name.

```

{
	"vin": 1235768959403657,
	"date_time": "2023-07-25",
	"reason": "Seats",
	"customer": "Josh",
	"vip": "",
	"status": "",
	"technician": 6
}

```

Return Value -

```

{
	"id": 46,
	"vin": 1235768959403657,
	"date_time": "2023-07-25",
	"reason": "Seats",
	"customer": "Josh",
	"vip": false,
	"status": "",
	"technician": 6
}

```

Listing the Appointment - ("GET")

```
{
	"appointments": [
		{
			"id": 46,
			"vin": "1235768959403657",
			"date_time": "2023-07-25T00:00:00+00:00",
			"reason": "Seats",
			"customer": "Josh",
			"vip": false,
			"status": "",
			"technician": 6
		}
	]
}
```

Update the appointments status - ("PUT") -

```
{
	"status": "Finished"
}
```
OR
```
{
	"status": "Cancelled"
}
```
Both can be used by just passing in the id of the appointment and changing the status to either one of these.

Delete an appointment - ("DEL") -

Once again to delete an appointment, pass in the appointments id -

```
{
	"status": "Cancelled"
}

```

Return Value for getting the details of the appointment by passing in the id in the url -
```
{
	"MESSAGE": "APPOINTMENT DOES NOT EXIST"
}
```
404 Not Found error code


# Sales Microservice

Let's explore how we can create and log salespeople, customers, and sales in our database. To initiate a sale, it's essential to have existing records of salespeople and customers. Additionally, we must have an inventory database containing information about the available automobiles, each identified by a unique VIN number. This approach ensures accurate assignment of automobiles to their respective sales.

By utilizing the VIN number as a unique identifier, we can precisely link specific vehicles to their corresponding sales transactions. This process helps maintain accurate records and improves overall efficiency in our sales management system.

### Salespeople:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| salesperson detail | GET | http://localhost:8090/api/salespeople/<int:id>/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Update a salesperson | PUT | http://localhost:8090/api/salespeople/<int:id>/



create a Salesperson ("POST")

**Make sure the given "employee_id" is unique to each salesperson.

```
{
	"first_name": "John",
	"last_name": "Wick",
	"employee_id": "11111"
}
```
return value:

```
{
	"first_name": "John",
	"last_name": "Wick",
	"employee_id": "11111",
	"id": 1
}
```



To update a Salesperson ("PUT")

make sure you use a valid id in the URL.

```
{
	"first_name": "lebenon",
	"last_name": "blames",
	"employee_id": "23"
}
```

return value:

```
{
	"first_name": "lebenon",
	"last_name": "blames",
	"employee_id": "23",
	"id": 1
}
```



To get the details of a certain Salesperson ("GET")

once again, make sure that the id is valid and existing

return value:

```
{
	"first_name": "lebenon",
	"last_name": "blames",
	"employee_id": "23",
	"id": 1
}
```



to get a list of all salespeople ("GET")

** I created another salesperson for the sake of showcasing the list

return value:

```
{
	"salesperson": [
		{
			"first_name": "lejon",
			"last_name": "brames",
			"employee_id": "1040",
			"id": 1
		},
		{
			"first_name": "Hank",
			"last_name": "Schrader",
			"employee_id": "911",
			"id": 2
		}
	]
}
```


### Customers:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Customers | GET | http://localhost:8090/api/salespeople/
| customer detail | GET | http://localhost:8090/api/salespeople/<int:id>/
| Create a customer | POST | http://localhost:8090/api/salespeople/
| Update a customer | PUT | http://localhost:8090/api/salespeople/<int:id>/
| Delete a customer | DELETE | http://localhost:8090/api/salespeople/<int:id>/



to create a customer ("POST")

you'll have to enter first name, last name, address and phone number

** make sure the phone number is unique to each customer

```
{
  "first_name": "Michael",
  "last_name": "scott",
  "address": "Somewhere in Scranton, PA",
  "phone_number": "5910358213"
}
```

return value:

```
{
	"first_name": "Michael",
	"last_name": "scott",
	"address": "Somewhere in Scranton, PA",
	"phone_number": "5910358213",
	"id": 1
}
```



to update a customer's info: ("PUT")

make sure you have a valid customer id in the URL

input:
```
{
  "first_name": "michael",
  "last_name": "scotch",
  "address": "4253 something lane",
  "phone_number": "22200022"
}
```


return value:

```
{
	"first_name": "michael",
	"last_name": "scotch",
	"address": "4253 something lane",
	"phone_number": "22200022",
	"id": 1
}
```



to get a list of all customers ("GET")

return value:
```
{
	"customer": [
		{
			"first_name": "michael",
			"last_name": "scotch",
			"address": "4253 something lane",
			"phone_number": "22200022",
			"id": 1
		},
		{
			"first_name": "Jim",
			"last_name": "Halpert",
			"address": "by the quarry, Lindon ave, Scranton, PA",
			"phone_number": "5910358213",
			"id": 2
		}
	]
}
```



to show a customer's info ("GET")

make sure you have a valid customer id in the URL

input:

```
{
	"first_name": "michael",
	"last_name": "scotch",
	"address": "4253 something lane",
	"phone_number": "22200022",
}
```

return value:
```
{
	"first_name": "michael",
	"last_name": "scotch",
	"address": "4253 something lane",
	"phone_number": "22200022",
	"id": 1
}
```



to delete a customer from the database: ("DELETE")

*make sure you have a valid customer id in the URL
*due to the database, after deletion the id cannot be used anymore, for example if you delete customer with id: 1 the next customer you create will be assigned id: 2


### Sales:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all sales | GET | http://localhost:8090/api/sales/
| sale detail | GET | http://localhost:8090/api/sales/<int:id>/
| Create a sale | POST | http://localhost:8090/api/sales/


**to reiterate, you will be required to choose an existing customer (via id integer), salesperson (via id integer) and the VIN number (via vin string)




to create a new sale: ("POST")


pass in the correct info for existing automobile, customer and salesperson. you can set the sales price to any positive integer.
**vehicles are identified by their unique VIN not their database ID.

input:

```
{
	"customer": 1,
	"automobile": "12345678912345111",
	"salesperson": 1,
	"price": 20000
}
```


return value:

```
{
	"price": 20000,
	"automobile": {
		"vin": "12345678912345111",
		"sold": true,
		"id": 4
	},
	"salesperson": {
		"first_name": "lejon",
		"last_name": "brames",
		"employee_id": "1040",
		"id": 1
	},
	"customer": {
		"first_name": "michael",
		"last_name": "scotch",
		"address": "4253 something lane",
		"phone_number": "22200022",
		"id": 1
	},
	"id": 11
}
```




to List all sales:  ("GET")



return value:

```
{
	"sale": [
		{
			"price": 300000,
			"automobile": {
				"vin": "113",
				"sold": false,
				"id": 1
			},
			"salesperson": {
				"first_name": "john",
				"last_name": "wick",
				"employee_id": "30294",
				"id": 3
			},
			"customer": {
				"first_name": "Jim",
				"last_name": "Halpert",
				"address": "by the quarry, Lindon ave, Scranton, PA",
				"phone_number": "5910358213",
				"id": 2
			},
			"id": 1
		},
		{
			"price": 300000,
			"automobile": {
				"vin": "113",
				"sold": false,
				"id": 1
			},
			"salesperson": {
				"first_name": "john",
				"last_name": "wick",
				"employee_id": "30294",
				"id": 3
			},
			"customer": {
				"first_name": "Jim",
				"last_name": "Halpert",
				"address": "by the quarry, Lindon ave, Scranton, PA",
				"phone_number": "5910358213",
				"id": 2
			},
			"id": 2
		},
	]
}
```



to get a sale's details: ("GET")

return value:

```
{
	"price": 300000,
	"automobile": {
		"vin": "113",
		"sold": false,
		"id": 1
	},
	"salesperson": {
		"first_name": "john",
		"last_name": "wick",
		"employee_id": "30294",
		"id": 3
	},
	"customer": {
		"first_name": "Jim",
		"last_name": "Halpert",
		"address": "by the quarry, Lindon ave, Scranton, PA",
		"phone_number": "5910358213",
		"id": 2
	},
	"id": 1
}
```
