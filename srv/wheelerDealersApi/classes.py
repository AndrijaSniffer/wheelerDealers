import datetime

from wheelerDealersApi.security import SecurityUtil


class CompanyClass:
    def __init__(self, PIB_id: int, address: str, phone: str, logo_url: str, website_url: str):
        self.PIB_id = PIB_id
        self.address = address
        self.phone = phone
        self.logo_url = logo_url
        self.website_url = website_url

    def __str__(self):
        return (f"CompanyClass(PIB_id={self.PIB_id}, address={self.address}, phone={self.phone}, "
                f"logo_url={self.logo_url}, website_url={self.website_url})")


class UserClass:
    def __init__(self, user_id: int, PIB: CompanyClass, username: str, email: str,
                 password: str, deactivated: bool, created_at: datetime,
                 phone: str, address: str, is_reseller: bool, is_admin: bool):
        self.user_id = user_id
        self.PIB = PIB
        self.username = username
        self.email = email
        self.password = self._set_password(password)
        self.deactivated = deactivated
        self.created_at = created_at
        self.phone = phone
        self.address = address
        self.is_reseller = is_reseller
        self.is_admin = is_admin

    def _set_password(self, password: str) -> str:
        # Check if password matches the pbkdf2 sha256 hash pattern
        if password.startswith('$pbkdf2-sha256$'):
            return password  # Already hashed, don't re-hash
        return SecurityUtil.hashing_password(password)  # Hash it if not already hashed

    def __str__(self) -> str:
        return (f"UserClass(user_id={self.user_id}, PIB={self.PIB}, username={self.username}, "
                f"email={self.email}, password={self.password}, deactivated={self.deactivated}, "
                f"created_at={self.created_at}, phone={self.phone}, address={self.address}, "
                f"is_reseller={self.is_reseller}, is_admin={self.is_admin})")
