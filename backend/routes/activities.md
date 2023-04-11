create a routes file and call it activity routes
add the file in index.js as done
 on postman add a request called students
 the request will send the following data to your backend
{
    // "math": 50,
    // "eng": 35,
    // "swa": 70,
    // "phy": 78
    // "geo": 30
}
on your activity routes, add a post method that will receive the above data from your postman then send a response of the avgPercentage eg 78%
 NOTE:the response you send must be a string

 go to mongo db website
 create a free account

 #tomorrow's class
 -creating models



 #Git Hub
 it is a version control tool
 enables us to go to previous versions
 it is a backup tool
 we add our code to repositories

 add restaurant mall to github (you'll need to create a new repository)

 Models.
 -They create tables on our db and enable us to store data on the db
 -We create models using mongoose 

 -create a model called students
 -it will have fields name, yob and grade(eg. form 4)
 -add students routes that will apply crud on this model