# SBA 319 - MongoDB Database Application
### <span style="color: red;">due Tuesday by 9:59p MST</span>

## About

This project is a model of a trails browser with a simple todo list to store the user's planned hikes. The trails data comes from the state of Colorado COTREX dataset. It was quite the adventure finding the correct pathway to get this data. I did keep notes, so buzz me if you need the .csv. Because there is A LOT of data, my application is running slowly. Please be patient. I may go back to a smaller testing dataset. 

You'll see 42 users on the landing page. Just choose a user's name to see their inventory. You can then see four trail categories. Choose one, and a list of trails will show up. Choose one of those, and the details will display. Press the button to add that trail to the user's to-do list. Check out their to-do list, where you can edit the date, notes, and checklist fields ... or delete a planned hike.

CRUD operations on the to-do list acheived.

## Available routes and their corresponding CRUD operations for reference.  (**5%**)

Todos
| Method | Endpoint            | Description                |
|--------|---------------------|----------------------------|
| GET    | /alltodos           | Retrieve all todos         |
| GET    | /                   | Retrieve users             |
| GET    | /user/:id           | Retrieve specific user     |
| GET    | /trail_testing_data | Retrieve all data          |
| GET    | /trails             | Retrieve all               |
| GET    | /trail/:id          | Retrieve trails user data  |
| GET    | /user/:id/todos     | Retrieve user todos        |
| POST   | /todos/:id          | Create new todo            |
| PATCH  | /todos/:id          | Update user todo           |
| DELETE | /todos/:id          | Delete user todo           |

### <a href ="sba319screenshots.mp4">Take a look at the screenshots in an .mp4 format.</a>

## ascii tree diagram

SBA319/
┣ models/
┃ ┣ todo.js
┃ ┣ trail.js
┃ ┗ user.js
┣ public/
┃ ┣ images/
┃ ┃ ┣ 404.jpg
┃ ┃ ┗ paper.jpg
┃ ┣ js/
┃ ┃ ┣ getTrailDetails.js
┃ ┃ ┗ indTodos.js
┃ ┗ styles.css
┣ server/
┃ ┣ allTodos.js
┃ ┣ index.js
┃ ┣ mongo.js
┃ ┣ populateData.js
┃ ┣ populatePackingLists.js
┃ ┗ routes.js
┣ views/
┃ ┣ 404error.ejs
┃ ┣ index.ejs
┃ ┣ todo.ejs
┃ ┗ user.ejs
┣ .env
┣ .gitignore
┣ NOTES.txt
┣ package-lock.json
┣ package.json
┣ README.md
┣ removeFields.js
┗ sba319screenshots.mp4

## Technical Requirements

- [X] Use at least three different data collections within the database (such as users, posts, or comments). (**5%**) [ I have users, trails, todos.]
- [X] Utilize reasonable data modeling practices. (**10%**) [ Kept the engine in index.js, utilized separate models, public, server, and views directories. ]
- [/] Create GET routes for all data that should be exposed to the client, using appropriate query commands to retrieve the data from the database. (**10%**) [ Created GET routes, not sure about "using appropriate query commands". --> .find({ collection: ‘document’ }) <=== use this in my code to fetch some data from the database ]
- [X] Create POST routes for data, as appropriate, using appropriate insertion commands to add data to the database. At least one data collection should allow for client creation via a POST request. (**10%**) [ Add a trail to the todo list. ]
- [X] Create PATCH or PUT routes for data, as appropriate, using appropriate update commands to change data in the database. At least one data collection should allow for client manipulation via a PATCH or PUT request. (**10%**) [ Edit date, notes, checklist, in the todo list. ]
- [X] Create DELETE routes for data, as appropriate, using appropriate delete commands to remove data from the database. At least one data collection should allow for client deletion via a DELETE request. (**10%**) [ Delete a trail from the todo list. ]
- [X] Include sensible indexes for any and all fields that are queried frequently. For fields that may have a high write-to-read ratio, you may forgo indexes for performance considerations. Make comments of this where applicable. (**5%**)
- [X] Include sensible MongoDB data validation rules for at least one data collection. (**5%**) [schema] - Note: This may be accomplished in a number of ways. If you choose to perform this task outside of your application's code, you must include a way to test the validation within the application's routes. This can be as simple as providing a POST route that attempts to create an invalid document and displays the resulting error.
- [X] Populate your application's collections with sample data illustrating the use case of the collections. You must include at least five sample documents per collection.
Note: **Double-check this requirement before submission.** Testing your delete routes may leave you under the requirement. To be safe, populate your collections with sample data well above the requirement (we recommend 10-20 documents). (**5%**) [ Choose Eowyn, as she has many hikes planned with Notes and Checklist data. ]
- [X] Utilize reasonable code organization practices.  (**5%**)
- [X] Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).  (**10%**)
- [X] Commit frequently to the git repository. [ at least 10] (**5%**)
- [X] Include a README file that contains a description of your application.
This README must include a description of your API's available routes and their corresponding CRUD operations for reference.  (**5%**)
- [X] Level of effort displayed in creativity and user experience.  (**5%**)


## Bonus Objectives
The objectives listed here are not required. Ensure that your application meets the requirements above before attempting to further expand your features.

These bonus objectives cannot increase your overall score above 100%. Successful completion of these objectives can; however, make up for lost points above. **Ensure your application works as outlined by the requirements above before attempting these objectives, time permitting.**

- Use Mongoose to implement your application.
Note: The validation requirements above must still be implemented database-side, but should also be implemented application-side within your Mongoose schema(s). **+1%**	

### Reflection (Optional)

#### What could you have done differently during the planning stages of your project to make the execution easier? 
- I would have accounted for the overall complexity of my project aim. I did not intend for this to be so sprawling ... but sprawling it is.

#### Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?
- Understanding 'schema' was easy enough, and the concept of indexing was reasonable ... implementations was trickier. So the schema only control outputs? <- still working on understanding it all.
  
#### What would you add to or change about your application if given more time?
- I would make add CRUD operations to the inventory list. I would also add an escape back to the root. Adding maps would be AMAZING.

#### Use this space to make notes for your future self about anything that you think is important to remember about this process, or that may aid you when attempting something similar again:
- Dawn, Dawn, Dawn, Dawn, Dawn. Please just focus one one functionality at a time, then push it. You eat too much of the cake in one bite.
