🛍️ **VibeCommerce** — An elegant, responsive e-commerce web app, featuring cart management, category-based filtering, and product recommendations.
Here is the link to a **video** of the website:  https://youtu.be/DjCQVxhARv8

To see the VibeCommerce **website**, click here:  https://vibe0f.onrender.com/

![9e08b786-1f7e-47af-b1b7-728069f4c391](https://github.com/user-attachments/assets/c91f956d-f5c8-4d23-9dda-c7cc5c745716)

![e96eac16-9192-4226-a910-d3f21decf9a0](https://github.com/user-attachments/assets/1b26090b-0e11-42ba-9c69-21b6197f794e)

![ab0119db-aa4a-4e61-8216-a316db10e248](https://github.com/user-attachments/assets/a0ea2b86-61f3-46f0-9cc1-7d143c01cccb)

![c37abb30-667f-4b9f-bcd2-49a7b717abb0](https://github.com/user-attachments/assets/4d4ded90-2b6f-4873-8948-03dea4473735)

✨ **Features**

1. **Category & Price Filterin**g — Filter by categories like Clothing, Electronics, Home decor, and also by price range.
2. **Add to / Remove from / Update quantity of an item in Cart**
3. Product image Animation — Products that have additional images show cyclic sliding animation when hovered over, in the home page.
4. Checkout with Receipt — Shows total price of cart items, and provides a receipt with order details and ID, on checkout.
5. **Recommendations (You May Also Like section)**
  🔹Recommendation Logic:  Since we have a small dataset (8 products), performing Machine learning Clustering to provide recommendations isn’t ideal. Instead, I used a logical approach:  
   - Group products by category overlap with the cart items.  
   - Calculate the average price (x) of items in the cart.  
   - Recommend products sorted by their price difference from x.  
   This mimics user interest–based recommendation while maintaining efficiency for small dataset.

![c0f80fca-8d7e-4e7d-ab9c-a7e2cfb57aaf](https://github.com/user-attachments/assets/42de9241-8723-4ec3-bd70-045ccc693572)


🚀 **Tech Stack**

| Area                   | Technology                                                      |
| ---------------------- | --------------------------------------------------------------- |
| Frontend Framework     | React.js (with React Router)                                    |
| Backend API            | Node.js + Express                                               |
| Database               | MongoDB (seeded product JSON)                                   |
| Styling                | CSS3, Google fonts                                              |
| State Management       | React Hooks                                                     |
| Deployment             | GitHub, Render, MongoDB Atlas                                   |
| Others                 | HTML, JavaScript                                                |


💡 **Future Enhancements**

1. Search bar on the navigation bar.
2. User login and authentication (using Firebase).
3. Wishlist management for Save-for-later functionality.
4. Use of Machine learning (clustering) models for a larger number of products.
And many more like integration of chatbot to browse products, reviews by customers, etc. as done in almost every e-commerce website.


🎨 **Styles & Aesthetic**

  Primary Colors:
  1. #09c4c7 for buttons, #009e9e when hovered.
  2. #614DD2 for contrasting or important elements like navigation bar and checkout button.

  Fonts:
  1. Montserrat (sans-serf) for headings and call-to-action buttons.
  2. Lora (serif) for normal text.

  Visuals:
  1. Soft rounded corners and consistent whitespaces.
  2. Smooth transitions for hover effects.
  3. Sliding animation (cyclic) of images in product cards.


⚙️ **Project Setup**

🧩 Prerequisites: Node.js and npm installed.
```bash
# Clone repository
git clone https://github.com/shayoniA/Vibe0.git
# Install dependencies and start development server
cd backend
npm install
node server.js
cd frontend
npm start
```

Then open "http://localhost:3000/" in your browser.


🏢 About **Nexora**
This project was developed for Nexora, as part of a technical internship challenge to demonstrate full-stack development skills, React and Node.js proficiency, UI/UX awareness, and API handling.

👩‍💻 Developer

**Sayani Adhikary** | sayani.adhikary23b@iiitg.ac.in

**My resume**:  https://drive.google.com/file/d/1AfYmclLnPFw54RCP_NlwuJmeoMySiE_r/view?usp=sharing

LinkedIn:  https://www.linkedin.com/in/sayani-adhikary-825349298/
