AUTHOR API DOCS


Get All Authors:

Route
GET /api/authors


Query Authors:

Supported Query Parameters
fn: First Name
ln: Last Name

Route
GET /api/authors

Example: /api/authors?ln=DeLillo


Add a New Author to Server:

New Author submissions must include one image of the author and follow a form pattern like so:

firstName: Jonathan
lastName: Franzen
born: 1959-08-17 //YYYY-MM-DD
image: jpg/jpeg/webp/png

POST /api/authors


Add a new image to an existing author:

new image submissions must include one image of the author and follow a form pattern like so:

authorID: 639225b8900350bc808da65a
image: jpg/jpeg/webp/png

POST /api/authors/image