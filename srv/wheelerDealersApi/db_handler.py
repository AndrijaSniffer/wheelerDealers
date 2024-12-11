from django.db import connection
from django.utils import timezone

from wheelerDealersApi.classes import UserClass, CompanyClass
from wheelerDealersApi.util import reverseBool


class DBHandler:
    def __init__(self):
        self.cursor = connection.cursor()

    def CreateNewUser(self, user: UserClass) -> bool:
        should_be_admin = reverseBool(self.CheckIfAdminExists())

        try:
            self.cursor.execute(
                "insert into wheelerdealersapi_user (username, email, password, deactivated, phone, address, is_reseller, is_admin, PIB_id, created_at)"
                "values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (user.username, user.email, user.password, user.deactivated, user.phone, user.address,
                 int(user.is_reseller), int(should_be_admin), user.PIB.PIB_id, timezone.now())
            )

            connection.commit()
        except Exception as e:
            print(e)
            return False
        else:
            return True

    def CheckIfAdminExists(self) -> bool:
        try:
            # Execute the query to count the number of admins in the database
            self.cursor.execute("SELECT COUNT(*) FROM wheelerdealersapi_user WHERE is_admin = %s", 1)
            result = self.cursor.fetchone()  # Get the first result from the query

            # If there is exactly one admin, return True; otherwise, return False
            return result[0] == 1
        except Exception as e:
            print(f"Error checking if admin exists: {e}")
            return False

    def CheckIfUserExists(self, username: str) -> bool:
        try:
            # Execute the query to count the number of admins in the database
            self.cursor.execute("SELECT COUNT(*) FROM wheelerdealersapi_user WHERE username = %s", username)
            result = self.cursor.fetchone()  # Get the first result from the query

            # If there is exactly one user, return True; otherwise, return False
            return result[0] == 1
        except Exception as e:
            print(f"Error checking if admin exists: {e}")
            return False

    def GetUserForAuthorization(self, username: str) -> UserClass:
        try:
            # Query to fetch the user data by username
            self.cursor.execute("""
                SELECT u.user, u.PIB_id, u.username, u.email, u.password, u.deactivated, u.created_at,
                        u.phone, u.address, u.is_reseller, u.is_admin, c.PIB, c.address, c.phone, c.logo_url, c.website_url
                FROM wheelerdealersapi_user u
                LEFT JOIN wheelerdealers.wheelerdealersapi_company c ON u.PIB_id = c.PIB
                WHERE u.username = %s
            """, (username,))

            # Fetch the result
            user_data = self.cursor.fetchone()

            if user_data:
                # Extract the user information from the query result
                user_id = user_data[0]
                pib_id = user_data[1]  # PIB_id is the second field
                company = None  # Default value for company if PIB is NULL

                # If PIB_id is not None, create a CompanyClass instance
                if pib_id is not None:
                    PIB_data = user_data[11:]  # Extract the company-related data
                    company = CompanyClass(PIB_data[0], PIB_data[1], PIB_data[2], PIB_data[3],
                                           PIB_data[4])  # Create the CompanyClass object

                # Create and return the UserClass object
                return UserClass(
                    user_id=user_id,
                    PIB=company,
                    username=user_data[2],
                    email=user_data[3],
                    password=user_data[4],
                    deactivated=user_data[5],
                    created_at=user_data[6],
                    phone=user_data[7],
                    address=user_data[8],
                    is_reseller=user_data[9],
                    is_admin=user_data[10]
                )
            else:
                # If user doesn't exist
                return None
        except Exception as e:
            print(f"Error fetching user data: {e}")
            return None
