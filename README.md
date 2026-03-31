# Wheeler Dealers

A web application for buying and selling cars. Graduation project for University Metropolitan Belgrade.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 19.0.8 + Angular Material |
| Backend | Python Django 5.1.3 + Django REST Framework |
| Database | MySQL / MariaDB |
| Authentication | JWT (Simple JWT) |
| API Testing | Bruno |

## Project Structure

```
/
├── srv/                  # Django backend
├── web/                  # Angular frontend
├── Bruno/                # Bruno API collection
├── WheelerDealers_PD/    # Power Designer database model files
└── seed_data.sql         # Seed data (INSERT statements for lookup tables)
```

## User Roles

### Guest
- Browse, search, and view car listings
- View the contact page

### User
- Everything a Guest can do
- My Profile page
- List cars for sale (requires a phone number on the account)
- View seller phone numbers
- Can convert to a Reseller account

### Dealership
- Registers with an 8-digit government tax ID (PIB)
- Dashboard page with inventory overview
- Inventory management page for car listings

### Admin
- CRUD on all lookup tables (manufacturers, models, fuel types, etc.)
- User management (ban accounts)
- Listing management (delete any listing)

## Key Features

- Advanced car search with 18+ filter parameters
- Role-based routing and navigation guards
- JWT authentication with automatic token refresh
- Multi-image upload with carousel display
- Dealership dashboard with inventory management
- User profile with reseller conversion
- Responsive card-based search results

## Running the Project

### Prerequisites

- Python 3.12
- Node.js 20
- MySQL / MariaDB running on `localhost:3306`

### Database Setup

1. Create a database named `wheelerdealers`.
2. Run the seed data to populate lookup tables:
   ```sql
   source seed_data.sql;
   ```

### Backend

```bash
cd srv
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API will be available at `http://localhost:8000/wheelerDealersApi/`.

### Frontend

```bash
cd web
npm install
ng serve
```

The app will be available at `http://localhost:4200/`.

### API Testing (Bruno)

Open the `Bruno/WheelerDealers` folder as a collection in [Bruno](https://www.usebruno.com/).

Select the `WD` environment and run the **Login** request first — it automatically saves the access and refresh tokens to the environment. All authenticated requests inherit the bearer token from the collection.

## API Overview

All endpoints are prefixed with `/wheelerDealersApi/`.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login/` | Login, returns JWT tokens |
| POST | `/api/auth/create/` | Register a new user |
| POST | `/api/token/refresh/` | Refresh access token |
| POST | `/api/token/verify/` | Verify access token |
| PUT | `/api/auth/user/ban/` | Ban a user (Admin) |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/auth/users/` | Get all users |
| GET | `/api/auth/user/:user_id/` | Get user by ID |
| PUT | `/api/auth/user/:user_id/update/` | Update user |
| GET | `/api/auth/user/:user_id/cars/` | Get listings by user |

### Cars

| Method | Endpoint | Description |
|---|---|---|
| GET | `/car/` | List all cars |
| POST | `/car/` | Create a new listing |
| GET | `/car/:id/` | Get car by ID |
| PUT | `/car/:id/` | Update car |
| DELETE | `/car/:id/` | Delete car |
| GET | `/car/colors/` | Get all exterior colors |
| POST | `/car/:car_id/images/` | Upload images for a car |

### Search

| Method | Endpoint | Description |
|---|---|---|
| GET | `/search/normal/` | Search cars with filter params |

Supported query parameters: `manufacturer`, `model`, `transmission_type`, `fuel`, `drivetrain`, `engine_type`, `emission_class`, `is_preowned`, `price_from`, `price_to`, `engine_volume`, `hp_from`, `hp_to`, `kw_from`, `kw_to`, `exterior_color`, `steering_wheel_left`, `year_from`, `year_to`

### Lookup Tables (ViewSet CRUD)

Each resource below supports `GET /list`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id`.

| Resource | Endpoint prefix |
|---|---|
| Company | `/company/` |
| Country | `/country/` |
| Drivetrain | `/drivetrain/` |
| Manufacturer | `/manufacturer/` |
| Engine Type | `/engineType/` |
| Emission Class | `/emissionClass/` |
| Model Type | `/modelType/` |
| Model | `/model/` |
| Model–Type Link | `/modelTypeModel/` |
| Fuel | `/fuel/` |
| Transmission Type | `/transmissionType/` |
| Image | `/image/` |

### Models by Manufacturer

| Method | Endpoint | Description |
|---|---|---|
| GET | `/model/byManufacturerId/?manufacturer_id=X` | Get models for a manufacturer |
