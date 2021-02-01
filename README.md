Online store with a control panel for the administrator.

HTML, CSS, JS.

The server side is metered using json-server.
db.json contains arrays of users, products and product categories.

JS is compiled with webpack.

The project is under development, much remains to be added, optimized, fixed.


Functionality for the user at the moment:
- Registration / authorization (so far as a stub).
- Browse products, browse products by category, search by name.
- Clicking on a product brings up a modal window with a detailed description, an image slider.
- Adding products to the cart (The cart still shows the products in it and their amount).

Functionality for the administrator at the moment:
- Checking the admin status during authorization (stored in ds.json / users). If the user has this status, he has the opportunity to open the control panel
 - Adding goods:
The name, price, path to images, categories to which the product belongs, characteristics are indicated.
- Adding categories:
The name of the category and its parent category are indicated, if the category is the main one, the parent field is empty.
