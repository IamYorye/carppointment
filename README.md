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

Users are permitted to create new sales, but they can only sell cars that have not been sold yet. This involves selecting a customer from the customer list and an automobile VIN number from the inventory of unsold cars.

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
