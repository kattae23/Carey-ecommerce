# React Ecommerce Readme

This ecommerce project built with React allows you to sell any type of product. It uses Strapi for payment processing, with a custom REST API implementation. It also includes Redux for state management, server-side image compression, and many other features.

# Live Demo
https://backend-server-ecommerce-production.up.railway.app/
https://carey-ecommerce.surge.sh/

## Features

- **Product Management:** Add, edit, and delete products from your inventory, organized into categories for easy browsing.
- **User Authentication:** Secure user authentication and authorization for a personalized shopping experience. Login options include Google, as well as traditional email and password login.
- **User Roles:** Different user roles, such as admin and regular user, with different levels of permissions for managing products and viewing orders.
- **Shopping Cart:** Add products to a shopping cart and keep track of the total cost of the items.
- **Checkout Process:** Seamless checkout process that allows users to pay for their purchases using Strapi's payment processing system.
- **Search Functionality:** Search for products using keywords and filters.
- **Responsive Design:** The user interface is designed to be responsive, so it looks great on desktop, tablet, and mobile devices.
- **Server-side Image Compression:** Images are compressed on the server-side to ensure quick page load times.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Strapi:** A headless CMS that provides content management and payment processing capabilities.
- **Redux:** A state management library for JavaScript applications.
- **Node.js:** A JavaScript runtime that allows for server-side JavaScript execution.
- **Express.js:** A Node.js web application framework used for creating the REST API.
- **MongoDB:** A NoSQL database used for storing product and user information.
- **Vite:** A module bundler used to package the application's JavaScript and CSS assets.
- **Babel:** A JavaScript compiler that converts modern JavaScript code into code that can be run in older browsers.

## Installation

To install and run the React Ecommerce project:

1. Clone the repository to your local machine.
2. Install the project dependencies using `yarn install || yarn`.
3. Configure your .ENV and your config.json file in the folder name config
3. Start the development server using `yarn dev`.

## Usage

After following the installation steps, you can access the React Ecommerce application by visiting `http://localhost:5713` in your web browser. From there, you can browse the inventory of products, add items to your cart, and complete the checkout process using Strapi's payment processing system.

## Contributing

We welcome contributions to the React Ecommerce project. Please feel free to open a pull request or submit an issue if you find a bug or have a suggestion for an improvement.

## License

The React Ecommerce project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
